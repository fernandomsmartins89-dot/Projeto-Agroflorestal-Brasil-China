export interface TranslationSchema {
  poloCacauSP: string;
  cacauSeringueira: string;
  projetoAgroflorestal: string;
  executando: string;
  autoplay: string;
  sairTelaCheia: string;
  telaCheia: string;
  alternarMenu: string;
  anterior: string;
  proximo: string;
  poloCacauSPCaps: string;
  saoJoseRioPreto: string;
  opFomento: string;
  modeloAgro: string;
  sustentabilidadeIntegrada: string;
  cacauCaps: string;
  seringaCaps: string;
  fernandoMoscardo: string;
  cargoFernando: string;
  culturasAtuantes: string;
  culturas: string[];
  introducao: string;
  perfilFazenda: string;
  areaTotal: string;
  areaProdutiva: string;
  historico: string;
  anosLatex: string;
  historicoTransicao: string;
  descMacuco: string;
  projPiloto: string;
  haExecutados: string;
  seringaCacau: string;
  mognoCacau: string;
  planosImplantacao: string;
  op1Cana: string;
  op1Desc: string;
  op1Badge: string;
  op2Seringueira: string;
  op2Desc: string;
  op2Badge: string;
  op3SeringueiraCacau: string;
  op3Desc: string;
  op3Badge: string;
  historicoFamiliar: string;
  descFamilia: string;
  analiseComparativa: string;
  subAnaliseComparativa: string;
  arrendamentoCana: string;
  consorcioSeringueiraCacau: string;
  baixoControle: string;
  altaMargem: string;
  compMetrics: { title: string; cana: string; consorcio: string }[];
  problematica: string;
  capitalNecessario: string;
  precisamosCapital: string;
  fomentoMacuco: string;
  sistema: string;
  sistemaDesc: string;
  mercadoFoco: string;
  mercadoDesc: string;
  estruturaModelo: string;
  estruturaImplantacao: string;
  implantacaoEscalonada: string;
  haAno: string;
  entradaReceita: string;
  distribuicaoTalhoes: string;
  ano1_40: string;
  ano2_80: string;
  ano3_120: string;
  ano4_160: string;
  ano5_200: string;
  modeloProdutivo: string;
  cacauDensidade: string;
  seringaDensidade: string;
  sistemaResiliente: string;
  densidadeHectare: string;
  plantasCacau: string;
  arvoresSeringa: string;
  estimativasProdutividade: string;
  produtividadeCacau: string;
  consorcioCaps: string;
  volumePlantas: string;
  pesCacau: string;
  produtividadeAnual: string;
  cacauFaixa: string;
  productionTotal: string;
  toneladasAno: string;
  producaoLatex: string;
  supressaoReimplante: string;
  volumeArvores: string;
  arvoresQtd: string;
  latexFaixa: string;
  volumeLatexTotal: string;
  latexQtd: string;
  investimentosCapex: string;
  investimentoCapex12m: string;
  implantacaoAgricola: string;
  milhoes15: string;
  industriaPosColheita: string;
  milhoes2: string;
  totalCaps: string;
  milhoes17: string;
  cronogramaCapex: string;
  custosOPEX: string;
  opexCaps: string;
  manutencaoOperacao: string;
  meses24: string;
  totalOpexCaps: string;
  milhoes5: string;
  cronogramaOpex: string;
  fluxoConsolidado: string;
  capexOpexConsolidado: string;
  totalCapexCaps: string;
  totalOpexCapsShort: string;
  somaGlobal: string;
  desembolsoConsolidado: string;
  logisticaSustentabilidade: string;
  logisticaEstrategica: string;
  portoSantos: string;
  exportacaoAsia: string;
  spAguas: string;
  esgSustentabilidade: string;
  sistemaAgroflorestal: string;
  capturaCarbono: string;
  producaoRegenerativa: string;
  resultadosEsperados: string;
  fomentoCaps: string;
  crescimentoRegiao: string;
  acompanhamentoCati: string;
  altaEscalabilidade: string;
  secagemEfetivada: string;
  futuroParceiro: string;
  parceriaAgro: string;
  brasilChina: string;
  resultadosResumo: string;
  estabilidadeFinanceira: string;
  seringaCacauPlus: string;
  conclusaoCaps: string;
  passosParceria: string;
  vamosFazerJuntos: string;
  memorandoDesc: string;
  cargoFernandoShort: string;
  resumoConclusao: string;
  faleConosco: string;
  whatsappContato: string;
  enviarEmail: string;
  sinteseProjeto: string;
  macucoFazenda: string;
  conclusaoItem1: string;
  conclusaoItem2: string;
  conclusaoItem3: string;
  conclusaoItem4: string;
}

export const translations: Record<"pt" | "zh", TranslationSchema> = {
  pt: {
    poloCacauSP: "Pólo Cacau SP",
    cacauSeringueira: "Cacau + Seringueira",
    projetoAgroflorestal: "Projeto Agroflorestal Brasil-China",
    executando: "Executando",
    autoplay: "Auto-Play",
    sairTelaCheia: "Sair da Tela Cheia",
    telaCheia: "Tela Cheia",
    alternarMenu: "Alternar Menu",
    anterior: "Anterior",
    proximo: "Próximo",
    // Slide 1
    poloCacauSPCaps: "PÓLO CACAU SP",
    saoJoseRioPreto: "São José do Rio Preto",
    opFomento: "Oportunidade de Fomento",
    modeloAgro: "Modelo Agro - Cultivo + Pós colheita",
    sustentabilidadeIntegrada: "Sustentabilidade Integrada",
    cacauCaps: "CACAU",
    seringaCaps: "SERINGA",
    fernandoMoscardo: "Fernando Moscardo",
    cargoFernando: "Engenheiro Agrônomo • Especialista em Agricultura Orgânica e Regenerativa",
    culturasAtuantes: "Culturas Atuantes",
    culturas: [
      "Resina de Pinus Ellioti",
      "Cenoura",
      "Café",
      "Gado de Corte",
      "Cacau",
      "Seringueira"
    ],
    // Slide 2
    introducao: "Introdução",
    perfilFazenda: "Perfil da Fazenda Macuco • Nova Granada - SP",
    areaTotal: "Área Total",
    areaProdutiva: "Área Produtiva",
    historico: "Histórico",
    anosLatex: "40+ Anos Látex",
    historicoTransicao: "Histórico & Transição",
    descMacuco: "A Fazenda Macuco está localizada em Nova Granada SP com 250 ha de área total e 220 ha produtivo. Sempre foi uma fazenda produtora de látex, para a indústria Braslatex da família, e hoje se encontra em fase de supressão das seringueiras após mais de 40 anos de extração. Esta é uma das fazendas da Família Verdi e do braço agrícola do Grupo Rodobens que possuem mais de 2.500 ha de seringueira na região.",
    projPiloto: "Projeto Piloto Em Andamento",
    haExecutados: "18 ha Executados",
    seringaCacau: "Seringa X Cacau",
    mognoCacau: "Mogno Africano X Cacau",
    planosImplantacao: "Planos de implantação nos 200 ha restantes estudados:",
    op1Cana: "1 – Cana de Açúcar por arrendo",
    op1Desc: "Arrendamento convencional de terra",
    op1Badge: "Proprietário não animado",
    op2Seringueira: "2 – Seringueira",
    op2Desc: "Monocultura tradicional de látex",
    op2Badge: "Tradicional",
    op3SeringueiraCacau: "3 – Seringueira X Cacau",
    op3Desc: "Modelo consorciado com cacau",
    op3Badge: "Escolha Estratégica",
    historicoFamiliar: "HISTORICO RURAL E FAMILIAR",
    descFamilia: "Embora o sobrenome Verdi seja amplamente conhecido nacionalmente pelo império fundado pelo Patriarca Waldemar Verdi (o Grupo Rodobens, fundado em 1949), a atuação do clã expandiu-se com enorme força para a produção agroindustrial. A transição das terras da família Verdi para a heveicultura reflete a própria história econômica da região de São José do Rio Preto. Após ciclos como o do algodão (no qual o patriarca chegou a ser conhecido como o \"Rei do Algodão\" entre as décadas de 1930 e 1940) e da pecuária. Temos todo potencial para fazer história nesta nova transição agropecuária para o Cacau consorciado com a seringueira.",
    // Slide 3
    analiseComparativa: "Análise Comparativa de Modelos de Uso da Terra",
    subAnaliseComparativa: "Arrendamento para Cana vs. Consórcio Seringueira + Cacau",
    arrendamentoCana: "Arrendamento para Cana",
    consorcioSeringueiraCacau: "Consórcio Seringueira + Cacau",
    baixoControle: "Baixo Controle / Desgaste Ambiental",
    altaMargem: "Alta Margem / Sustentável",
    compMetrics: [
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
    ],
    // Slide 4
    problematica: "Problemática Encontrada",
    capitalNecessario: "Capital Necessário",
    precisamosCapital: "Precisamos de 17 milhões para o projeto",
    // Slide 5
    fomentoMacuco: "FOMENTO FAZENDA MACUCO",
    sistema: "Sistema",
    sistemaDesc: "Sistema agroflorestal integrado",
    mercadoFoco: "Mercado Foco",
    mercadoDesc: "Foco: exportação e indústria nacional",
    // Slide 6
    estruturaModelo: "Estrutura de Implantação e Modelo",
    estruturaImplantacao: "Estrutura de Implantação",
    implantacaoEscalonada: "Implantação escalonada em 5 anos",
    haAno: "40 ha/ano",
    entradaReceita: "Entrada de receita a partir do ano 3",
    distribuicaoTalhoes: "Distribuição de implantação de talhões",
    ano1_40: "Ano 1 (40ha)",
    ano2_80: "Ano 2 (80ha)",
    ano3_120: "Ano 3 (120ha)",
    ano4_160: "Ano 4 (160ha)",
    ano5_200: "Ano 5 (200ha)",
    modeloProdutivo: "Modelo Produtivo",
    cacauDensidade: "Cacau: 700 plantas/ha",
    seringaDensidade: "Seringueira: 300 plantas/ha",
    sistemaResiliente: "Sistema consorciado resiliente",
    densidadeHectare: "Densidade do Consórcio por Hectare",
    plantasCacau: "Plantas de Cacau",
    arvoresSeringa: "Árvores Seringa",
    // Slide 7
    estimativasProdutividade: "Estimativas de Produtividade",
    produtividadeCacau: "Produtividade do Cacau",
    consorcioCaps: "Consórcio",
    volumePlantas: "Volume Plantas:",
    pesCacau: "140.000 pés cacau",
    produtividadeAnual: "Produtividade Anual:",
    cacauFaixa: "1.200 a 2.000 kg/ha/ano",
    productionTotal: "Production total:",
    toneladasAno: "240 a 400 toneladas/ano",
    producaoLatex: "Produção de Látex",
    supressaoReimplante: "Supressão & Reimplante",
    volumeArvores: "Volume de Árvores:",
    arvoresQtd: "60.000 árvores",
    latexFaixa: "3.000 kg/ha/ano",
    volumeLatexTotal: "Volume Látex Total:",
    latexQtd: "600.000 kg/ano de látex",
    // Slide 8
    investimentosCapex: "Investimentos (CAPEX)",
    investimentoCapex12m: "Investimento (CAPEX 12 meses)",
    implantacaoAgricola: "Implantação agrícola:",
    milhoes15: "R$ 15 milhões",
    industriaPosColheita: "Indústria pós-colheita:",
    milhoes2: "R$ 2 milhões",
    totalCaps: "Total:",
    milhoes17: "R$ 17 milhões",
    cronogramaCapex: "Cronograma CAPEX por Ano",
    // Slide 9
    custosOPEX: "Custos Operacionais (OPEX)",
    opexCaps: "OPEX",
    manutencaoOperacao: "Manutenção e operação:",
    meses24: "24 meses",
    totalOpexCaps: "Total OPEX:",
    milhoes5: "R$ 5 milhões",
    cronogramaOpex: "Cronograma OPEX por Talhão",
    // Slide 10
    fluxoConsolidado: "Fluxo Consolidado (CAPEX + OPEX)",
    capexOpexConsolidado: "CAPEX + OPEX Consolidado",
    totalCapexCaps: "Total CAPEX:",
    totalOpexCapsShort: "Total OPEX:",
    somaGlobal: "Soma Global:",
    desembolsoConsolidado: "Desembolso Consolidado por Ano",
    // Slide 11
    logisticaSustentabilidade: "Logística e Sustentabilidade",
    logisticaEstrategica: "Logística Estratégica Brasil-China",
    portoSantos: "Proximidade ao Porto de Santos (7h.)",
    exportacaoAsia: "Exportação facilitada para Ásia",
    spAguas: "Energia e água disponíveis e outorgadas pelo SP Aguas",
    esgSustentabilidade: "ESG e Sustentabilidade",
    sistemaAgroflorestal: "Sistema agroflorestal",
    capturaCarbono: "Captura de carbono",
    producaoRegenerativa: "Produção regenerativa",
    // Slide 12
    resultadosEsperados: "Resultados Esperados",
    fomentoCaps: "FOMENTO",
    crescimentoRegiao: "Crescimento produtivo da região",
    acompanhamentoCati: "Acompanhamento Técnico E Validação Governamental Através da CATI SJRP e Secretaria de Desenvolvimento do Estado de São Paulo",
    altaEscalabilidade: "Alta escalabilidade Em fazendas do grupo familiar e região",
    secagemEfetivada: "Industria Pós colheita – Secagem (cacau do polo SJRP) efetivada",
    futuroParceiro: "Futuro parceiro comercial para exportação (Barter)",
    parceriaAgro: "Parceria Agro",
    brasilChina: "Brasil & China",
    resultadosResumo: "Implantação escalonada que traz estabilidade socioeconômica, preservação ecológica, e inserção definitiva de São José do Rio Preto no mercado internacional de cacau.",
    estabilidadeFinanceira: "ESTABILIDADE FINANCEIRA",
    seringaCacauPlus: "Seringa + Cacau",
    // Slide 13
    conclusaoCaps: "Conclusão",
    passosParceria: "Próximos Passos e Parceria",
    vamosFazerJuntos: "Vamos fazer juntos?",
    memorandoDesc: "vamos fazer um Memorando de como isto pode acontecer !!",
    cargoFernandoShort: "Eng. Agr. Fernando Moscardo",
    resumoConclusao: "O Projeto Agroflorestal Brasil-China representa uma nova era para a Fazenda Macuco e para o polo de cacau de São José do Rio Preto. Ao unir a tradição da seringueira com a alta rentabilidade do cacau, criamos um modelo produtivo sustentável, resiliente ao mercado e com forte impacto socioeconômico. Junte-se a nós nesta transição ecológica e comercial.",
    faleConosco: "Fale Conosco",
    whatsappContato: "WhatsApp/Contato",
    enviarEmail: "Enviar E-mail",
    sinteseProjeto: "Síntese do Projeto",
    macucoFazenda: "Fazenda Macuco",
    conclusaoItem1: "220 ha de Área Produtiva Integrada",
    conclusaoItem2: "Consórcio de Alta Margem (Seringa + Cacau)",
    conclusaoItem3: "Logística Consolidada com Secadora Ativa",
    conclusaoItem4: "Potencial ESG & Crédito de Carbono"
  },
  zh: {
    poloCacauSP: "圣保罗可可产业基地",
    cacauSeringueira: "可可 + 橡胶树",
    projetoAgroflorestal: "中巴农林业合作项目",
    executando: "自动放映中",
    autoplay: "自动放映",
    sairTelaCheia: "退出全屏",
    telaCheia: "全屏",
    alternarMenu: "切换菜单",
    anterior: "上一页",
    proximo: "下一页",
    // Slide 1
    poloCacauSPCaps: "圣保罗可可中心",
    saoJoseRioPreto: "圣若泽杜里奥普雷托",
    opFomento: "扶持与合作机遇",
    modeloAgro: "农业模式：种植 + 产后加工",
    sustentabilidadeIntegrada: "综合可持续发展",
    cacauCaps: "可可",
    seringaCaps: "橡胶",
    fernandoMoscardo: "费尔南多·莫斯卡多",
    cargoFernando: "农艺工程师 • 有机与再生农业专家",
    culturasAtuantes: "经营作物",
    culturas: [
      "湿地松树脂",
      "胡萝卜",
      "咖啡",
      "肉牛",
      "可可",
      "橡胶树"
    ],
    // Slide 2
    introducao: "项目简介",
    perfilFazenda: "马库科农场概况 • 圣保罗州新格拉纳达市",
    areaTotal: "总面积",
    areaProdutiva: "生产面积",
    historico: "历史背景",
    anosLatex: "40年+乳胶生产",
    historicoTransicao: "历史与转型",
    descMacuco: "马库科农场（Fazenda Macuco）位于圣保罗州新格拉纳达市，总面积250公顷，生产面积220公顷。该农场历史上一直为家族旗下的Braslatex工业生产乳胶。在经历了40多年的开采后，目前正处于橡胶树的采伐与更新阶段。这是威尔第（Verdi）家族及Rodobens集团农业分支机构在当地拥有的农场之一，该家族在当地拥有超过2,500公顷的橡胶林。",
    projPiloto: "进行中的试点项目",
    haExecutados: "已实施18公顷",
    seringaCacau: "橡胶树 x 可可",
    mognoCacau: "非洲楝 x 可可",
    planosImplantacao: "针对剩余200公顷土地所研究的种植方案：",
    op1Cana: "1 – 甘蔗土地租赁",
    op1Desc: "传统的土地租赁模式",
    op1Badge: "土地所有者意愿低",
    op2Seringueira: "2 – 橡胶树单作",
    op2Desc: "传统的单一乳胶种植",
    op2Badge: "传统模式",
    op3SeringueiraCacau: "3 – 橡胶树 x 可可混作",
    op3Desc: "橡胶与可可间作套种模式",
    op3Badge: "战略性选择",
    historicoFamiliar: "农业与家族历史背景",
    descFamilia: "虽然威尔第（Verdi）这一姓氏因族长瓦尔德马尔·威尔第（Waldemar Verdi）创立的Rodobens集团（始建于1949年）而在巴西全国闻名，但该家族在农业工业领域的布局同样非常强大。威尔第家族土地向橡胶种植业的转型，折射出了圣若泽杜里奥普雷托地区的经济史。在经历了棉花周期（在20世纪30至40年代，族长曾被称为“棉花之王”）和畜牧业之后，在这场向“橡胶树-可可混作”的新型农业转型中，我们完全有潜力再次创造历史。",
    // Slide 3
    analiseComparativa: "土地利用模式对比分析",
    subAnaliseComparativa: "甘蔗租赁对比橡胶+可可混作模式",
    arrendamentoCana: "甘蔗租赁",
    consorcioSeringueiraCacau: "橡胶树+可可混作",
    baixoControle: "控制力低 / 环境退化",
    altaMargem: "高利润 / 可持续发展",
    compMetrics: [
      {
        title: "土地控制权",
        cana: "因长期租赁合同（5至10年）而丧失土地运营控制权。",
        consorcio: "管理权100%掌握在土地所有者手中。",
      },
      {
        title: "土壤与生态环境",
        cana: "重型机械的高强度使用导致土壤物理和化学退化。",
        consorcio: "保护土壤，具有高养分循环和蓄水保水能力。",
      },
      {
        title: "财务利润率",
        cana: "按吨计的固定收益（每公顷利润率低，仅在远超200公顷的大规模种植下才具经济效益）。",
        consorcio: "每公顷利润率高。两种高价值大宗商品，其市场价格极少同时下跌。",
      },
      {
        title: "社会影响",
        cana: "农场无法提供长期固定就业岗位（糖厂完全机械化）。",
        consorcio: "保留并提升割胶工及当地合作伙伴的价值。",
      },
    ],
    // Slide 4
    problematica: "面临痛点",
    capitalNecessario: "所需资金",
    precisamosCapital: "项目总需资金1700万雷亚尔",
    // Slide 5
    fomentoMacuco: "马库科农场扶持与投资",
    sistema: "系统模式",
    sistemaDesc: "综合农林复合系统（混作）",
    mercadoFoco: "目标市场",
    mercadoDesc: "核心：出口与国内工业市场",
    // Slide 6
    estruturaModelo: "实施结构与模式",
    estruturaImplantacao: "实施方案/结构",
    implantacaoEscalonada: "5年期分阶段实施",
    haAno: "40公顷/年",
    entradaReceita: "自第3年起开始产生收益",
    distribuicaoTalhoes: "各种植区实施分布",
    ano1_40: "第1年 (40ha)",
    ano2_80: "第2年 (80ha)",
    ano3_120: "第3年 (120ha)",
    ano4_160: "第4年 (160ha)",
    ano5_200: "第5年 (200ha)",
    modeloProdutivo: "种植生产模式",
    cacauDensidade: "可可：700株/公顷",
    seringaDensidade: "橡胶树：300株/公顷",
    sistemaResiliente: "具抗风险能力的混作系统",
    densidadeHectare: "每公顷混作种植密度",
    plantasCacau: "可可植株",
    arvoresSeringa: "橡胶树",
    // Slide 7
    estimativasProdutividade: "产量预估",
    produtividadeCacau: "可可产量预估",
    consorcioCaps: "混作模式",
    volumePlantas: "植株总量：",
    pesCacau: "140,000株可可",
    produtividadeAnual: "年均产量：",
    cacauFaixa: "1,200至2,000公斤/公顷/年",
    productionTotal: "年总产量：",
    toneladasAno: "240至400吨/年",
    producaoLatex: "乳胶产量预估",
    supressaoReimplante: "采伐与重新种植",
    volumeArvores: "树木总量：",
    arvoresQtd: "60,000棵树",
    latexFaixa: "3,000公斤/公顷/年",
    volumeLatexTotal: "乳胶总产量：",
    latexQtd: "600,000公斤/年乳胶",
    // Slide 8
    investimentosCapex: "资本支出 (CAPEX)",
    investimentoCapex12m: "资本支出 (12个月CAPEX)",
    implantacaoAgricola: "农业种植实施：",
    milhoes15: "1500万雷亚尔",
    industriaPosColheita: "收获后加工工业：",
    milhoes2: "200万雷亚尔",
    totalCaps: "总计：",
    milhoes17: "1700万雷亚尔",
    cronogramaCapex: "年度CAPEX时间表",
    // Slide 9
    custosOPEX: "运营成本 (OPEX)",
    opexCaps: "OPEX",
    manutencaoOperacao: "维护与运营：",
    meses24: "24个月",
    totalOpexCaps: "OPEX总额：",
    milhoes5: "500万雷亚尔",
    cronogramaOpex: "分种植区OPEX时间表",
    // Slide 10
    fluxoConsolidado: "综合资金流 (CAPEX + OPEX)",
    capexOpexConsolidado: "资本与运营支出综合",
    totalCapexCaps: "CAPEX总计：",
    totalOpexCapsShort: "OPEX总计：",
    somaGlobal: "投资总额：",
    desembolsoConsolidado: "年度综合支出图表",
    // Slide 11
    logisticaSustentabilidade: "物流与可持续发展 (ESG)",
    logisticaEstrategica: "中巴战略物流",
    portoSantos: "临近桑托斯港（车程约7小时）",
    exportacaoAsia: "便捷出口至亚洲市场",
    spAguas: "具备圣保罗水务局批准的充足水电资源",
    esgSustentabilidade: "ESG与可持续性",
    sistemaAgroflorestal: "农林复合系统种植",
    capturaCarbono: "显著的碳捕集效益",
    producaoRegenerativa: "再生农业生产模式",
    // Slide 12
    resultadosEsperados: "预期成效",
    fomentoCaps: "扶持效益",
    crescimentoRegiao: "推动区域农业生产增长",
    acompanhamentoCati: "由圣保罗州农业厅圣若泽杜里奥普雷托技术推广中心（CATI SJRP）及圣保罗州发展厅提供技术支持与官方认证",
    altaEscalabilidade: "在家族集团及周边的农场中具有极高的推广与复制潜力",
    secagemEfetivada: "落实收获后加工产业 —— 实现圣若泽杜里奥普雷托基地可可就地干燥加工",
    futuroParceiro: "作为未来出口（以货易货/Barter模式）的商业合作伙伴",
    parceriaAgro: "农业伙伴关系",
    brasilChina: "巴西 & 中国",
    resultadosResumo: "分阶段的种植实施将带来社会经济稳定、生态环境保护，并使圣若泽杜里奥普雷托正式融入国际可可市场。",
    estabilidadeFinanceira: "财务稳健性",
    seringaCacauPlus: "橡胶 + 可可",
    // Slide 13
    conclusaoCaps: "结语",
    passosParceria: "下一步行动与合作伙伴关系",
    vamosFazerJuntos: "让我们携手共创？",
    memorandoDesc: "让我们共同制定一份合作备忘录，明确项目落实路径！",
    cargoFernandoShort: "农艺工程师 费尔南多·莫斯卡多",
    resumoConclusao: "中巴农林合作项目代表了马库科农场以及圣若泽杜里奥普雷托可可产业基地的新纪元。通过将传统的橡胶树种植与高回报的可可相结合，我们创建了一个对市场具有强抗风险能力的可持续再生农业模式。欢迎加入我们的生态与商业转型。",
    faleConosco: "联系我们",
    whatsappContato: "微信/WhatsApp/电话",
    enviarEmail: "发送电子邮件",
    sinteseProjeto: "项目概述",
    macucoFazenda: "马库科农场",
    conclusaoItem1: "220公顷综合生产区",
    conclusaoItem2: "高利润混作（橡胶+可可）",
    conclusaoItem3: "完善的物流与就地烘干加工",
    conclusaoItem4: "ESG投资潜能与碳信用额度"
  }
};
