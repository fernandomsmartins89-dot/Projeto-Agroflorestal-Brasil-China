"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Maximize2,
  Minimize2,
  Sparkles,
  MapPin,
  Trees,
  TrendingUp,
  Coins,
  ShieldAlert,
  Scale,
  Anchor,
  Leaf,
  CheckCircle2,
  List,
  Layers,
  Activity,
  FileText,
  Users,
  User,
  Compass,
  ArrowRight,
  TrendingDown,
  Mail,
  Phone
} from "lucide-react";
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
  ComposedChart,
  Line
} from "recharts";
import {
  capexData,
  opexData,
  consolidadoData,
  comparativeMetrics,
} from "@/data/presentation";
import { translations } from "@/data/translations";

const getYearLabel = (year: string, lang: 'pt' | 'zh') => {
  if (lang === 'zh') {
    return year
      .replace("Ano 1", "第1年")
      .replace("Ano 2", "第2年")
      .replace("Ano 3", "第3年")
      .replace("Ano 4", "第4年")
      .replace("Ano 5", "第5年")
      .replace("Ano 6", "第6年")
      .replace("Ano 7", "第7年");
  }
  return year;
};

const getPeriodLabel = (period: string, lang: 'pt' | 'zh') => {
  if (lang === 'zh') {
    return period
      .replace("Talhão 1", "地块 1")
      .replace("T 2", "地块 2")
      .replace("T 3", "地块 3")
      .replace("T 4", "地块 4")
      .replace("T 5", "地块 5");
  }
  return period;
};

// Number formatter helper
const formatBRL = (value: number, lang: 'pt' | 'zh' = 'pt') => {
  return new Intl.NumberFormat(lang === "zh" ? "zh-CN" : "pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
};

export function PresentationDeck() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeCompareMetric, setActiveCompareMetric] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [lang, setLang] = useState<"pt" | "zh">("pt");

  const t = translations[lang];
  const totalSlides = 13;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide, isFullscreen]);

  // Autoplay effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        nextSlide();
      }, 12000); // 12 seconds per slide
    }
    return () => clearInterval(interval);
  }, [isPlaying, nextSlide]);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(err);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch((err) => {
        console.error(err);
      });
      setIsFullscreen(false);
    }
  };

  // Monitor screen changes to exit fullscreen state gracefully
  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  const slideList = lang === "pt" ? [
    { name: "Capa", desc: "Projeto Brasil-China" },
    { name: "Introdução", desc: "Fazenda Macuco" },
    { name: "Análise Comparativa", desc: "Cana vs Consórcio" },
    { name: "Problemática", desc: "Fomento Necessário" },
    { name: "Fomento", desc: "Fazenda Macuco" },
    { name: "Implantação", desc: "Estrutura 5 Anos" },
    { name: "Produtividade", desc: "Estimativas Anuais" },
    { name: "CAPEX", desc: "Cronograma de Investimentos" },
    { name: "OPEX", desc: "Manutenção de Talhões" },
    { name: "Fluxo Consolidado", desc: "Desembolso Geral" },
    { name: "Logística e ESG", desc: "Sustentabilidade" },
    { name: "Resultados Esperados", desc: "Impacto Agro" },
    { name: "Conclusão", desc: "Vamos fazer juntos?" }
  ] : [
    { name: "封面", desc: "中巴合作项目" },
    { name: "项目简介", desc: "马库科农场" },
    { name: "对比分析", desc: "甘蔗 vs 橡胶和可可混作" },
    { name: "面临痛点", desc: "所需扶持资金" },
    { name: "扶持与投资", desc: "马库科农场" },
    { name: "实施结构", desc: "5年期规划" },
    { name: "产量预估", desc: "年度预估" },
    { name: "CAPEX", desc: "资本支出年度表" },
    { name: "OPEX", desc: "各区维护成本" },
    { name: "综合资金流", desc: "总支出明细" },
    { name: "物流与ESG", desc: "可持续发展" },
    { name: "预期成效", desc: "农业效益" },
    { name: "结语", desc: "让我们携手共创？" }
  ];

  // Custom Chart Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-olive/20 rounded-xl shadow-elevation-2 font-sans text-xs">
          <p className="font-bold text-olive-dark mb-1">{getYearLabel(label, lang)}</p>
          {payload.map((item: any, index: number) => {
            let name = item.name;
            if (lang === "zh") {
              if (name === "Total Anual" || name === "total") name = "年度总计";
              if (name === "CAPEX" || name === "capex") name = "CAPEX";
              if (name === "OPEX" || name === "opex") name = "OPEX";
            }
            return (
              <p key={index} className="font-medium" style={{ color: item.color || "#6a7b4f" }}>
                {name}: <span className="font-bold">{formatBRL(item.value, lang)}</span>
              </p>
            );
          })}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`flex ${isFullscreen ? "h-screen w-screen" : "min-h-screen"} bg-cream text-olive-dark overflow-hidden font-sans`}>
      {/* Sidebar Navigation */}
      <AnimatePresence initial={false}>
        {sidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="hidden md:flex flex-col bg-white border-r border-olive/15 shrink-0 z-20 h-full relative"
          >
            <div className="p-6 border-b border-olive/15 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-olive flex items-center justify-center text-cream font-bold font-display">
                  P
                </div>
                <div>
                  <h2 className="font-display font-bold text-sm tracking-tight text-olive-dark">{t.poloCacauSP}</h2>
                  <p className="text-[10px] text-olive/75 uppercase tracking-wider font-semibold">{t.cacauSeringueira}</p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
              {slideList.map((slide, idx) => {
                const isActive = idx === currentSlide;
                return (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                      isActive
                        ? "bg-olive text-cream shadow-elevation-1"
                        : "hover:bg-olive/10 text-olive-dark/75 hover:text-olive-dark"
                    }`}
                  >
                    <span className={`w-6 h-6 rounded-md flex items-center justify-center font-display text-xs font-bold ${
                      isActive ? "bg-cream text-olive" : "bg-olive/10 text-olive group-hover:bg-olive/20"
                    }`}>
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <div className="truncate">
                      <p className="text-xs font-bold truncate">{slide.name}</p>
                      <p className={`text-[10px] truncate ${isActive ? "text-cream/70" : "text-olive-dark/50"}`}>
                        {slide.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="p-4 border-t border-olive/15 bg-cream/30 text-center">
              <p className="text-[10px] font-medium text-olive-dark/50 font-display">
                {t.projetoAgroflorestal}
              </p>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Slide Container */}
      <div className="flex-1 flex flex-col min-w-0 h-full relative">
        {/* Top Floating Control Bar */}
        <header className="px-6 py-4 flex items-center justify-between border-b border-olive/10 bg-white/70 backdrop-blur-md z-15">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-olive/10 rounded-xl text-olive transition-colors"
              title={t.alternarMenu}
            >
              <List className="w-5 h-5" />
            </button>
            <div className="h-4 w-[1px] bg-olive/20" />
            <div className="text-xs font-medium text-olive-dark/75">
              {lang === "pt" ? (
                <>
                  Slide <span className="font-display font-bold text-olive-dark text-sm">{currentSlide + 1}</span> de <span className="font-display font-bold text-olive-dark text-sm">{totalSlides}</span>
                </>
              ) : (
                <>
                  第 <span className="font-display font-bold text-olive-dark text-sm">{currentSlide + 1}</span> 页，共 <span className="font-display font-bold text-olive-dark text-sm">{totalSlides}</span> 页
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Language toggle swap */}
            <div className="flex bg-olive/10 p-0.5 rounded-xl border border-olive/15 items-center">
              <button
                onClick={() => setLang("pt")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                  lang === "pt"
                    ? "bg-white text-olive shadow-elevation-1"
                    : "text-olive-dark/60 hover:text-olive"
                }`}
                title="Português"
              >
                <span className="text-sm leading-none">🇧🇷</span>
                <span className="hidden sm:inline">PT</span>
              </button>
              <button
                onClick={() => setLang("zh")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                  lang === "zh"
                    ? "bg-white text-olive shadow-elevation-1"
                    : "text-olive-dark/60 hover:text-olive"
                }`}
                title="中文 (Mandarim)"
              >
                <span className="text-sm leading-none">🇨🇳</span>
                <span className="hidden sm:inline">ZH</span>
              </button>
            </div>

            {/* Autoplay toggle */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                isPlaying
                  ? "bg-olive text-cream"
                  : "bg-olive/10 text-olive hover:bg-olive/20"
              }`}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{t.executando === "自动放映中" && !isPlaying ? "自动放映" : t.executando}</span>
            </button>

            <button
              onClick={toggleFullscreen}
              className="p-2 hover:bg-olive/10 rounded-xl text-olive transition-colors"
              title={isFullscreen ? t.sairTelaCheia : t.telaCheia}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </header>

        {/* Global Progress Bar */}
        <div className="w-full h-1 bg-olive/10 relative">
          <motion.div
            className="absolute top-0 left-0 h-full bg-olive"
            animate={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
          {isPlaying && (
            <motion.div
              key={currentSlide}
              className="absolute bottom-0 left-0 h-0.5 bg-terracotta"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 12, ease: "linear" }}
            />
          )}
        </div>

        {/* Content Viewer Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 md:p-12 lg:p-16 flex flex-col justify-center max-w-6xl mx-auto w-full relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="w-full flex-1 flex flex-col justify-center min-h-[500px]"
            >
              {/* SLIDE 1: CAPA */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-6">
                  <div className="lg:col-span-7 flex flex-col gap-6 text-left">
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-olive/10 text-olive px-3 py-1 rounded-full text-xs font-semibold">
                        {t.poloCacauSPCaps}
                      </span>
                      <span className="bg-terracotta/10 text-terracotta px-3 py-1 rounded-full text-xs font-semibold">
                        {t.saoJoseRioPreto}
                      </span>
                    </div>

                    <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-extrabold text-olive-dark tracking-tight leading-none">
                      {lang === "pt" ? (
                        <>Projeto Agroflorestal <br /><span className="text-olive">Brasil-China</span></>
                      ) : (
                        <>中巴农林业合作项目 <br /><span className="text-olive">巴西-中国</span></>
                      )}
                    </h1>

                    <p className="font-display text-xl sm:text-2xl font-bold text-olive/90 max-w-2xl leading-relaxed">
                      {lang === "pt" ? "Sistema Agroflorestal - Cacau + Seringueira" : "农林复合系统 - 可可 + 橡胶树"}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 mt-4 text-sm font-medium text-olive-dark/75">
                      <div className="flex items-center gap-2 bg-white/60 border border-olive/10 px-4 py-2.5 rounded-xl shadow-elevation-1">
                        <Sparkles className="w-4 h-4 text-terracotta" />
                        <span>{t.opFomento}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/60 border border-olive/10 px-4 py-2.5 rounded-xl shadow-elevation-1">
                        <Trees className="w-4 h-4 text-olive" />
                        <span>{t.modeloAgro}</span>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 flex flex-col gap-6 items-center justify-center">
                    {/* Small spinning graphic & badges */}
                    <div className="relative w-40 h-40 flex items-center justify-center shrink-0">
                      {/* Rotating Dashed Border */}
                      <div className="absolute inset-0 rounded-full border-2 border-dashed border-olive/25 animate-[spin_120s_linear_infinite]" />
                      
                      {/* Non-rotating Inner Content */}
                      <div className="w-30 h-30 rounded-full bg-olive/5 flex items-center justify-center p-2.5 z-10">
                        <div className="w-22 h-22 rounded-full bg-white shadow-elevation-2 flex flex-col items-center justify-center gap-0.5 text-center p-2">
                          <Trees className="w-5 h-5 text-olive" />
                          <span className="font-display text-[8px] font-bold text-olive-dark leading-tight">
                            {lang === "pt" ? <>Sustentabilidade<br/>Integrada</> : <>综合可持续<br/>发展</>}
                          </span>
                        </div>
                      </div>
                      
                      {/* Floating Accent badges */}
                      <div className="absolute -top-1 -right-1 bg-terracotta text-white font-bold px-2 py-0.5 rounded-xl shadow-elevation-1 text-[8px] z-10">
                        {t.cacauCaps}
                      </div>
                      <div className="absolute -bottom-1 -left-1 bg-olive text-cream font-bold px-2 py-0.5 rounded-xl shadow-elevation-1 text-[8px] z-10">
                        {t.seringaCaps}
                      </div>
                    </div>

                    {/* Presenter Profile Card */}
                    <div className="w-full p-5 rounded-2xl border border-olive/10 bg-white/50 backdrop-blur-md shadow-elevation-1 space-y-4 text-left">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-olive/15 to-olive/30 text-olive flex items-center justify-center border border-olive/20 shadow-inner shrink-0">
                          <User className="w-6 h-6 text-olive" />
                        </div>
                        <div>
                          <h3 className="font-display text-base font-black text-olive-dark leading-tight">
                            {t.fernandoMoscardo}
                          </h3>
                          <p className="text-[11px] font-semibold text-olive/80">
                            {t.cargoFernando}
                          </p>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-olive/10">
                        <span className="text-[9px] uppercase tracking-wider font-extrabold text-olive/75 block mb-2">
                          {t.culturasAtuantes}
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {t.culturas.map((cultura) => (
                            <span
                              key={cultura}
                              className="px-2.5 py-1 bg-white/80 text-olive-dark text-[10px] font-bold rounded-lg border border-olive/15 hover:bg-olive hover:text-white transition-all duration-200 shadow-sm cursor-default"
                            >
                              {cultura}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 2: INTRODUÇÃO */}
              {currentSlide === 1 && (
                <div className="space-y-6">
                  {/* Top Header & Header Metrics */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-olive/10 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-olive/10 text-olive flex items-center justify-center shadow-inner">
                        <Compass className="w-5 h-5 animate-pulse" />
                      </div>
                      <div className="text-left">
                        <h2 className="font-display text-2xl font-bold tracking-tight uppercase text-olive">{t.introducao}</h2>
                        <p className="text-[10px] text-olive-dark/60 font-bold uppercase tracking-wider">{t.perfilFazenda}</p>
                      </div>
                    </div>
                    
                    {/* Header quick metrics */}
                    <div className="flex flex-wrap gap-2 text-left">
                      <div className="bg-white/90 border border-olive/10 px-4 py-2 rounded-xl shadow-elevation-1 flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-olive/10 text-olive flex items-center justify-center">
                          <Compass className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-[8px] uppercase tracking-widest font-extrabold text-olive/60 block leading-tight">{t.areaTotal}</span>
                          <span className="font-display font-black text-sm text-olive-dark">250 ha</span>
                        </div>
                      </div>
                      <div className="bg-white/90 border border-olive/10 px-4 py-2 rounded-xl shadow-elevation-1 flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-olive/10 text-olive flex items-center justify-center">
                          <Trees className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-[8px] uppercase tracking-widest font-extrabold text-olive/60 block leading-tight">{t.areaProdutiva}</span>
                          <span className="font-display font-black text-sm text-olive">220 ha</span>
                        </div>
                      </div>
                      <div className="bg-white/90 border border-olive/10 px-4 py-2 rounded-xl shadow-elevation-1 flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-terracotta/10 text-terracotta flex items-center justify-center">
                          <Activity className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-[8px] uppercase tracking-widest font-extrabold text-olive/60 block leading-tight">{t.historico}</span>
                          <span className="font-display font-black text-sm text-terracotta">{t.anosLatex}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch text-left">
                    {/* Left Column: Legacy, Transition & Pilot */}
                    <div className="lg:col-span-5 flex flex-col justify-between gap-5">
                      {/* Legado Card */}
                      <div className="bg-gradient-to-br from-white to-olive/[0.02] border-y border-r border-olive/15 border-l-4 border-l-olive rounded-2xl p-5 shadow-elevation-1 relative overflow-hidden flex-1">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-olive/[0.03] rounded-bl-full pointer-events-none" />
                        <div className="flex items-center gap-2 mb-3">
                          <Anchor className="w-4 h-4 text-olive/70" />
                          <h3 className="text-xs font-bold text-olive uppercase tracking-wider">{t.historicoTransicao}</h3>
                        </div>
                        <p className="text-xs sm:text-sm text-olive-dark/90 leading-relaxed font-medium">
                          {t.descMacuco}
                        </p>
                      </div>

                      {/* Projeto Piloto */}
                      <div className="bg-white border border-olive/15 rounded-2xl p-5 shadow-elevation-1 flex-1">
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="text-xs font-bold text-olive uppercase tracking-wider flex items-center gap-1.5">
                            <Layers className="w-4 h-4 text-olive" />
                            {t.projPiloto}
                          </h3>
                          <span className="bg-olive/10 text-olive px-2.5 py-0.5 rounded-full text-[10px] font-bold">{t.haExecutados}</span>
                        </div>
                        <p className="text-[11px] text-olive-dark/70 leading-relaxed mb-4">
                          {lang === "pt"
                            ? "Já estamos com um projeto piloto de 18 hectares em andamento com seringa X e cacau (10 hectares) e mogno africano X cacau (8 hectares)."
                            : "我们目前正在实施一个18公顷的试点项目，其中包括橡胶树与可可混作（10公顷）以及非洲楝与可可混作（8公顷）。"}
                        </p>
                        
                        <div className="space-y-4">
                          {/* Seringueira X Cacau Progress */}
                          <div className="space-y-1.5">
                            <div className="flex justify-between text-xs font-bold text-olive-dark">
                              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-olive" />{t.seringaCacau}</span>
                              <span className="text-olive">10 ha (56%)</span>
                            </div>
                            <div className="h-2.5 w-full bg-olive/10 rounded-full overflow-hidden p-[2px]">
                              <div className="h-full bg-olive rounded-full" style={{ width: "56%" }} />
                            </div>
                          </div>

                          {/* Mogno Africano X Cacau Progress */}
                          <div className="space-y-1.5">
                            <div className="flex justify-between text-xs font-bold text-olive-dark">
                              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-terracotta" />{t.mognoCacau}</span>
                              <span className="text-terracotta">8 ha (44%)</span>
                            </div>
                            <div className="h-2.5 w-full bg-olive/10 rounded-full overflow-hidden p-[2px]">
                              <div className="h-full bg-terracotta rounded-full" style={{ width: "44%" }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Plans for 200ha remaining */}
                    <div className="lg:col-span-7 flex flex-col justify-between gap-5">
                      {/* Planos Estudados */}
                      <div className="bg-white border border-olive/15 rounded-2xl p-5 shadow-elevation-1 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-xs font-bold text-olive uppercase tracking-wider mb-4 flex items-center gap-1.5">
                            <List className="w-4 h-4 text-olive" />
                            {t.planosImplantacao}
                          </h3>

                          <div className="space-y-3">
                            {/* Opção 1: Cana */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl border border-red-500/15 bg-red-500/[0.02] opacity-75">
                              <div className="flex items-start gap-2.5">
                                <ShieldAlert className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                                <div className="space-y-0.5 text-left">
                                  <span className="text-xs font-bold text-olive-dark/85">{t.op1Cana}</span>
                                  <p className="text-[10px] text-olive-dark/50">{t.op1Desc}</p>
                                </div>
                              </div>
                              <span className="bg-red-500/10 text-red-700 px-2.5 py-0.5 rounded text-[9px] font-bold self-start sm:self-auto mt-2 sm:mt-0 uppercase tracking-wide shrink-0">
                                {t.op1Badge}
                              </span>
                            </div>

                            {/* Opção 2: Seringueira */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl border border-olive/15 bg-olive/[0.02] opacity-70">
                              <div className="flex items-start gap-2.5">
                                <Trees className="w-4 h-4 text-olive/60 shrink-0 mt-0.5" />
                                <div className="space-y-0.5 text-left">
                                  <span className="text-xs font-bold text-olive-dark/85">{t.op2Seringueira}</span>
                                  <p className="text-[10px] text-olive-dark/50">{t.op2Desc}</p>
                                </div>
                              </div>
                              <span className="bg-olive/10 text-olive px-2.5 py-0.5 rounded text-[9px] font-bold self-start sm:self-auto mt-2 sm:mt-0 uppercase tracking-wide shrink-0">
                                {t.op2Badge}
                              </span>
                            </div>

                            {/* Opção 3: Seringueira X Cacau */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl border-2 border-olive bg-olive/10 shadow-elevation-2 relative overflow-hidden">
                              <div className="absolute top-0 right-0 w-8 h-8 bg-olive/10 rounded-bl-full flex items-center justify-center">
                                <span className="text-olive text-xs font-bold">★</span>
                              </div>
                              <div className="flex items-start gap-2.5">
                                <Sparkles className="w-4 h-4 text-olive shrink-0 mt-0.5" />
                                <div className="space-y-0.5 text-left">
                                  <span className="text-xs font-bold text-olive-dark">{t.op3SeringueiraCacau}</span>
                                  <p className="text-[10px] text-olive-dark/70 font-semibold">{t.op3Desc}</p>
                                </div>
                              </div>
                              <span className="bg-olive text-cream px-3 py-1 rounded text-[9px] font-bold self-start sm:self-auto mt-2 sm:mt-0 uppercase tracking-wider shrink-0 shadow-sm">
                                {t.op3Badge}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Justificativa / Racional */}
                      <div className="bg-gradient-to-r from-cream to-cream/30 border border-olive/15 border-l-4 border-l-olive rounded-2xl p-5 shadow-elevation-1">
                        <h4 className="text-xs font-bold text-olive uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <TrendingUp className="w-4 h-4 text-olive" />
                          {t.historicoFamiliar}
                        </h4>
                        <p className="text-xs text-olive-dark/95 leading-relaxed">
                          {t.descFamilia}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 3: ANÁLISE COMPARATIVA */}
              {currentSlide === 2 && (
                <div className="space-y-6">
                  <div className="flex flex-col text-left border-b border-olive/10 pb-4">
                    <div className="flex items-center gap-2">
                      <Scale className="w-5 h-5 text-olive" />
                      <h2 className="font-display text-2xl font-bold uppercase text-olive">{t.analiseComparativa}</h2>
                    </div>
                    <p className="text-xs text-olive-dark/70 font-semibold mt-1">{t.subAnaliseComparativa}</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left: Dimension selector */}
                    <div className="lg:col-span-4 flex flex-col gap-2">
                      {t.compMetrics.map((metric, idx) => {
                        const isSelected = idx === activeCompareMetric;
                        return (
                          <button
                            key={idx}
                            onClick={() => setActiveCompareMetric(idx)}
                            className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 ${
                              isSelected
                                ? "bg-olive border-olive text-cream shadow-elevation-2 scale-[1.02]"
                                : "bg-white/80 border-olive/10 text-olive-dark hover:bg-white hover:border-olive/20"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className={`p-1.5 rounded-lg shrink-0 ${isSelected ? 'bg-white/10 text-cream' : 'bg-olive/10 text-olive'}`}>
                                {idx === 0 && <Compass className="w-4 h-4" />}
                                {idx === 1 && <Leaf className="w-4 h-4" />}
                                {idx === 2 && <Coins className="w-4 h-4" />}
                                {idx === 3 && <Users className="w-4 h-4" />}
                              </span>
                              <span className="font-display text-sm font-bold block">{metric.title}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Right: Side by side cards */}
                    <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Cana Card */}
                      <div className="bg-[#faf9f5] border border-olive/10 rounded-2xl p-6 flex flex-col justify-between text-left shadow-elevation-1">
                        <div>
                          <div className="bg-red-500/10 text-red-700 px-2.5 py-1 rounded-full text-[10px] font-bold inline-block mb-4 uppercase tracking-wider">
                            {t.arrendamentoCana}
                          </div>
                          <div className="flex items-center gap-2.5 mb-3">
                            <span className="text-olive-dark/80">
                              {activeCompareMetric === 0 && <Compass className="w-5 h-5" />}
                              {activeCompareMetric === 1 && <Leaf className="w-5 h-5" />}
                              {activeCompareMetric === 2 && <Coins className="w-5 h-5" />}
                              {activeCompareMetric === 3 && <Users className="w-5 h-5" />}
                            </span>
                            <h3 className="font-display text-lg font-bold text-olive-dark">
                              {t.compMetrics[activeCompareMetric].title}
                            </h3>
                          </div>
                          <p className="text-sm text-olive-dark/70 leading-relaxed font-medium">
                            {t.compMetrics[activeCompareMetric].cana}
                          </p>
                        </div>
                        <div className="border-t border-olive/10 pt-4 mt-6 flex items-center gap-2 text-xs text-red-700 font-bold">
                          <TrendingDown className="w-4 h-4" />
                          <span>{t.baixoControle}</span>
                        </div>
                      </div>

                      {/* Consórcio Card */}
                      <div className="bg-white border-2 border-olive rounded-2xl p-6 flex flex-col justify-between text-left shadow-elevation-3 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-olive/5 rounded-bl-full" />
                        <div>
                          <div className="bg-olive/10 text-olive px-2.5 py-1 rounded-full text-[10px] font-bold inline-block mb-4 uppercase tracking-wider">
                            {t.consorcioSeringueiraCacau}
                          </div>
                          <div className="flex items-center gap-2.5 mb-3">
                            <span className="text-olive">
                              {activeCompareMetric === 0 && <Compass className="w-5 h-5" />}
                              {activeCompareMetric === 1 && <Leaf className="w-5 h-5" />}
                              {activeCompareMetric === 2 && <Coins className="w-5 h-5" />}
                              {activeCompareMetric === 3 && <Users className="w-5 h-5" />}
                            </span>
                            <h3 className="font-display text-lg font-bold text-olive">
                              {t.compMetrics[activeCompareMetric].title}
                            </h3>
                          </div>
                          <p className="text-sm text-olive-dark leading-relaxed font-bold">
                            {t.compMetrics[activeCompareMetric].consorcio}
                          </p>
                        </div>
                        <div className="border-t border-olive/10 pt-4 mt-6 flex items-center gap-2 text-xs text-olive font-bold">
                          <TrendingUp className="w-4 h-4" />
                          <span>{t.altaMargem}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 4: PROBLEMÁTICA */}
              {currentSlide === 3 && (
                <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto py-12 space-y-6">
                  <div className="p-4 bg-terracotta/10 text-terracotta rounded-full animate-pulse">
                    <ShieldAlert className="w-12 h-12" />
                  </div>
                  
                  <h2 className="font-display text-xl font-bold tracking-widest text-terracotta uppercase">
                    {t.problematica}
                  </h2>

                  <div className="bg-white border border-olive/15 rounded-3xl p-8 sm:p-12 shadow-elevation-3 w-full relative overflow-hidden">
                    {/* Glowing circular backdrop */}
                    <div className="absolute -top-12 -left-12 w-32 h-32 bg-terracotta/5 rounded-full blur-2xl" />
                    
                    <p className="text-sm text-olive-dark/60 font-semibold uppercase tracking-widest mb-4">{t.capitalNecessario}</p>
                    
                    <h1 className="font-display text-5xl sm:text-6xl font-black text-olive-dark tracking-tight leading-none mb-6">
                      R$ 17.000.000
                    </h1>

                    <div className="h-[2px] w-1/3 bg-terracotta/35 mx-auto mb-6" />

                    <p className="text-lg sm:text-xl font-display font-extrabold text-olive-dark/90 leading-normal">
                      {t.precisamosCapital}
                    </p>
                  </div>
                </div>
              )}

              {/* SLIDE 5: VISÃO GERAL DO PROJETO */}
              {currentSlide === 4 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 border-b border-olive/10 pb-4">
                    <Layers className="w-5 h-5 text-olive" />
                    <h2 className="font-display text-2xl font-bold uppercase text-olive">{t.fomentoMacuco}</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Card 1: Area total */}
                    <div className="bg-white border border-olive/10 rounded-2xl p-6 text-left shadow-elevation-1 flex flex-col justify-between h-44">
                      <div>
                        <div className="w-10 h-10 bg-cream rounded-xl flex items-center justify-center text-olive mb-4">
                          <Compass className="w-5 h-5" />
                        </div>
                        <p className="text-[10px] uppercase font-bold tracking-wider text-olive-dark/50">{t.areaTotal}</p>
                      </div>
                      <p className="font-display text-3xl font-extrabold text-olive-dark">250 ha</p>
                    </div>

                    {/* Card 2: Area Produtiva */}
                    <div className="bg-white border border-olive/10 rounded-2xl p-6 text-left shadow-elevation-1 flex flex-col justify-between h-44">
                      <div>
                        <div className="w-10 h-10 bg-cream rounded-xl flex items-center justify-center text-olive mb-4">
                          <Trees className="w-5 h-5" />
                        </div>
                        <p className="text-[10px] uppercase font-bold tracking-wider text-olive-dark/50">{t.areaProdutiva}</p>
                      </div>
                      <p className="font-display text-3xl font-extrabold text-olive">220 ha</p>
                    </div>

                    {/* Card 3: SAF Integrado */}
                    <div className="bg-white border border-olive/10 rounded-2xl p-6 text-left shadow-elevation-1 flex flex-col justify-between h-44">
                      <div>
                        <div className="w-10 h-10 bg-cream rounded-xl flex items-center justify-center text-olive mb-4">
                          <Activity className="w-5 h-5" />
                        </div>
                        <p className="text-[10px] uppercase font-bold tracking-wider text-olive-dark/50">{t.sistema}</p>
                      </div>
                      <p className="font-display text-lg font-bold text-olive-dark leading-tight">{t.sistemaDesc}</p>
                    </div>

                    {/* Card 4: Foco */}
                    <div className="bg-white border border-olive/10 rounded-2xl p-6 text-left shadow-elevation-1 flex flex-col justify-between h-44">
                      <div>
                        <div className="w-10 h-10 bg-cream rounded-xl flex items-center justify-center text-olive mb-4">
                          <Anchor className="w-5 h-5" />
                        </div>
                        <p className="text-[10px] uppercase font-bold tracking-wider text-olive-dark/50">{t.mercadoFoco}</p>
                      </div>
                      <p className="font-display text-lg font-bold text-olive-dark leading-tight">{t.mercadoDesc}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 6: ESTRUTURA DE IMPLANTAÇÃO E MODELO */}
              {currentSlide === 5 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 border-b border-olive/10 pb-4">
                    <Activity className="w-5 h-5 text-olive" />
                    <h2 className="font-display text-2xl font-bold uppercase text-olive">{t.estruturaModelo}</h2>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    {/* Left: Implantação */}
                    <div className="bg-[#faf9f5] border border-olive/10 rounded-2xl p-6 text-left shadow-elevation-1">
                      <h3 className="font-display text-lg font-bold text-olive-dark mb-4 border-b border-olive/5 pb-2">
                        {t.estruturaImplantacao}
                      </h3>
                      <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                          <span className="w-5 h-5 rounded-full bg-olive/20 text-olive flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</span>
                          <span className="text-sm font-bold text-olive-dark">{t.implantacaoEscalonada}</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="w-5 h-5 rounded-full bg-olive/20 text-olive flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</span>
                          <span className="text-sm font-bold text-olive-dark">{t.haAno}</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="w-5 h-5 rounded-full bg-olive/20 text-olive flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</span>
                          <span className="text-sm font-bold text-olive-dark">{t.entradaReceita}</span>
                        </li>
                      </ul>

                      {/* Visual 5-year timeline */}
                      <div className="mt-8 pt-4 border-t border-olive/5">
                        <div className="flex justify-between text-[10px] font-bold text-olive/80 mb-2">
                          <span>{t.ano1_40}</span>
                          <span>{t.ano2_80}</span>
                          <span>{t.ano3_120}</span>
                          <span>{t.ano4_160}</span>
                          <span>{t.ano5_200}</span>
                        </div>
                        <div className="h-2 w-full bg-olive/10 rounded-full flex overflow-hidden">
                          <div className="bg-olive" style={{ width: "20%" }} />
                          <div className="bg-olive-light" style={{ width: "20%" }} />
                          <div className="bg-terracotta" style={{ width: "20%" }} />
                          <div className="bg-mustard" style={{ width: "20%" }} />
                          <div className="bg-olive-dark" style={{ width: "20%" }} />
                        </div>
                        <p className="text-[10px] text-center text-olive-dark/50 mt-2">{t.distribuicaoTalhoes}</p>
                      </div>
                    </div>

                    {/* Right: Modelo Produtivo */}
                    <div className="bg-white border-2 border-olive rounded-2xl p-6 text-left shadow-elevation-2">
                      <h3 className="font-display text-lg font-bold text-olive mb-4 border-b border-olive/5 pb-2">
                        {t.modeloProdutivo}
                      </h3>
                      <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                          <span className="w-5 h-5 rounded-full bg-olive/20 text-olive flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</span>
                          <span className="text-sm font-bold text-olive-dark">{t.cacauDensidade}</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="w-5 h-5 rounded-full bg-olive/20 text-olive flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</span>
                          <span className="text-sm font-bold text-olive-dark">{t.seringaDensidade}</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="w-5 h-5 rounded-full bg-olive/20 text-olive flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</span>
                          <span className="text-sm font-bold text-olive-dark">{t.sistemaResiliente}</span>
                        </li>
                      </ul>

                      {/* Consórcio density showcase */}
                      <div className="mt-8 p-4 bg-cream/40 rounded-xl border border-olive/15">
                        <p className="text-[10px] uppercase tracking-wider font-bold text-olive/80 mb-3">{t.densidadeHectare}</p>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-white p-3 rounded-lg border border-olive/5">
                            <span className="text-xs font-semibold block text-olive-dark">{t.plantasCacau}</span>
                            <span className="font-display text-xl font-black text-olive">700 / ha</span>
                          </div>
                          <div className="bg-white p-3 rounded-lg border border-olive/5">
                            <span className="text-xs font-semibold block text-olive-dark">{t.arvoresSeringa}</span>
                            <span className="font-display text-xl font-black text-terracotta">300 / ha</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 7: ESTIMATIVAS DE PRODUTIVIDADE */}
              {currentSlide === 6 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 border-b border-olive/10 pb-4">
                    <TrendingUp className="w-5 h-5 text-olive" />
                    <h2 className="font-display text-2xl font-bold uppercase text-olive">{t.estimativasProdutividade}</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                    {/* Cacau Card */}
                    <div className="bg-white border border-olive/10 rounded-2xl p-6 shadow-elevation-1">
                      <div className="flex items-center justify-between mb-4 border-b border-olive/5 pb-2">
                        <h3 className="font-display text-lg font-bold text-olive-dark">{t.produtividadeCacau}</h3>
                        <span className="bg-olive/10 text-olive px-2 py-0.5 rounded text-[10px] font-bold">{t.consorcioCaps}</span>
                      </div>
                      <ul className="space-y-4 text-sm font-medium">
                        <li className="flex justify-between items-center border-b border-cream py-1.5">
                          <span className="text-olive-dark/70">{t.volumePlantas}</span>
                          <span className="font-bold text-olive-dark">{t.pesCacau}</span>
                        </li>
                        <li className="flex justify-between items-center border-b border-cream py-1.5">
                          <span className="text-olive-dark/70">{t.produtividadeAnual}</span>
                          <span className="font-bold text-olive">{t.cacauFaixa}</span>
                        </li>
                        <li className="flex justify-between items-center py-1.5 bg-cream/30 px-2.5 rounded-lg border border-olive/5">
                          <span className="text-olive-dark/70">{t.productionTotal}</span>
                          <span className="font-bold text-olive-dark">{t.toneladasAno}</span>
                        </li>
                      </ul>
                    </div>

                    {/* Seringueira Card */}
                    <div className="bg-white border border-olive/10 rounded-2xl p-6 shadow-elevation-1">
                      <div className="flex items-center justify-between mb-4 border-b border-olive/5 pb-2">
                        <h3 className="font-display text-lg font-bold text-olive-dark">{t.producaoLatex}</h3>
                        <span className="bg-terracotta/10 text-terracotta px-2 py-0.5 rounded text-[10px] font-bold">{t.supressaoReimplante}</span>
                      </div>
                      <ul className="space-y-4 text-sm font-medium">
                        <li className="flex justify-between items-center border-b border-cream py-1.5">
                          <span className="text-olive-dark/70">{t.volumeArvores}</span>
                          <span className="font-bold text-olive-dark">{t.arvoresQtd}</span>
                        </li>
                        <li className="flex justify-between items-center border-b border-cream py-1.5">
                          <span className="text-olive-dark/70">{t.produtividadeAnual}</span>
                          <span className="font-bold text-terracotta">{t.latexFaixa}</span>
                        </li>
                        <li className="flex justify-between items-center py-1.5 bg-cream/30 px-2.5 rounded-lg border border-olive/5">
                          <span className="text-olive-dark/70">{t.volumeLatexTotal}</span>
                          <span className="font-bold text-olive-dark">{t.latexQtd}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 8: INVESTIMENTOS (CAPEX) */}
              {currentSlide === 7 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 border-b border-olive/10 pb-4">
                    <Coins className="w-5 h-5 text-olive" />
                    <h2 className="font-display text-2xl font-bold uppercase text-olive">{t.investimentosCapex}</h2>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left details */}
                    <div className="lg:col-span-5 space-y-4 text-left">
                      <div className="bg-[#faf9f5] border border-olive/10 rounded-2xl p-6 shadow-elevation-1">
                        <h3 className="font-display text-sm font-bold uppercase tracking-wider text-olive-dark/60 mb-4">
                          {t.investimentoCapex12m}
                        </h3>
                        <ul className="space-y-3 font-medium text-sm">
                          <li className="flex justify-between py-1 border-b border-olive/5">
                            <span className="text-olive-dark/70">{t.implantacaoAgricola}</span>
                            <span className="font-bold text-olive-dark">{t.milhoes15}</span>
                          </li>
                          <li className="flex justify-between py-1 border-b border-olive/5">
                            <span className="text-olive-dark/70">{t.industriaPosColheita}</span>
                            <span className="font-bold text-olive-dark">{t.milhoes2}</span>
                          </li>
                          <li className="flex justify-between py-2.5 bg-olive/10 px-3 rounded-lg border border-olive/10 mt-3 font-bold text-base text-olive-dark">
                            <span>{t.totalCaps}</span>
                            <span>{t.milhoes17}</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Right Chart */}
                    <div className="lg:col-span-7 bg-white border border-olive/15 rounded-3xl p-6 shadow-elevation-2">
                      <h3 className="font-display font-bold text-sm text-olive-dark mb-4 text-left">{t.cronogramaCapex}</h3>
                      <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={capexData} margin={{ top: 20, right: 10, left: 10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--olive-light)" opacity={0.15} />
                            <XAxis dataKey="year" stroke="var(--olive-dark)" fontSize={11} tickLine={false} tickFormatter={(value) => getYearLabel(value, lang)} />
                            <YAxis
                              stroke="var(--olive-dark)"
                              fontSize={11}
                              tickFormatter={(value) => lang === "pt" ? `R$ ${(value / 1000000).toFixed(1)}M` : `${(value / 1000000).toFixed(1)}M 雷亚尔`}
                              tickLine={false}
                            />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--olive)", opacity: 0.05 }} />
                            <Bar dataKey="valor" name="CAPEX" fill="var(--olive)" radius={[8, 8, 0, 0]}>
                              {capexData.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={index === 1 ? "var(--terracotta)" : "var(--olive)"} // Highlight year 2 (5M)
                                />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 9: CUSTOS OPERACIONAIS (OPEX) */}
              {currentSlide === 8 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 border-b border-olive/10 pb-4">
                    <Activity className="w-5 h-5 text-olive" />
                    <h2 className="font-display text-2xl font-bold uppercase text-olive">{t.custosOPEX}</h2>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left details */}
                    <div className="lg:col-span-5 space-y-4 text-left">
                      <div className="bg-[#faf9f5] border border-olive/10 rounded-2xl p-6 shadow-elevation-1">
                        <h3 className="font-display text-sm font-bold uppercase tracking-wider text-olive-dark/60 mb-4">
                          {t.opexCaps}
                        </h3>
                        <ul className="space-y-3 font-medium text-sm">
                          <li className="flex justify-between py-1 border-b border-olive/5">
                            <span className="text-olive-dark/70">{t.manutencaoOperacao}</span>
                            <span className="font-bold text-olive-dark">{t.meses24}</span>
                          </li>
                          <li className="flex justify-between py-2.5 bg-terracotta/10 px-3 rounded-lg border border-terracotta/20 mt-3 font-bold text-base text-olive-dark">
                            <span>{t.totalOpexCaps}</span>
                            <span>{t.milhoes5}</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Right Chart */}
                    <div className="lg:col-span-7 bg-white border border-olive/15 rounded-3xl p-6 shadow-elevation-2">
                      <h3 className="font-display font-bold text-sm text-olive-dark mb-4 text-left">{t.cronogramaOpex}</h3>
                      <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={opexData} margin={{ top: 20, right: 10, left: 10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--olive-light)" opacity={0.15} />
                            <XAxis dataKey="period" stroke="var(--olive-dark)" fontSize={10} tickLine={false} tickFormatter={(value) => getPeriodLabel(value, lang)} />
                            <YAxis
                              stroke="var(--olive-dark)"
                              fontSize={11}
                              tickFormatter={(value) => lang === "pt" ? `R$ ${(value / 1000000).toFixed(0)}M` : `${(value / 1000000).toFixed(0)}M 雷亚尔`}
                              tickLine={false}
                            />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--olive)", opacity: 0.05 }} />
                            <Bar dataKey="valor" name="OPEX" fill="var(--terracotta)" radius={[8, 8, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 10: FLUXO CONSOLIDADO (CAPEX + OPEX) */}
              {currentSlide === 9 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 border-b border-olive/10 pb-4">
                    <Coins className="w-5 h-5 text-olive" />
                    <h2 className="font-display text-2xl font-bold uppercase text-olive">{t.fluxoConsolidado}</h2>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left details */}
                    <div className="lg:col-span-4 space-y-4 text-left">
                      <div className="bg-[#faf9f5] border border-olive/10 rounded-2xl p-6 shadow-elevation-1">
                        <h3 className="font-display text-sm font-bold uppercase tracking-wider text-olive-dark/60 mb-4">
                          {t.capexOpexConsolidado}
                        </h3>
                        <ul className="space-y-3 font-medium text-sm">
                          <li className="flex justify-between py-1 border-b border-olive/5">
                            <span className="text-olive-dark/70">{t.totalCapexCaps}</span>
                            <span className="font-bold text-olive">{lang === "pt" ? "17.000.000,00" : "17,000,000.00"}</span>
                          </li>
                          <li className="flex justify-between py-1 border-b border-olive/5">
                            <span className="text-olive-dark/70">{t.totalOpexCapsShort}</span>
                            <span className="font-bold text-terracotta">{lang === "pt" ? "5.000.000,00" : "5,000,000.00"}</span>
                          </li>
                          <li className="flex justify-between py-2.5 bg-olive-dark text-[#faf9f5] px-3 rounded-lg mt-3 font-bold text-sm sm:text-base whitespace-nowrap gap-2">
                            <span>{t.somaGlobal}</span>
                            <span>{lang === "pt" ? "R$ 22.000.000,00" : "22,000,000.00 雷亚尔"}</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Right Chart */}
                    <div className="lg:col-span-8 bg-white border border-olive/15 rounded-3xl p-6 shadow-elevation-2">
                      <h3 className="font-display font-bold text-sm text-olive-dark mb-4 text-left">{t.desembolsoConsolidado}</h3>
                      <div className="h-[260px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <ComposedChart data={consolidadoData} margin={{ top: 20, right: 10, left: 10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--olive-light)" opacity={0.15} />
                            <XAxis dataKey="year" stroke="var(--olive-dark)" fontSize={11} tickLine={false} tickFormatter={(value) => getYearLabel(value, lang)} />
                            <YAxis
                              stroke="var(--olive-dark)"
                              fontSize={11}
                              tickFormatter={(value) => lang === "pt" ? `R$ ${(value / 1000000).toFixed(1)}M` : `${(value / 1000000).toFixed(1)}M 雷亚尔`}
                              tickLine={false}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
                            <Bar dataKey="capex" name="CAPEX" stackId="a" fill="var(--olive)" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="opex" name="OPEX" stackId="a" fill="var(--terracotta)" radius={[4, 4, 0, 0]} />
                            <Line type="monotone" dataKey="total" name={lang === "pt" ? "Total Anual" : "年度总计"} stroke="var(--olive-dark)" strokeWidth={2.5} dot={{ r: 4 }} />
                          </ComposedChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 11: LOGÍSTICA E SUSTENTABILIDADE */}
              {currentSlide === 10 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 border-b border-olive/10 pb-4">
                    <Leaf className="w-5 h-5 text-olive" />
                    <h2 className="font-display text-2xl font-bold uppercase text-olive">{t.logisticaSustentabilidade}</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                    {/* Logística */}
                    <div className="bg-white border border-olive/10 rounded-2xl p-6 shadow-elevation-1">
                      <div className="flex items-center gap-2 mb-4 border-b border-olive/5 pb-2">
                        <Anchor className="w-5 h-5 text-olive" />
                        <h3 className="font-display text-lg font-bold text-olive-dark">{t.logisticaEstrategica}</h3>
                      </div>
                      <ul className="space-y-3 font-medium text-sm">
                        <li className="flex items-start gap-3">
                          <span className="text-olive mt-0.5 font-bold">▪</span>
                          <span>{t.portoSantos}</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-olive mt-0.5 font-bold">▪</span>
                          <span>{t.exportacaoAsia}</span>
                        </li>
                        <li className="flex items-start gap-3 bg-cream/40 p-2 rounded-lg border border-olive/5">
                          <span className="text-terracotta mt-0.5 font-bold">▪</span>
                          <span>{t.spAguas}</span>
                        </li>
                      </ul>
                    </div>

                    {/* Sustentabilidade */}
                    <div className="bg-white border border-olive/10 rounded-2xl p-6 shadow-elevation-1">
                      <div className="flex items-center gap-2 mb-4 border-b border-olive/5 pb-2">
                        <Leaf className="w-5 h-5 text-olive" />
                        <h3 className="font-display text-lg font-bold text-olive-dark">{t.esgSustentabilidade}</h3>
                      </div>
                      <ul className="space-y-3 font-medium text-sm">
                        <li className="flex items-start gap-3">
                          <span className="text-olive mt-0.5 font-bold">▪</span>
                          <span>{t.sistemaAgroflorestal}</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-olive mt-0.5 font-bold">▪</span>
                          <span>{t.capturaCarbono}</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-olive mt-0.5 font-bold">▪</span>
                          <span>{t.producaoRegenerativa}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 12: RESULTADOS ESPERADOS */}
              {currentSlide === 11 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 border-b border-olive/10 pb-4">
                    <CheckCircle2 className="w-5 h-5 text-olive" />
                    <h2 className="font-display text-2xl font-bold uppercase text-olive">{t.resultadosEsperados}</h2>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    {/* Fomento List */}
                    <div className="lg:col-span-8 bg-white border border-olive/15 rounded-3xl p-6 sm:p-8 text-left shadow-elevation-2 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-6">
                          <Sparkles className="w-5 h-5 text-terracotta" />
                          <h3 className="font-display text-xl font-bold text-olive-dark">{t.fomentoCaps}</h3>
                        </div>
                        
                        <ul className="space-y-4 font-bold text-sm sm:text-base">
                          <li className="flex items-center gap-3 bg-cream/30 p-3 rounded-xl border border-olive/5">
                            <div className="w-5 h-5 rounded-full bg-olive text-cream flex items-center justify-center text-xs">✓</div>
                            <span>{t.crescimentoRegiao}</span>
                          </li>
                          <li className="flex items-center gap-3 bg-cream/30 p-3 rounded-xl border border-olive/5">
                            <div className="w-5 h-5 rounded-full bg-olive text-cream flex items-center justify-center text-xs">✓</div>
                            <span>{t.acompanhamentoCati}</span>
                          </li>
                          <li className="flex items-center gap-3 bg-cream/30 p-3 rounded-xl border border-olive/5">
                            <div className="w-5 h-5 rounded-full bg-olive text-cream flex items-center justify-center text-xs">✓</div>
                            <span>{t.altaEscalabilidade}</span>
                          </li>
                          <li className="flex items-center gap-3 bg-cream/30 p-3 rounded-xl border border-olive/5">
                            <div className="w-5 h-5 rounded-full bg-olive text-cream flex items-center justify-center text-xs">✓</div>
                            <span>{t.secagemEfetivada}</span>
                          </li>
                          <li className="flex items-center gap-3 bg-cream/30 p-3 rounded-xl border border-olive/5">
                            <div className="w-5 h-5 rounded-full bg-olive text-cream flex items-center justify-center text-xs">✓</div>
                            <span>{t.futuroParceiro}</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Quick review card */}
                    <div className="lg:col-span-4 bg-olive text-cream rounded-3xl p-8 flex flex-col justify-between text-left shadow-elevation-3">
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-cream/70">{t.parceriaAgro}</span>
                        <h4 className="font-display text-2xl font-black mt-2 leading-tight">{t.brasilChina}</h4>
                        <p className="text-xs text-cream/80 mt-4 leading-relaxed font-medium">
                          {t.resultadosResumo}
                        </p>
                      </div>

                      <div className="border-t border-cream/20 pt-6 mt-8">
                        <p className="text-[10px] font-bold text-cream/60">{t.estabilidadeFinanceira}</p>
                        <p className="text-lg font-display font-extrabold text-cream">{t.seringaCacauPlus}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 13: CONCLUSÃO */}
              {currentSlide === 12 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-olive/10 pb-4">
                    <div className="w-10 h-10 rounded-xl bg-olive/10 text-olive flex items-center justify-center shadow-inner">
                      <Sparkles className="w-5 h-5 animate-pulse" />
                    </div>
                    <div className="text-left">
                      <h2 className="font-display text-2xl font-bold uppercase text-olive">{t.conclusaoCaps}</h2>
                      <p className="text-[10px] text-olive-dark/60 font-bold uppercase tracking-wider">{t.passosParceria}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch text-left">
                    {/* Left: Big call to action */}
                    <div className="lg:col-span-8 bg-gradient-to-br from-white via-white to-olive/[0.01] border border-olive/15 rounded-3xl p-8 flex flex-col justify-between shadow-elevation-1 relative overflow-hidden">
                      {/* Decorative backdrop glow */}
                      <div className="absolute -top-12 -right-12 w-48 h-48 bg-olive/5 rounded-full blur-3xl pointer-events-none" />
                      
                      <div className="space-y-4 relative z-10">
                        <span className="inline-flex items-center gap-1.5 bg-olive/10 text-olive px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                          <span className="w-2 h-2 rounded-full bg-olive animate-ping" />
                          {t.opFomento}
                        </span>
                        <div>
                          <h3 className="font-display text-4xl sm:text-5xl font-black bg-gradient-to-r from-olive via-olive-dark to-terracotta bg-clip-text text-transparent leading-tight">
                            {t.vamosFazerJuntos}
                          </h3>
                          <p className="font-display text-lg sm:text-xl font-bold text-olive/90 mt-2">
                            {t.memorandoDesc}
                          </p>
                          <p className="text-xs sm:text-sm font-semibold text-olive-dark/60 mt-1">
                            {t.cargoFernandoShort}
                          </p>
                        </div>
                        <p className="text-xs sm:text-sm text-olive-dark/80 leading-relaxed max-w-2xl font-medium">
                          {t.resumoConclusao}
                        </p>
                      </div>

                      {/* Contact items grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-olive/10 relative z-10">
                        {/* WhatsApp */}
                        <a
                          href="https://wa.me/5511998470708"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-4 bg-white/80 border border-emerald-500/25 hover:border-emerald-500 hover:bg-emerald-50/[0.03] p-5 rounded-2xl transition-all duration-300 group shadow-elevation-1 hover:shadow-elevation-2 hover:-translate-y-0.5"
                        >
                          <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-300">
                            <Phone className="w-5 h-5 fill-current" />
                          </div>
                          <div>
                            <span className="text-[9px] text-emerald-600 font-extrabold uppercase tracking-widest block mb-0.5">{t.faleConosco}</span>
                            <span className="text-base font-bold text-olive-dark group-hover:text-emerald-700 transition-colors">
                              {t.whatsappContato}
                            </span>
                          </div>
                        </a>

                        {/* Email */}
                        <a
                          href="mailto:fernando.miqueletti@sp.gov.br"
                          className="flex items-center gap-4 bg-white/80 border border-olive/15 hover:border-olive hover:bg-olive/[0.01] p-5 rounded-2xl transition-all duration-300 group shadow-elevation-1 hover:shadow-elevation-2 hover:-translate-y-0.5"
                        >
                          <div className="w-12 h-12 rounded-xl bg-olive text-cream flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-300">
                            <Mail className="w-5 h-5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <span className="text-[9px] text-olive/80 font-extrabold uppercase tracking-widest block mb-0.5">{t.enviarEmail}</span>
                            <span className="text-xs sm:text-base font-bold text-olive-dark group-hover:text-olive transition-colors block truncate" title="fernando.miqueletti@sp.gov.br">
                              fernando.miqueletti@sp.gov.br
                            </span>
                          </div>
                        </a>
                      </div>
                    </div>

                    {/* Right: Summary checklist */}
                    <div className="lg:col-span-4 bg-gradient-to-b from-olive to-olive-dark text-cream rounded-3xl p-8 flex flex-col justify-between shadow-elevation-3 relative overflow-hidden">
                      {/* Decorative elements */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.04] rounded-bl-full pointer-events-none" />
                      <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-cream/[0.03] rounded-full pointer-events-none" />
                      
                      <div className="relative z-10">
                        <span className="text-[9px] uppercase font-extrabold tracking-widest text-cream/70 block mb-1">{t.sinteseProjeto}</span>
                        <h4 className="font-display text-2xl font-black leading-tight border-b border-white/10 pb-3">{t.macucoFazenda}</h4>
                        
                        <ul className="space-y-3 mt-6 text-xs font-semibold">
                          <li className="flex items-center gap-3 bg-white/5 border border-white/10 p-3 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all duration-200">
                            <CheckCircle2 className="w-4 h-4 text-cream shrink-0" />
                            <span>{t.conclusaoItem1}</span>
                          </li>
                          <li className="flex items-center gap-3 bg-white/5 border border-white/10 p-3 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all duration-200">
                            <CheckCircle2 className="w-4 h-4 text-cream shrink-0" />
                            <span>{t.conclusaoItem2}</span>
                          </li>
                          <li className="flex items-center gap-3 bg-white/5 border border-white/10 p-3 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all duration-200">
                            <CheckCircle2 className="w-4 h-4 text-cream shrink-0" />
                            <span>{t.conclusaoItem3}</span>
                          </li>
                          <li className="flex items-center gap-3 bg-white/5 border border-white/10 p-3 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all duration-200">
                            <CheckCircle2 className="w-4 h-4 text-cream shrink-0" />
                            <span>{t.conclusaoItem4}</span>
                          </li>
                        </ul>
                      </div>

                      <div className="border-t border-cream/20 pt-5 mt-8 relative z-10">
                        <span className="text-[9px] font-bold text-cream/60 uppercase tracking-widest block mb-0.5">{t.poloCacauSPCaps}</span>
                        <span className="text-base font-display font-extrabold text-cream leading-tight">{t.saoJoseRioPreto}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide Deck Bottom Action Controls */}
        <footer className="px-6 py-4 flex items-center justify-between border-t border-olive/10 bg-white/70 backdrop-blur-md z-15">
          <button
            onClick={prevSlide}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-olive bg-olive/10 hover:bg-olive/20 rounded-xl transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            {t.anterior}
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalSlides }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  idx === currentSlide ? "bg-olive w-6" : "bg-olive/20 hover:bg-olive/45"
                }`}
                title={lang === "pt" ? `Ir para Slide ${idx + 1}` : `跳转至第 ${idx + 1} 页`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-cream bg-olive hover:bg-olive-dark rounded-xl shadow-elevation-1 transition-all"
          >
            {t.proximo}
            <ChevronRight className="w-4 h-4" />
          </button>
        </footer>
      </div>
    </div>
  );
}
