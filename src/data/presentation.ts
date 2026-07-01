export interface Slide {
  id: number;
  title: string;
  subtitle?: string;
  type: string;
}

export const capexData = [
  { year: "2027 (Ano 1)", valor: 3000000 },
  { year: "2028 (Ano 2)", valor: 5000000 },
  { year: "2029 (Ano 3)", valor: 3000000 },
  { year: "2030 (Ano 4)", valor: 3000000 },
  { year: "2031 (Ano 5)", valor: 3000000 },
];

export const opexData = [
  { period: "2028/29 (Talhão 1)", valor: 1000000 },
  { period: "2029/30 (Talhão 2)", valor: 1000000 },
  { period: "2030/31 (Talhão 3)", valor: 1000000 },
  { period: "2031/32 (Talhão 4)", valor: 1000000 },
  { period: "2032/33 (Talhão 5)", valor: 1000000 },
];

export const consolidadoData = [
  { year: "2027 (Ano 1)", capex: 3000000, opex: 0, total: 3000000 },
  { year: "2028 (Ano 2)", capex: 5000000, opex: 500000, total: 5500000 },
  { year: "2029 (Ano 3)", capex: 3000000, opex: 1000000, total: 4000000 },
  { year: "2030 (Ano 4)", capex: 3000000, opex: 1000000, total: 4000000 },
  { year: "2031 (Ano 5)", capex: 3000000, opex: 1000000, total: 4000000 },
  { year: "2032 (Ano 6)", capex: 0, opex: 1000000, total: 1000000 },
  { year: "2033 (Ano 7)", capex: 0, opex: 500000, total: 500000 },
];

export const comparativeMetrics = [
  {
    title: "Controle da Terra",
    cana: "Perda do controle operacional por longos contratos (5 a 10 anos).",
    consorcio: "Gestão 100% nas mãos do proprietário.",
  },
  {
    title: "Solo e Meio Ambiente",
    cana: "Degradação física/química pelo uso intensivo de maquinário pesado.",
    consorcio: "Conservação do solo, alta ciclagem de nutrientes e retenção de água.",
  },
  {
    title: "Margem Financeira",
    cana: "Renda fixa por tonelada (baixa margem por hectare, compensa apenas em escala muito maior que 200 ha).",
    consorcio: "Alta margem por hectare. Duas commodities de alto valor em mercados que raramente caem juntos.",
  },
  {
    title: "Impacto Social",
    cana: "Zero emprego fixo na fazenda (mecanização total da usina).",
    consorcio: "Manutenção e valorização dos sangradores e parceiros locais.",
  },
];
