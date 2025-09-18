import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { XMLParser } from "fast-xml-parser";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const { cepDestino } = req.body;

    const cepOrigem = "82310310";
    const peso = "1";
    const comprimento = "20";
    const altura = "10";
    const largura = "15";
    const diametro = "0"; 
    const codigoServico = "04510"; 

    const url = `https://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx?` +
      `nCdEmpresa=&sDsSenha=&sCepOrigem=${cepOrigem}&sCepDestino=${cepDestino}` +
      `&nVlPeso=${peso}&nCdFormato=1&nVlComprimento=${comprimento}` +
      `&nVlAltura=${altura}&nVlLargura=${largura}&nVlDiametro=${diametro}` +
      `&sCdMaoPropria=n&nVlValorDeclarado=0&sCdAvisoRecebimento=n` +
      `&nCdServico=${codigoServico}&StrRetorno=xml&nIndicaCalculo=3`;

    const response = await axios.get(url, { responseType: "text" });
    const parser = new XMLParser();
    const json = parser.parse(response.data);

    const servico = json.Servicos?.cServico;
    const valor = servico?.Valor || null;
    const prazo = servico?.PrazoEntrega || null;

    return res.status(200).json({ valor, prazo });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao calcular frete" });
  }
}
