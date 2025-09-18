import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { XMLParser } from "fast-xml-parser";

export async function POST(req: NextRequest) {
  try {
    const { cepDestino } = await req.json();
    const cepLimpo = String(cepDestino || "").replace(/\D/g, "");

    if (cepLimpo.length !== 8) {
      return NextResponse.json(
        { valor: null, prazo: null, erro: "CEP inválido (8 dígitos)" },
        { status: 400 }
      );
    }

    const cepOrigem = "82310310";

    const url =
      "http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx/CalcPrecoPrazo" +
      `?nCdEmpresa=&sDsSenha=&nCdServico=04510&sCepOrigem=${cepOrigem}&sCepDestino=${cepLimpo}` +
      `&nVlPeso=1&nCdFormato=1&nVlComprimento=20&nVlAltura=10&nVlLargura=15&nVlDiametro=0` +
      `&sCdMaoPropria=n&nVlValorDeclarado=0&sCdAvisoRecebimento=n&StrRetorno=xml&nIndicaCalculo=3`;

    const response = await axios.get(url, {
      responseType: "text",
      headers: { "User-Agent": "Mozilla/5.0" },
      timeout: 8000,
    });

    let json;
    try {
      const parser = new XMLParser({ ignoreAttributes: false });
      json = parser.parse(response.data);
    } catch {
      return NextResponse.json({
        valor: "25.90",
        prazo: "7",
        aviso: "Mock: erro ao processar XML, usando valor padrão",
      });
    }

    if (!json?.Servicos?.cServico) {
      return NextResponse.json({
        valor: "30.00",
        prazo: "10",
        aviso: "Mock: resposta inesperada dos Correios",
      });
    }

    const servicos = json.Servicos.cServico;
    const servico = Array.isArray(servicos) ? servicos[0] : servicos;

    if (!servico || servico.Erro !== "0") {
      return NextResponse.json({
        valor: "20.00",
        prazo: "5",
        aviso: servico?.MsgErro || "Mock: erro no cálculo de frete",
      });
    }

    const valor = servico.Valor?.replace(",", ".") || null;
    const prazo = servico.PrazoEntrega || null;

    return NextResponse.json({ valor, prazo });
  } catch (error: any) {
    return NextResponse.json({
      valor: "19.90",
      prazo: "8",
      aviso: "Mock: erro interno, usando valor padrão",
    });
  }
}
