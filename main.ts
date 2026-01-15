import { Cheerio } from "cheerio";
import { postJSFEnumerate, postJSFEStarter, submitInfraccion } from "./utils";
import fs from "fs/promises";
import path from "path";
import zlib from "zlib";
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

async function main() {
  const state = await getState();
  console.log(state);

  if (!state) return;
  const res_1 = await postJSFEStarter(state);
  console.log(res_1);
  console.log("-----------------------");

  const res_2 = await postJSFEnumerate({
    first: 10,
    rows: 10,
    viewState: state.viewState,
    sessionId: state.sessionId,
  });
  console.log(res_2);
  // NOTE TO SELF: THIS SHIT ONLY WORKS WHEN RES_1 IS CALLED FIRST

  /*
  const res = await submitInfraccion({
    uuid: "b8239a70-4239-475d-9505-573fe101548d",
  });

  if (!res?.data) throw new Error("Empty response body");

  const outputPath = path.resolve(process.cwd(), "infraction.pdf");
  await fs.writeFile(outputPath, res.data);
  console.log(`PDF saved to ${outputPath}`);
  */
}

main().catch(console.error);
