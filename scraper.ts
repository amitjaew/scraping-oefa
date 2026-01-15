import {
  executeWithRetry,
  getState,
  parseData,
  PayloadData,
  postJSFEnumerate,
  postJSFEStarter,
  submitInfraccion,
} from "./utils";
import fs from "fs/promises";
import path from "path";

interface RunLoopParams {
  start?: number;
  limit: number;
  jump: number;
  runIninitely?: boolean;
  extractFiles?: boolean;
}

export default class Scraper {
  remainingDownloads: Array<PayloadData>;

  constructor() {
    this.remainingDownloads = [];
  }

  async downloadRemainingDownloads(): Promise<void> {
    if (this.remainingDownloads.length === 0) {
      console.log("No remaining downloads to process");
      return;
    }

    console.log(
      `Starting download of ${this.remainingDownloads.length} remaining items`,
    );
    let state = await getState();

    for (const value of this.remainingDownloads) {
      if (value.pdfSaved) continue;

      let pdfRes;
      try {
        pdfRes = await executeWithRetry(() =>
          submitInfraccion({
            uuid: value.uuid,
            ...state,
          }),
        );
      } catch (error) {
        console.error(`Failed to submit PDF for UUID ${value.uuid}:`, error);
        continue;
      }

      if (!pdfRes?.data) {
        console.error(
          `Failed parse PDF for UUID ${value.uuid}: No data available`,
        );
        continue;
      }

      const pdfPath = path.resolve(process.cwd(), `files/${value.uuid}.pdf`);
      await fs.writeFile(pdfPath, pdfRes.data);
      value.pdfSaved = true;
      console.log(`PDF saved to ${pdfPath}`);
    }

    this.remainingDownloads = this.remainingDownloads.filter(
      (d) => !d.pdfSaved,
    );
    console.log(
      `Finished processing remaining downloads. ${this.remainingDownloads.length} items still pending.`,
    );
  }

  async runLoop({
    start = 0,
    limit,
    jump,
    runIninitely = false,
    extractFiles = false,
  }: RunLoopParams): Promise<void> {
    if (start < 0) {
      throw new Error("Start parameter cannot be less than 0");
    }
    if (limit <= 0) {
      throw new Error("Limit parameter must be greater than 0");
    }
    if (jump <= 0) {
      throw new Error("Jump parameter must be greater than 0");
    }
    let i = Math.floor(start);
    let state = await getState();

    const _ = await postJSFEStarter(state);

    while (i < limit || runIninitely) {
      if (!state) return;
      let res: string;
      try {
        res = await executeWithRetry(() =>
          postJSFEnumerate({
            first: i,
            rows: jump,
            viewState: state.viewState,
            sessionId: state.sessionId,
          }),
        );
      } catch (error) {
        state = await getState();
        continue;
      }
      const data = parseData(res).map((d) => ({ ...d, pdfSaved: false }));
      console.log(data);

      if (!extractFiles) {
        const index = String(Math.floor(i / jump)).padStart(4, "0");
        const jsonPath = path.resolve(process.cwd(), `data/${index}.json`);
        await fs.writeFile(jsonPath, JSON.stringify(data, null, 2));
        i += jump;
        continue;
      }

      for (const value of data) {
        let pdfRes;
        try {
          pdfRes = await executeWithRetry(() =>
            submitInfraccion({
              uuid: value.uuid,
              ...state,
            }),
          );
        } catch (error) {
          console.error(`Failed to submit PDF for UUID ${value.uuid}:`, error);
          continue;
        }

        if (!pdfRes?.data) {
          console.error(
            `Failed parse PDF for UUID ${value.uuid}: No data available`,
          );
          continue;
        }

        const pdfPath = path.resolve(process.cwd(), `files/${value.uuid}.pdf`);
        await fs.writeFile(pdfPath, pdfRes.data);
        value.pdfSaved = true;
        console.log(`PDF saved to ${pdfPath}`);
      }

      this.remainingDownloads.push(...data.filter((d) => !d.pdfSaved));
      const index = String(Math.floor(i / jump)).padStart(4, "0");
      const jsonPath = path.resolve(process.cwd(), `data/${index}.json`);
      await fs.writeFile(jsonPath, JSON.stringify(data, null, 2));
      i += jump;
    }

    while (this.remainingDownloads.length > 0) {
      await this.downloadRemainingDownloads();
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
}
