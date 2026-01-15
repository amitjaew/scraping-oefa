import axios from "axios";

interface PostSubmitInfractionParams {
  uuid: string;
  viewState: string;
  sessionId: string;
}

export async function submitInfraccion({
  uuid,
  viewState,
  sessionId,
}: PostSubmitInfractionParams) {
  const url = "https://publico.oefa.gob.pe/repdig/consulta/consultaTfa.xhtml";

  const body = new URLSearchParams({
    listarDetalleInfraccionRAAForm: "listarDetalleInfraccionRAAForm",
    "listarDetalleInfraccionRAAForm:txtNroexp": "",
    "listarDetalleInfraccionRAAForm:j_idt21": "",
    "listarDetalleInfraccionRAAForm:j_idt25": "",
    "listarDetalleInfraccionRAAForm:idsector": "",
    "listarDetalleInfraccionRAAForm:j_idt34": "",
    "listarDetalleInfraccionRAAForm:dt_scrollState": "0,0",
    "javax.faces.ViewState": viewState,
    "listarDetalleInfraccionRAAForm:dt:0:j_idt63":
      "listarDetalleInfraccionRAAForm:dt:0:j_idt63",
    param_uuid: uuid,
  }).toString();

  const headers = {
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "en-US,en;q=0.5",
    Connection: "keep-alive",
    "Content-Length": String(body.length),
    "Content-Type": "application/x-www-form-urlencoded",
    Cookie: `JSESSIONID=${sessionId}`,
    Host: "publico.oefa.gob.pe",
    Origin: "https://publico.oefa.gob.pe",
    Priority: "u=0, i",
    Referer: "https://publico.oefa.gob.pe/repdig/consulta/consultaTfa.xhtml",
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "same-origin",
    "Sec-Fetch-User": "?1",
    TE: "trailers",
    "Upgrade-Insecure-Requests": "1",
    "User-Agent":
      "Mozilla/5.0 (X11; Linux x86_64; rv:140.0) Gecko/20100101 Firefox/140.0",
  };

  const res = await axios.post(url, body.toString(), {
    headers: headers,
    responseType: "arraybuffer",
  });
  return res;
}

interface PostJSFEnumerateParams {
  first?: number;
  rows?: number;
  sessionId: string;
  viewState: string;
}

export async function postJSFEStarter({
  viewState,
  sessionId,
}: PostJSFEnumerateParams): Promise<string> {
  const url = `https://publico.oefa.gob.pe/repdig/consulta/consultaTfa.xhtml;jsessionid=${sessionId}`;

  const body = new URLSearchParams({
    "javax.faces.partial.ajax": "true",
    "javax.faces.source": "listarDetalleInfraccionRAAForm:btnBuscar",
    "javax.faces.partial.execute": "@all",
    "javax.faces.partial.render":
      "listarDetalleInfraccionRAAForm:pgLista+listarDetalleInfraccionRAAForm:txtNroexp",
    "listarDetalleInfraccionRAAForm:btnBuscar":
      "listarDetalleInfraccionRAAForm:btnBuscar",
    listarDetalleInfraccionRAAForm: "listarDetalleInfraccionRAAForm",
    "listarDetalleInfraccionRAAForm:txtNroexp": "",
    "listarDetalleInfraccionRAAForm:j_idt21": "",
    "listarDetalleInfraccionRAAForm:j_idt25": "",
    "listarDetalleInfraccionRAAForm:idsector": "",
    "listarDetalleInfraccionRAAForm:j_idt34": "",
    "listarDetalleInfraccionRAAForm:dt_scrollState": "0,0",
    "javax.faces.ViewState": viewState,
  }).toString();

  const headers = {
    Accept: "application/xml, text/xml, */*; q=0.01",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "en-US,en;q=0.5",
    Connection: "keep-alive",
    "Content-Length": String(body.length),
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    Cookie: `JSESSIONID=${sessionId}`,
    "Faces-Request": "partial/ajax",
    Host: "publico.oefa.gob.pe",
    Origin: "https://publico.oefa.gob.pe",
    Priority: "u=0",
    Referer: "https://publico.oefa.gob.pe/repdig/consulta/consultaTfa.xhtml",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    TE: "trailers",
    "User-Agent":
      "Mozilla/5.0 (X11; Linux x86_64; rv:140.0) Gecko/20100101 Firefox/140.0",
    "X-Requested-With": "XMLHttpRequest",
  };

  const res = await axios.post(url, body.toString(), { headers: headers });
  return res.data;
}

export async function postJSFEnumerate({
  first = 0,
  rows = 10,
  viewState,
  sessionId,
}: PostJSFEnumerateParams): Promise<string> {
  // const url = "https://publico.oefa.gob.pe/repdig/consulta/consultaTfa.xhtml";
  const url = `https://publico.oefa.gob.pe/repdig/consulta/consultaTfa.xhtml;jsessionid=${sessionId}`;

  const body = new URLSearchParams({
    "javax.faces.partial.ajax": "true",
    "javax.faces.source": "listarDetalleInfraccionRAAForm:dt",
    "javax.faces.partial.execute": "listarDetalleInfraccionRAAForm:dt",
    "javax.faces.partial.render": "listarDetalleInfraccionRAAForm:dt",
    "listarDetalleInfraccionRAAForm:dt": "listarDetalleInfraccionRAAForm:dt",
    "listarDetalleInfraccionRAAForm:dt_pagination": "true",
    "listarDetalleInfraccionRAAForm:dt_first": String(first),
    "listarDetalleInfraccionRAAForm:dt_rows": String(rows),
    "listarDetalleInfraccionRAAForm:dt_skipChildren": "true",
    "listarDetalleInfraccionRAAForm:dt_encodeFeature": "true",
    listarDetalleInfraccionRAAForm: "listarDetalleInfraccionRAAForm",
    "listarDetalleInfraccionRAAForm:txtNroexp": "",
    "listarDetalleInfraccionRAAForm:j_idt21": "",
    "listarDetalleInfraccionRAAForm:j_idt25": "",
    "listarDetalleInfraccionRAAForm:idsector": "",
    "listarDetalleInfraccionRAAForm:j_idt34": "",
    "listarDetalleInfraccionRAAForm:dt_scrollState": "0,0",
    "javax.faces.ViewState": viewState,
  }).toString();

  const headers = {
    Accept: "application/xml, text/xml, */*; q=0.01",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "en-US,en;q=0.5",
    Connection: "keep-alive",
    "Content-Length": String(body.length),
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    Cookie: `JSESSIONID=${sessionId}`,
    "Faces-Request": "partial/ajax",
    Host: "publico.oefa.gob.pe",
    Origin: "https://publico.oefa.gob.pe",
    Priority: "u=0",
    Referer: "https://publico.oefa.gob.pe/repdig/consulta/consultaTfa.xhtml",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    TE: "trailers",
    "User-Agent":
      "Mozilla/5.0 (X11; Linux x86_64; rv:140.0) Gecko/20100101 Firefox/140.0",
    "X-Requested-With": "XMLHttpRequest",
  };

  const res = await axios.post(url, body.toString(), { headers: headers });
  return res.data;
}
