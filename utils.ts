import axios from "axios";

const DEFAULT_VIEW_STATE: string =
  "qEHh9JqA+TZ5iYHTlZ/dEc/bqYB3rubhS9k0oH8/tCX2GKt1ZtV8gOxozeHGIppqhjpTzUOGNLbRzRbZG7xR7XGCDl3nCsqZ0P0lhF8WT3iSy7fsVW51bOx8J72udpM4OBZLx1CQZCYR+9R51zCEaXBSpP2Jybibp2iiz1gsfI7eZN/S60h5A3zna8IYeS6fl2ivBiWhJIPNWIXRUO2NIjT0fzODUh+isHSFrwpUy7/z0kwzrGctkJczm6SkJd+sDNYW55baG+Ks7UHREpcK9Av9gIcH+W7Lg4KWEycU1BO0HZEHZk+XL4FAMNteGeIYD5hsvqm/RUagsa9vZ/Ugqcoicyfg/kBfngcsAhy7AIE4bQwYYzOBNsVSK5C1RBOIPXSFJCI9eTAAonvGufLGDNOHuSUrh9T2ATvaRwtnmx/AqD4a4CMADvBLYSnDjMNtTh0Bfq10zgB9FZF8RgeHVQwWJY+ZYP8f7ChuBg+mWn8FtAC5OKS0jiP7Ce6UkE3I9ciIXoFJ1jOB7R7yKNkXe7tfOW2dJyrD5InJzdQY6oCWxHYp26wKdq+yFX7BYaa4sBcAErhi3kJklGf+NACgK3KwCTCpxUMsQPUX0g4LalNfagrTtUWEZQSik2r49NJDTYnmNNkvixQUinV1LhkPlAufMk5qanU/hkjDfcUDhD0QeaUGFkIQTlab9vRXov9PGkZeIegy3rmDV8A+PVwWG11wjPjDHvIzMs2dBNMD6hk3BIMbT2+gjozsGcRV/zRNDkHlhmNR40pjYELH0cUfaWW7SCKtfiI9LfwxAEdQDDqs8JNInzvELPe3AALfrfp0gj3rnG429kIEWGgWB1UFQrDG14nMaSDvh0RkKhngB1Rw+Jk0wOry/uA9HLUGOKHD4BxxVo3MJfHY7LY29UMdThPASv3Ao9wbEHZS3TpfgTDxaGGEy1Vb3hvXn+i+p/FDNZdvQ3cQmY9wkJlUXI4jPccEEjNI82PEvJ2g0SxX5wyCKY0j1gCJUkAU8CVRwf5/dkL2lcxLRozR/fvQNs+zLAJYbfwXvVsGN8a6Z5cRABoNTWhakTDODP47A6+NJDzwKEifB/zBJko5xpswNpceV4YO68qGWXxw6dM4MgyAKbksntE1ILBvp8aKhH8BkQ2yyNeFuj6ZCVZkaCC5ayNz1mZXlxwWm+OxvpbXqz1h9wM490R3vVgyVM/0ZU+yJbMGCLYiaGpwlGACtJYjQ6PyAdvOK4AWpKqg9sRJjSxKoLfxpC26HwV4Kbq5xoa239NLSV6LyBO5HWlMavhAlldzRfKQjcIXNxJOtzP8RBRNjkAwK9hAh7qyJSEBytQVjbKRb4367E9g/bwwett0KnOD2SsU+oyxDBDdXs3thDd5kb7uyCt/o/d0eCXvpSsG51UZLPda+2DSlS62Bxk1yJaeDyDsP8j7CrCDRUcDYAmsapj8MyE438YOW1PuLUd8e/uqaus6ZquM/05NLVJtaCVaRrdLit9Mo1S+jBgss14tsbkuG8oAm5R/FVbCG38AHTC0bpOzmxTQlKYnbgJ9iu5bqVxLywDqZunoFW+AnW4MsO/BMeOxIsuA6Ye0zbQB0Sa4Gdd7khvCtBHUP1bIMTqOt/6NZc3UdMerEzVAH3d8JKGjW2sifOJK6n8SAuIfDswd";
//`k6CjBtAcAw+BpjWhZ+gKqN3rC0tn3eohlyAaCoCYni9J7qfTKu2NT1F9oEf94UncMUmxiYAQ/BvLh8X+UpRGVV4z/RPRzQfezAVvPckwSUQMrwfYQVRxiXJIHXdEHbR17s/CvO+30osiFiEduLmOjvRlMZBfzFaorUk+68uTzrJ/twfEaqK7Wp1zhjC65PaSaNiRrkk7IPdVyHj3K+Xgv66goPMmFMFB6QrxAW8hdm33pY29eQwtQ1eGSnwWebxnCAQA645vc0BPYwfkz8VahNxaMr6we0cqC1EBeirJvZwBwsIjlvf5H7hi4XyJVCm/wv3j9Gto0Fzi47F5PbGKjyIJFnhGXM+dLy/XGwwYyOhRLILaUDGFRwF5yzfc75XB1IiGyFKdQaSWy7KGi5Oqgm2wh1xHzA7WBzEMU4a6j41lgM32sMVT71EufgfJ29gjjybCueOiA1zGgwCRF3AaWdZsisyGsw9WTEurr+dFjxRKEfYSxpMIAJm2jbM/X4bfcqLf9KeH3mF2SJEO4Pn36oCAcBWmoEYZeF3VWbaT6xmtxnbEnMYPJxOfFfN/0VWm8Pqw5XvNKbngog3vQedPsfxe8SsGfPz+iOq55eaaXd+ggwSSaG8kiAllJu7WO9Fa699mByglGU/Xyuko19BWYQ5+lPHzmXrn4PcMaqda555XNFkYLJ/l5CUSj6+1AP5GD2SBs5Psn/0VIXhEw8IVXd/jT9bxeEFk+ZKGQL4u4JgQCJ0dqc6ELCgxvBLpZ862u5nwPlnCMDN6r09W58mvxC9ZQF4TZHg3D4eYr82XE5XsEjY7gXLMa5Yv4UC11jZxjt5YBONoBFBeE2tQd2K20t0p9SHGnOuC/c6uHdLF8fTwVMQeKGPtldD3bMnTqPntzfJBOiTS+NNOVo7GB9AAJIFAVjqaV/rBLeKB+DoLiS6RgQXTN6Zbudj9yMJX+vD+yRpjvAsCnAruInRTHJd/V090PckS3bS5FeZuJkguk9uQCHh32DMcVPwyXm4lTtRw6GI3HOmpd6eEUsaqS8Y5jL2zKvHwBs+mbiT7nVEH+j7PSL41pPxxyVn1XX5ZkFdvUwqx1uSaDzXQC7aWD/Pd++V2UKYRrM3Z7dfHgf2KVQggaj/W/hoY/xYrpmAV2Fvqzf7YZwKtSm0yvhwq2465pVpBXUTjYu6g1HKVO/G07EOQmGmyCANw0JfINRznvAxXXMmeg+z3uQj/0AFssCCpUW/FgNVmx3JuJNY5y5oCr3ALxH/3R14YMXelH7WtJ8Imhcs+B9KArHQA7vgWCcoHGHP+qLImkqr9XheEvoSLqxLywK3lkCDGgf98i4mG2/fSAqOzif8I3U+t0sK8oR+9xXH2Ccr9g7PT0nOkHTbzOS+Z38gqjeWkDoBOoUvX8p5W1KWITyPXHxJJ0DKJf/YXViePrAsyU89IV6C7ERkOA9VXgXgmVsqDzqxUBiAZwZ5b5fuqHFJn6ECvfknFr8sdQ8TF1xnIZT7bd+DipNcWyEqNPcd6lS6z68hLNlbeHa3wauPRbGSqIdmb3quVnnounARFjcOkfE5eRHYmRtLHRY5WTFV8AMNuDbbny/vICisTfqqtdTSVaieoHCXp+lmaUPB5qI0qJSSc459wXh7ujDwWwQTk7HHc9D5+3ttUS9jA`;

const DEFAULT_SESSION_ID: string = `0CFBAFC50205D01ECE6E35EBBF646DC6`;

interface PostSubmitInfractionParams {
  uuid: string;
  viewState?: string;
  jsessionid?: string;
  sessionId?: string;
}

export async function submitInfraccion({
  uuid,
  viewState = DEFAULT_VIEW_STATE,
  sessionId = DEFAULT_SESSION_ID,
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
