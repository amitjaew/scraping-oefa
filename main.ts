import { postJSFEnumerate, postJSFEStarter, submitInfraccion } from "./utils";
import fs from "fs/promises";
import path from "path";
import * as cheerio from "cheerio";
import axios from "axios";

interface WebsiteState {
  viewState: string;
  sessionId: string;
}

export async function getState(): Promise<WebsiteState | undefined> {
  const url = "https://publico.oefa.gob.pe/repdig/consulta/consultaTfa.xhtml";
  const res = await axios.get(url);
  const cookieMatch = res.headers["set-cookie"]?.[0].match(/=(.*?);/);

  const $ = cheerio.load(res.data);
  const viewState = $("#j_id1\\:javax\\.faces\\.ViewState\\:0").val();
  const sessionId = cookieMatch?.[1];

  if (!sessionId || typeof viewState !== "string") return undefined;

  return {
    viewState,
    sessionId,
  };
}

export function extractData(text: string) {
  const rows: Array<{
    index: string;
    resolutionNumber: string;
    companyName: string;
    facility: string;
    sector: string;
    sanctionResolution: string;
    uuid: string;
  }> = [];

  const $xml = cheerio.load(text, { xmlMode: true });
  $xml("update").each((_, el) => {
    const elText = $xml(el).html();
    const $ = cheerio.load(`<table><tbody>${elText}</tbody></table>`);

    $("tr[role='row']").each((_, el) => {
      const cells = $(el).find("td");
      const onclickAttr = $(cells[6]).find("a").attr("onclick");
      const uuidMatch = onclickAttr?.match(/'param_uuid':'([^']+)'/);
      if (!uuidMatch) return;

      rows.push({
        index: $(cells[0]).text().trim(),
        resolutionNumber: $(cells[1]).text().trim(),
        companyName: $(cells[2]).text().trim(),
        facility: $(cells[3]).text().trim(),
        sector: $(cells[4]).text().trim(),
        sanctionResolution: $(cells[5]).text().trim(),
        uuid: uuidMatch?.[1] ?? null,
      });
    });
  });

  return rows;
}

async function main() {
  const state = await getState();
  console.log(state);

  if (!state) return;
  const res_1 = await postJSFEStarter(state);
  const res_2 = await postJSFEnumerate({
    first: 100,
    rows: 10,
    viewState: state.viewState,
    sessionId: state.sessionId,
  });
  const data = extractData(res_2);
  console.log(data);

  if (data.length == 0 || !data[0].uuid) {
    return;
  }
  console.log("Saving file", data[0]);
  const res = await submitInfraccion({
    uuid: data[0].uuid,
    ...state,
  });

  if (!res?.data) throw new Error("Empty response body");

  const outputPath = path.resolve(process.cwd(), "infraction.pdf");
  await fs.writeFile(outputPath, res.data);
  console.log(`PDF saved to ${outputPath}`);
}

main().catch(console.error);
