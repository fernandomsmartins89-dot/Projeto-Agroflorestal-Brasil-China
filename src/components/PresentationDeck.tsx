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

// Number formatter helper
const formatBRL = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
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

  const slideList = [
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
  ];

  // Custom Chart Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-olive/20 rounded-xl shadow-elevation-2 font-sans text-xs">
          <p className="font-bold text-olive-dark mb-1">{label}</p>
          {payload.map((item: any, index: number) => (
            <p key={index} className="font-medium" style={{ color: item.color || "#6a7b4f" }}>
              {item.name}: <span className="font-bold">{formatBRL(item.value)}</span>
            </p>
          ))}
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
                  <h2 className="font-display font-bold text-sm tracking-tight text-olive-dark">Pólo Cacau SP</h2>
                  <p className="text-[10px] text-olive/75 uppercase tracking-wider font-semibold">Cacau + Seringueira</p>
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
                Projeto Agroflorestal Brasil-China
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
              title="Alternar Menu"
            >
              <List className="w-5 h-5" />
            </button>
            <div className="h-4 w-[1px] bg-olive/20" />
            <div className="text-xs font-medium text-olive-dark/75">
              Slide <span className="font-display font-bold text-olive-dark text-sm">{currentSlide + 1}</span> de <span className="font-display font-bold text-olive-dark text-sm">{totalSlides}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
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
              <span>{isPlaying ? "Executando" : "Auto-Play"}</span>
            </button>

            <button
              onClick={toggleFullscreen}
              className="p-2 hover:bg-olive/10 rounded-xl text-olive transition-colors"
              title={isFullscreen ? "Sair da Tela Cheia" : "Tela Cheia"}
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
                        PÓLO CACAU SP
                      </span>
                      <span className="bg-terracotta/10 text-terracotta px-3 py-1 rounded-full text-xs font-semibold">
                        São José do Rio Preto
                      </span>
                    </div>

                    <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-extrabold text-olive-dark tracking-tight leading-none">
                      Projeto Agroflorestal <br />
                      <span className="text-olive">Brasil-China</span>
                    </h1>

                    <p className="font-display text-xl sm:text-2xl font-bold text-olive/90 max-w-2xl leading-relaxed">
                      Sistema Agroflorestal - Cacau + Seringueira
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 mt-4 text-sm font-medium text-olive-dark/75">
                      <div className="flex items-center gap-2 bg-white/60 border border-olive/10 px-4 py-2.5 rounded-xl shadow-elevation-1">
                        <Sparkles className="w-4 h-4 text-terracotta" />
                        <span>Oportunidade de Fomento</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/60 border border-olive/10 px-4 py-2.5 rounded-xl shadow-elevation-1">
                        <Trees className="w-4 h-4 text-olive" />
                        <span>Modelo Agro - Cultivo + Pós colheita</span>
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
                          <span className="font-display text-[8px] font-bold text-olive-dark leading-tight">Sustentabilidade<br/>Integrada</span>
                        </div>
                      </div>
                      
                      {/* Floating Accent badges - smaller, absolute to the main non-rotating container so they don't rotate */}
                      <div className="absolute -top-1 -right-1 bg-terracotta text-white font-bold px-2 py-0.5 rounded-xl shadow-elevation-1 text-[8px] z-10">
                        CACAU
                      </div>
                      <div className="absolute -bottom-1 -left-1 bg-olive text-cream font-bold px-2 py-0.5 rounded-xl shadow-elevation-1 text-[8px] z-10">
                        SERINGA
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
                            Fernando Moscardo
                          </h3>
                          <p className="text-[11px] font-semibold text-olive/80">
                            Engenheiro Agrônomo &bull; Especialista em Agricultura Orgânica e Regenerativa
                          </p>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-olive/10">
                        <span className="text-[9px] uppercase tracking-wider font-extrabold text-olive/75 block mb-2">
                          Culturas Atuantes
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {[
                            "Resina de Pinus Ellioti",
                            "Cenoura",
                            "Café",
                            "Gado de Corte",
                            "Cacau",
                            "Seringueira"
                          ].map((cultura) => (
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
                        <h2 className="font-display text-2xl font-bold tracking-tight uppercase text-olive">Introdução</h2>
                        <p className="text-[10px] text-olive-dark/60 font-bold uppercase tracking-wider">Perfil da Fazenda Macuco • Nova Granada - SP</p>
                      </div>
                    </div>
                    
                    {/* Header quick metrics */}
                    <div className="flex flex-wrap gap-2 text-left">
                      <div className="bg-white/90 border border-olive/10 px-4 py-2 rounded-xl shadow-elevation-1 flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-olive/10 text-olive flex items-center justify-center">
                          <Compass className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-[8px] uppercase tracking-widest font-extrabold text-olive/60 block leading-tight">Área Total</span>
                          <span className="font-display font-black text-sm text-olive-dark">250 ha</span>
                        </div>
                      </div>
                      <div className="bg-white/90 border border-olive/10 px-4 py-2 rounded-xl shadow-elevation-1 flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-olive/10 text-olive flex items-center justify-center">
                          <Trees className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-[8px] uppercase tracking-widest font-extrabold text-olive/60 block leading-tight">Área Produtiva</span>
                          <span className="font-display font-black text-sm text-olive">220 ha</span>
                        </div>
                      </div>
                      <div className="bg-white/90 border border-olive/10 px-4 py-2 rounded-xl shadow-elevation-1 flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-terracotta/10 text-terracotta flex items-center justify-center">
                          <Activity className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-[8px] uppercase tracking-widest font-extrabold text-olive/60 block leading-tight">Histórico</span>
                          <span className="font-display font-black text-sm text-terracotta">40+ Anos Látex</span>
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
                          <h3 className="text-xs font-bold text-olive uppercase tracking-wider">Histórico & Transição</h3>
                        </div>
                        <p className="text-xs sm:text-sm text-olive-dark/90 leading-relaxed font-medium">
                          A Fazenda Macuco está localizada em Nova Granada SP com 250 ha de área total e 220 ha produtivo. Sempre foi uma fazenda produtora de látex, para a indústria Braslatex da família, e hoje se encontra em fase de supressão das seringueiras após mais de 40 anos de extração. Esta é uma das fazendas da Família Verdi e do braço agrícola do Grupo Rodobens que possuem mais de 5.000 ha de seringueira na região.
                        </p>
                      </div>

                      {/* Projeto Piloto */}
                      <div className="bg-white border border-olive/15 rounded-2xl p-5 shadow-elevation-1 flex-1">
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="text-xs font-bold text-olive uppercase tracking-wider flex items-center gap-1.5">
                            <Layers className="w-4 h-4 text-olive" />
                            Projeto Piloto Em Andamento
                          </h3>
                          <span className="bg-olive/10 text-olive px-2.5 py-0.5 rounded-full text-[10px] font-bold">18 ha Executados</span>
                        </div>
                        <p className="text-[11px] text-olive-dark/70 leading-relaxed mb-4">
                          Já estamos com um projeto piloto de 18 hectares em andamento com seringa X e cacau (10 hectares) e mogno africano X cacau (8 hectares).
                        </p>
                        
                        <div className="space-y-4">
                          {/* Seringueira X Cacau Progress */}
                          <div className="space-y-1.5">
                            <div className="flex justify-between text-xs font-bold text-olive-dark">
                              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-olive" />Seringa X Cacau</span>
                              <span className="text-olive">10 ha (56%)</span>
                            </div>
                            <div className="h-2.5 w-full bg-olive/10 rounded-full overflow-hidden p-[2px]">
                              <div className="h-full bg-olive rounded-full" style={{ width: "56%" }} />
                            </div>
                          </div>

                          {/* Mogno Africano X Cacau Progress */}
                          <div className="space-y-1.5">
                            <div className="flex justify-between text-xs font-bold text-olive-dark">
                              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-terracotta" />Mogno Africano X Cacau</span>
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
                            Planos de implantação nos 200 ha restantes estudados:
                          </h3>

                          <div className="space-y-3">
                            {/* Opção 1: Cana */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl border border-red-500/15 bg-red-500/[0.02] opacity-75">
                              <div className="flex items-start gap-2.5">
                                <ShieldAlert className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                                <div className="space-y-0.5 text-left">
                                  <span className="text-xs font-bold text-olive-dark/85">1 – Cana de Açúcar por arrendo</span>
                                  <p className="text-[10px] text-olive-dark/50">Arrendamento convencional de terra</p>
                                </div>
                              </div>
                              <span className="bg-red-500/10 text-red-700 px-2.5 py-0.5 rounded text-[9px] font-bold self-start sm:self-auto mt-2 sm:mt-0 uppercase tracking-wide shrink-0">
                                Proprietário não animado
                              </span>
                            </div>

                            {/* Opção 2: Seringueira */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl border border-olive/15 bg-olive/[0.02] opacity-70">
                              <div className="flex items-start gap-2.5">
                                <Trees className="w-4 h-4 text-olive/60 shrink-0 mt-0.5" />
                                <div className="space-y-0.5 text-left">
                                  <span className="text-xs font-bold text-olive-dark/85">2 – Seringueira</span>
                                  <p className="text-[10px] text-olive-dark/50">Monocultura tradicional de látex</p>
                                </div>
                              </div>
                              <span className="bg-olive/10 text-olive px-2.5 py-0.5 rounded text-[9px] font-bold self-start sm:self-auto mt-2 sm:mt-0 uppercase tracking-wide shrink-0">
                                Tradicional
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
                                  <span className="text-xs font-bold text-olive-dark">3 – Seringueira X Cacau</span>
                                  <p className="text-[10px] text-olive-dark/70 font-semibold">Modelo consorciado com cacau</p>
                                </div>
                              </div>
                              <span className="bg-olive text-cream px-3 py-1 rounded text-[9px] font-bold self-start sm:self-auto mt-2 sm:mt-0 uppercase tracking-wider shrink-0 shadow-sm">
                                Escolha Estratégica
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Justificativa / Racional */}
                      <div className="bg-gradient-to-r from-cream to-cream/30 border border-olive/15 border-l-4 border-l-olive rounded-2xl p-5 shadow-elevation-1">
                        <h4 className="text-xs font-bold text-olive uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <TrendingUp className="w-4 h-4 text-olive" />
                          HISTORICO RURAL E FAMILIAR
                        </h4>
                        <p className="text-xs text-olive-dark/95 leading-relaxed">
                          Embora o sobrenome Verdi seja amplamente conhecido nacionalmente pelo império fundado pelo Patriarca Waldemar Verdi (o Grupo Rodobens, fundado em 1949), a atuação do clã expandiu-se com enorme força para a produção agroindustrial. A transição das terras da família Verdi para a heveicultura reflete a própria história econômica da região de São José do Rio Preto. Após ciclos como o do algodão (no qual o patriarca chegou a ser conhecido como o "Rei do Algodão" entre as décadas de 1930 e 1940) e da pecuária. Temos todo potencial para fazer história nesta nova transição agropecuária para o Cacau consorciado com a seringueira.
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
                      <h2 className="font-display text-2xl font-bold uppercase text-olive">Análise Comparativa de Modelos de Uso da Terra</h2>
                    </div>
                    <p className="text-xs text-olive-dark/70 font-semibold mt-1">Arrendamento para Cana vs. Consórcio Seringueira + Cacau</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left: Dimension selector */}
                    <div className="lg:col-span-4 flex flex-col gap-2">
                      {comparativeMetrics.map((metric, idx) => {
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
                            Arrendamento para Cana
                          </div>
                          <div className="flex items-center gap-2.5 mb-3">
                            <span className="text-olive-dark/80">
                              {activeCompareMetric === 0 && <Compass className="w-5 h-5" />}
                              {activeCompareMetric === 1 && <Leaf className="w-5 h-5" />}
                              {activeCompareMetric === 2 && <Coins className="w-5 h-5" />}
                              {activeCompareMetric === 3 && <Users className="w-5 h-5" />}
                            </span>
                            <h3 className="font-display text-lg font-bold text-olive-dark">
                              {comparativeMetrics[activeCompareMetric].title}
                            </h3>
                          </div>
                          <p className="text-sm text-olive-dark/70 leading-relaxed font-medium">
                            {comparativeMetrics[activeCompareMetric].cana}
                          </p>
                        </div>
                        <div className="border-t border-olive/10 pt-4 mt-6 flex items-center gap-2 text-xs text-red-700 font-bold">
                          <TrendingDown className="w-4 h-4" />
                          <span>Baixo Controle / Desgaste Ambiental</span>
                        </div>
                      </div>

                      {/* Consórcio Card */}
                      <div className="bg-white border-2 border-olive rounded-2xl p-6 flex flex-col justify-between text-left shadow-elevation-3 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-olive/5 rounded-bl-full" />
                        <div>
                          <div className="bg-olive/10 text-olive px-2.5 py-1 rounded-full text-[10px] font-bold inline-block mb-4 uppercase tracking-wider">
                            Consórcio Seringueira + Cacau
                          </div>
                          <div className="flex items-center gap-2.5 mb-3">
                            <span className="text-olive">
                              {activeCompareMetric === 0 && <Compass className="w-5 h-5" />}
                              {activeCompareMetric === 1 && <Leaf className="w-5 h-5" />}
                              {activeCompareMetric === 2 && <Coins className="w-5 h-5" />}
                              {activeCompareMetric === 3 && <Users className="w-5 h-5" />}
                            </span>
                            <h3 className="font-display text-lg font-bold text-olive">
                              {comparativeMetrics[activeCompareMetric].title}
                            </h3>
                          </div>
                          <p className="text-sm text-olive-dark leading-relaxed font-bold">
                            {comparativeMetrics[activeCompareMetric].consorcio}
                          </p>
                        </div>
                        <div className="border-t border-olive/10 pt-4 mt-6 flex items-center gap-2 text-xs text-olive font-bold">
                          <TrendingUp className="w-4 h-4" />
                          <span>Alta Margem / Sustentável</span>
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
                    Problemática Encontrada
                  </h2>

                  <div className="bg-white border border-olive/15 rounded-3xl p-8 sm:p-12 shadow-elevation-3 w-full relative overflow-hidden">
                    {/* Glowing circular backdrop */}
                    <div className="absolute -top-12 -left-12 w-32 h-32 bg-terracotta/5 rounded-full blur-2xl" />
                    
                    <p className="text-sm text-olive-dark/60 font-semibold uppercase tracking-widest mb-4">Capital Necessário</p>
                    
                    <h1 className="font-display text-5xl sm:text-6xl font-black text-olive-dark tracking-tight leading-none mb-6">
                      R$ 17.000.000
                    </h1>

                    <div className="h-[2px] w-1/3 bg-terracotta/35 mx-auto mb-6" />

                    <p className="text-lg sm:text-xl font-display font-extrabold text-olive-dark/90 leading-normal">
                      Precisamos de 17 milhões para o projeto
                    </p>
                  </div>
                </div>
              )}

              {/* SLIDE 5: VISÃO GERAL DO PROJETO */}
              {currentSlide === 4 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 border-b border-olive/10 pb-4">
                    <Layers className="w-5 h-5 text-olive" />
                    <h2 className="font-display text-2xl font-bold uppercase text-olive">FOMENTO FAZENDA MACUCO</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Card 1: Area total */}
                    <div className="bg-white border border-olive/10 rounded-2xl p-6 text-left shadow-elevation-1 flex flex-col justify-between h-44">
                      <div>
                        <div className="w-10 h-10 bg-cream rounded-xl flex items-center justify-center text-olive mb-4">
                          <Compass className="w-5 h-5" />
                        </div>
                        <p className="text-[10px] uppercase font-bold tracking-wider text-olive-dark/50">Área Total</p>
                      </div>
                      <p className="font-display text-3xl font-extrabold text-olive-dark">250 ha</p>
                    </div>

                    {/* Card 2: Area Produtiva */}
                    <div className="bg-white border border-olive/10 rounded-2xl p-6 text-left shadow-elevation-1 flex flex-col justify-between h-44">
                      <div>
                        <div className="w-10 h-10 bg-cream rounded-xl flex items-center justify-center text-olive mb-4">
                          <Trees className="w-5 h-5" />
                        </div>
                        <p className="text-[10px] uppercase font-bold tracking-wider text-olive-dark/50">Área Produtiva</p>
                      </div>
                      <p className="font-display text-3xl font-extrabold text-olive">220 ha</p>
                    </div>

                    {/* Card 3: SAF Integrado */}
                    <div className="bg-white border border-olive/10 rounded-2xl p-6 text-left shadow-elevation-1 flex flex-col justify-between h-44">
                      <div>
                        <div className="w-10 h-10 bg-cream rounded-xl flex items-center justify-center text-olive mb-4">
                          <Activity className="w-5 h-5" />
                        </div>
                        <p className="text-[10px] uppercase font-bold tracking-wider text-olive-dark/50">Sistema</p>
                      </div>
                      <p className="font-display text-lg font-bold text-olive-dark leading-tight">Sistema agroflorestal integrado</p>
                    </div>

                    {/* Card 4: Foco */}
                    <div className="bg-white border border-olive/10 rounded-2xl p-6 text-left shadow-elevation-1 flex flex-col justify-between h-44">
                      <div>
                        <div className="w-10 h-10 bg-cream rounded-xl flex items-center justify-center text-olive mb-4">
                          <Anchor className="w-5 h-5" />
                        </div>
                        <p className="text-[10px] uppercase font-bold tracking-wider text-olive-dark/50">Mercado Foco</p>
                      </div>
                      <p className="font-display text-lg font-bold text-olive-dark leading-tight">Foco: exportação e indústria nacional</p>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 6: ESTRUTURA DE IMPLANTAÇÃO E MODELO */}
              {currentSlide === 5 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 border-b border-olive/10 pb-4">
                    <Activity className="w-5 h-5 text-olive" />
                    <h2 className="font-display text-2xl font-bold uppercase text-olive">Estrutura de Implantação e Modelo</h2>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    {/* Left: Implantação */}
                    <div className="bg-[#faf9f5] border border-olive/10 rounded-2xl p-6 text-left shadow-elevation-1">
                      <h3 className="font-display text-lg font-bold text-olive-dark mb-4 border-b border-olive/5 pb-2">
                        Estrutura de Implantação
                      </h3>
                      <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                          <span className="w-5 h-5 rounded-full bg-olive/20 text-olive flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</span>
                          <span className="text-sm font-bold text-olive-dark">Implantação escalonada em 5 anos</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="w-5 h-5 rounded-full bg-olive/20 text-olive flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</span>
                          <span className="text-sm font-bold text-olive-dark">40 ha/ano</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="w-5 h-5 rounded-full bg-olive/20 text-olive flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</span>
                          <span className="text-sm font-bold text-olive-dark">Entrada de receita a partir do ano 3</span>
                        </li>
                      </ul>

                      {/* Visual 5-year timeline */}
                      <div className="mt-8 pt-4 border-t border-olive/5">
                        <div className="flex justify-between text-[10px] font-bold text-olive/80 mb-2">
                          <span>Ano 1 (40ha)</span>
                          <span>Ano 2 (80ha)</span>
                          <span>Ano 3 (120ha)</span>
                          <span>Ano 4 (160ha)</span>
                          <span>Ano 5 (200ha)</span>
                        </div>
                        <div className="h-2 w-full bg-olive/10 rounded-full flex overflow-hidden">
                          <div className="bg-olive" style={{ width: "20%" }} />
                          <div className="bg-olive-light" style={{ width: "20%" }} />
                          <div className="bg-terracotta" style={{ width: "20%" }} />
                          <div className="bg-mustard" style={{ width: "20%" }} />
                          <div className="bg-olive-dark" style={{ width: "20%" }} />
                        </div>
                        <p className="text-[10px] text-center text-olive-dark/50 mt-2">Distribuição de implantação de talhões</p>
                      </div>
                    </div>

                    {/* Right: Modelo Produtivo */}
                    <div className="bg-white border-2 border-olive rounded-2xl p-6 text-left shadow-elevation-2">
                      <h3 className="font-display text-lg font-bold text-olive mb-4 border-b border-olive/5 pb-2">
                        Modelo Produtivo
                      </h3>
                      <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                          <span className="w-5 h-5 rounded-full bg-olive/20 text-olive flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</span>
                          <span className="text-sm font-bold text-olive-dark">Cacau: 700 plantas/ha</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="w-5 h-5 rounded-full bg-olive/20 text-olive flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</span>
                          <span className="text-sm font-bold text-olive-dark">Seringueira: 300 plantas/ha</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="w-5 h-5 rounded-full bg-olive/20 text-olive flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</span>
                          <span className="text-sm font-bold text-olive-dark">Sistema consorciado resiliente</span>
                        </li>
                      </ul>

                      {/* Consórcio density showcase */}
                      <div className="mt-8 p-4 bg-cream/40 rounded-xl border border-olive/15">
                        <p className="text-[10px] uppercase tracking-wider font-bold text-olive/80 mb-3">Densidade do Consórcio por Hectare</p>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-white p-3 rounded-lg border border-olive/5">
                            <span className="text-xs font-semibold block text-olive-dark">Plantas de Cacau</span>
                            <span className="font-display text-xl font-black text-olive">700 / ha</span>
                          </div>
                          <div className="bg-white p-3 rounded-lg border border-olive/5">
                            <span className="text-xs font-semibold block text-olive-dark">Árvores Seringa</span>
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
                    <h2 className="font-display text-2xl font-bold uppercase text-olive">Estimativas de Produtividade</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                    {/* Cacau Card */}
                    <div className="bg-white border border-olive/10 rounded-2xl p-6 shadow-elevation-1">
                      <div className="flex items-center justify-between mb-4 border-b border-olive/5 pb-2">
                        <h3 className="font-display text-lg font-bold text-olive-dark">Produtividade do Cacau</h3>
                        <span className="bg-olive/10 text-olive px-2 py-0.5 rounded text-[10px] font-bold">Consórcio</span>
                      </div>
                      <ul className="space-y-4 text-sm font-medium">
                        <li className="flex justify-between items-center border-b border-cream py-1.5">
                          <span className="text-olive-dark/70">Volume Plantas:</span>
                          <span className="font-bold text-olive-dark">140.000 pés cacau</span>
                        </li>
                        <li className="flex justify-between items-center border-b border-cream py-1.5">
                          <span className="text-olive-dark/70">Produtividade Anual:</span>
                          <span className="font-bold text-olive">1.200 a 2.000 kg/ha/ano</span>
                        </li>
                        <li className="flex justify-between items-center py-1.5 bg-cream/30 px-2.5 rounded-lg border border-olive/5">
                          <span className="text-olive-dark/70">Production total:</span>
                          <span className="font-bold text-olive-dark">240 a 400 toneladas/ano</span>
                        </li>
                      </ul>
                    </div>

                    {/* Seringueira Card */}
                    <div className="bg-white border border-olive/10 rounded-2xl p-6 shadow-elevation-1">
                      <div className="flex items-center justify-between mb-4 border-b border-olive/5 pb-2">
                        <h3 className="font-display text-lg font-bold text-olive-dark">Produção de Látex</h3>
                        <span className="bg-terracotta/10 text-terracotta px-2 py-0.5 rounded text-[10px] font-bold">Supressão & Reimplante</span>
                      </div>
                      <ul className="space-y-4 text-sm font-medium">
                        <li className="flex justify-between items-center border-b border-cream py-1.5">
                          <span className="text-olive-dark/70">Volume de Árvores:</span>
                          <span className="font-bold text-olive-dark">60.000 árvores</span>
                        </li>
                        <li className="flex justify-between items-center border-b border-cream py-1.5">
                          <span className="text-olive-dark/70">Produtividade Anual:</span>
                          <span className="font-bold text-terracotta">3.000 kg/ha/ano</span>
                        </li>
                        <li className="flex justify-between items-center py-1.5 bg-cream/30 px-2.5 rounded-lg border border-olive/5">
                          <span className="text-olive-dark/70">Volume Látex Total:</span>
                          <span className="font-bold text-olive-dark">600.000 kg/ano de látex</span>
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
                    <h2 className="font-display text-2xl font-bold uppercase text-olive">Investimentos (CAPEX)</h2>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left details */}
                    <div className="lg:col-span-5 space-y-4 text-left">
                      <div className="bg-[#faf9f5] border border-olive/10 rounded-2xl p-6 shadow-elevation-1">
                        <h3 className="font-display text-sm font-bold uppercase tracking-wider text-olive-dark/60 mb-4">
                          Investimento (CAPEX 12 meses)
                        </h3>
                        <ul className="space-y-3 font-medium text-sm">
                          <li className="flex justify-between py-1 border-b border-olive/5">
                            <span className="text-olive-dark/70">Implantação agrícola:</span>
                            <span className="font-bold text-olive-dark">R$ 15 milhões</span>
                          </li>
                          <li className="flex justify-between py-1 border-b border-olive/5">
                            <span className="text-olive-dark/70">Indústria pós-colheita:</span>
                            <span className="font-bold text-olive-dark">R$ 2 milhões</span>
                          </li>
                          <li className="flex justify-between py-2.5 bg-olive/10 px-3 rounded-lg border border-olive/10 mt-3 font-bold text-base text-olive-dark">
                            <span>Total:</span>
                            <span>R$ 17 milhões</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Right Chart */}
                    <div className="lg:col-span-7 bg-white border border-olive/15 rounded-3xl p-6 shadow-elevation-2">
                      <h3 className="font-display font-bold text-sm text-olive-dark mb-4 text-left">Cronograma CAPEX por Ano</h3>
                      <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={capexData} margin={{ top: 20, right: 10, left: 10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--olive-light)" opacity={0.15} />
                            <XAxis dataKey="year" stroke="var(--olive-dark)" fontSize={11} tickLine={false} />
                            <YAxis
                              stroke="var(--olive-dark)"
                              fontSize={11}
                              tickFormatter={(value) => `R$ ${(value / 1000000).toFixed(1)}M`}
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
                    <h2 className="font-display text-2xl font-bold uppercase text-olive">Custos Operacionais (OPEX)</h2>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left details */}
                    <div className="lg:col-span-5 space-y-4 text-left">
                      <div className="bg-[#faf9f5] border border-olive/10 rounded-2xl p-6 shadow-elevation-1">
                        <h3 className="font-display text-sm font-bold uppercase tracking-wider text-olive-dark/60 mb-4">
                          OPEX
                        </h3>
                        <ul className="space-y-3 font-medium text-sm">
                          <li className="flex justify-between py-1 border-b border-olive/5">
                            <span className="text-olive-dark/70">Manutenção e operação:</span>
                            <span className="font-bold text-olive-dark">24 meses</span>
                          </li>
                          <li className="flex justify-between py-2.5 bg-terracotta/10 px-3 rounded-lg border border-terracotta/20 mt-3 font-bold text-base text-olive-dark">
                            <span>Total OPEX:</span>
                            <span>R$ 5 milhões</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Right Chart */}
                    <div className="lg:col-span-7 bg-white border border-olive/15 rounded-3xl p-6 shadow-elevation-2">
                      <h3 className="font-display font-bold text-sm text-olive-dark mb-4 text-left">Cronograma OPEX por Talhão</h3>
                      <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={opexData} margin={{ top: 20, right: 10, left: 10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--olive-light)" opacity={0.15} />
                            <XAxis dataKey="period" stroke="var(--olive-dark)" fontSize={10} tickLine={false} />
                            <YAxis
                              stroke="var(--olive-dark)"
                              fontSize={11}
                              tickFormatter={(value) => `R$ ${(value / 1000000).toFixed(0)}M`}
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
                    <h2 className="font-display text-2xl font-bold uppercase text-olive">Fluxo Consolidado (CAPEX + OPEX)</h2>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left details */}
                    <div className="lg:col-span-4 space-y-4 text-left">
                      <div className="bg-[#faf9f5] border border-olive/10 rounded-2xl p-6 shadow-elevation-1">
                        <h3 className="font-display text-sm font-bold uppercase tracking-wider text-olive-dark/60 mb-4">
                          CAPEX + OPEX Consolidado
                        </h3>
                        <ul className="space-y-3 font-medium text-sm">
                          <li className="flex justify-between py-1 border-b border-olive/5">
                            <span className="text-olive-dark/70">Total CAPEX:</span>
                            <span className="font-bold text-olive">17.000.000,00</span>
                          </li>
                          <li className="flex justify-between py-1 border-b border-olive/5">
                            <span className="text-olive-dark/70">Total OPEX:</span>
                            <span className="font-bold text-terracotta">5.000.000,00</span>
                          </li>
                          <li className="flex justify-between py-2.5 bg-olive-dark text-[#faf9f5] px-3 rounded-lg mt-3 font-bold text-base">
                            <span>Soma Global:</span>
                            <span>R$ 22.000.000,00</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Right Chart */}
                    <div className="lg:col-span-8 bg-white border border-olive/15 rounded-3xl p-6 shadow-elevation-2">
                      <h3 className="font-display font-bold text-sm text-olive-dark mb-4 text-left">Desembolso Consolidado por Ano</h3>
                      <div className="h-[260px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <ComposedChart data={consolidadoData} margin={{ top: 20, right: 10, left: 10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--olive-light)" opacity={0.15} />
                            <XAxis dataKey="year" stroke="var(--olive-dark)" fontSize={11} tickLine={false} />
                            <YAxis
                              stroke="var(--olive-dark)"
                              fontSize={11}
                              tickFormatter={(value) => `R$ ${(value / 1000000).toFixed(1)}M`}
                              tickLine={false}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
                            <Bar dataKey="capex" name="CAPEX" stackId="a" fill="var(--olive)" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="opex" name="OPEX" stackId="a" fill="var(--terracotta)" radius={[4, 4, 0, 0]} />
                            <Line type="monotone" dataKey="total" name="Total Anual" stroke="var(--olive-dark)" strokeWidth={2.5} dot={{ r: 4 }} />
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
                    <h2 className="font-display text-2xl font-bold uppercase text-olive">Logística e Sustentabilidade</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                    {/* Logística */}
                    <div className="bg-white border border-olive/10 rounded-2xl p-6 shadow-elevation-1">
                      <div className="flex items-center gap-2 mb-4 border-b border-olive/5 pb-2">
                        <Anchor className="w-5 h-5 text-olive" />
                        <h3 className="font-display text-lg font-bold text-olive-dark">Logística Estratégica Brasil-China</h3>
                      </div>
                      <ul className="space-y-3 font-medium text-sm">
                        <li className="flex items-start gap-3">
                          <span className="text-olive mt-0.5 font-bold">▪</span>
                          <span>Proximidade ao Porto de Santos (7h.)</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-olive mt-0.5 font-bold">▪</span>
                          <span>Exportação facilitada para Ásia</span>
                        </li>
                        <li className="flex items-start gap-3 bg-cream/40 p-2 rounded-lg border border-olive/5">
                          <span className="text-terracotta mt-0.5 font-bold">▪</span>
                          <span>Energia e água disponíveis e outorgadas pelo SP Aguas</span>
                        </li>
                      </ul>
                    </div>

                    {/* Sustentabilidade */}
                    <div className="bg-white border border-olive/10 rounded-2xl p-6 shadow-elevation-1">
                      <div className="flex items-center gap-2 mb-4 border-b border-olive/5 pb-2">
                        <Leaf className="w-5 h-5 text-olive" />
                        <h3 className="font-display text-lg font-bold text-olive-dark">ESG e Sustentabilidade</h3>
                      </div>
                      <ul className="space-y-3 font-medium text-sm">
                        <li className="flex items-start gap-3">
                          <span className="text-olive mt-0.5 font-bold">▪</span>
                          <span>Sistema agroflorestal</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-olive mt-0.5 font-bold">▪</span>
                          <span>Captura de carbono</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-olive mt-0.5 font-bold">▪</span>
                          <span>Produção regenerativa</span>
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
                    <h2 className="font-display text-2xl font-bold uppercase text-olive">Resultados Esperados</h2>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    {/* Fomento List */}
                    <div className="lg:col-span-8 bg-white border border-olive/15 rounded-3xl p-6 sm:p-8 text-left shadow-elevation-2 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-6">
                          <Sparkles className="w-5 h-5 text-terracotta" />
                          <h3 className="font-display text-xl font-bold text-olive-dark">FOMENTO</h3>
                        </div>
                        
                        <ul className="space-y-4 font-bold text-sm sm:text-base">
                          <li className="flex items-center gap-3 bg-cream/30 p-3 rounded-xl border border-olive/5">
                            <div className="w-5 h-5 rounded-full bg-olive text-cream flex items-center justify-center text-xs">✓</div>
                            <span>Crescimento produtivo da região</span>
                          </li>
                          <li className="flex items-center gap-3 bg-cream/30 p-3 rounded-xl border border-olive/5">
                            <div className="w-5 h-5 rounded-full bg-olive text-cream flex items-center justify-center text-xs">✓</div>
                            <span>Acompanhamento Técnico E Validação Governamental Através da CATI SJRP e Secretaria de Desenvolvimento do Estado de São Paulo</span>
                          </li>
                          <li className="flex items-center gap-3 bg-cream/30 p-3 rounded-xl border border-olive/5">
                            <div className="w-5 h-5 rounded-full bg-olive text-cream flex items-center justify-center text-xs">✓</div>
                            <span>Alta escalabilidade Em fazendas do grupo familiar e região</span>
                          </li>
                          <li className="flex items-center gap-3 bg-cream/30 p-3 rounded-xl border border-olive/5">
                            <div className="w-5 h-5 rounded-full bg-olive text-cream flex items-center justify-center text-xs">✓</div>
                            <span>Industria Pós colheita – Secagem (cacau do polo SJRP) efetivada</span>
                          </li>
                          <li className="flex items-center gap-3 bg-cream/30 p-3 rounded-xl border border-olive/5">
                            <div className="w-5 h-5 rounded-full bg-olive text-cream flex items-center justify-center text-xs">✓</div>
                            <span>Futuro parceiro comercial para exportação (Barter)</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Quick review card */}
                    <div className="lg:col-span-4 bg-olive text-cream rounded-3xl p-8 flex flex-col justify-between text-left shadow-elevation-3">
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-cream/70">Parceria Agro</span>
                        <h4 className="font-display text-2xl font-black mt-2 leading-tight">Brasil & China</h4>
                        <p className="text-xs text-cream/80 mt-4 leading-relaxed font-medium">
                          Implantação escalonada que traz estabilidade socioeconômica, preservação ecológica, e inserção definitiva de São José do Rio Preto no mercado internacional de cacau.
                        </p>
                      </div>

                      <div className="border-t border-cream/20 pt-6 mt-8">
                        <p className="text-[10px] font-bold text-cream/60">ESTABILIDADE FINANCEIRA</p>
                        <p className="text-lg font-display font-extrabold text-cream">Seringa + Cacau</p>
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
                      <h2 className="font-display text-2xl font-bold uppercase text-olive">Conclusão</h2>
                      <p className="text-[10px] text-olive-dark/60 font-bold uppercase tracking-wider">Próximos Passos e Parceria</p>
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
                          Oportunidade de Fomento
                        </span>
                        <div>
                          <h3 className="font-display text-4xl sm:text-5xl font-black bg-gradient-to-r from-olive via-olive-dark to-terracotta bg-clip-text text-transparent leading-tight">
                            Vamos fazer juntos?
                          </h3>
                          <p className="font-display text-lg sm:text-xl font-bold text-olive/90 mt-2">
                            vamos fazer um Memorando de como isto pode acontecer !!
                          </p>
                          <p className="text-xs sm:text-sm font-semibold text-olive-dark/60 mt-1">
                            Eng. Agr. Fernando Moscardo
                          </p>
                        </div>
                        <p className="text-xs sm:text-sm text-olive-dark/80 leading-relaxed max-w-2xl font-medium">
                          O Projeto Agroflorestal Brasil-China representa uma nova era para a Fazenda Macuco e para o polo de cacau de São José do Rio Preto. Ao unir a tradição da seringueira com a alta rentabilidade do cacau, criamos um modelo produtivo sustentável, resiliente ao mercado e com forte impacto socioeconômico. Junte-se a nós nesta transição ecológica e comercial.
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
                            <span className="text-[9px] text-emerald-600 font-extrabold uppercase tracking-widest block mb-0.5">Fale Conosco</span>
                            <span className="text-base font-bold text-olive-dark group-hover:text-emerald-700 transition-colors">
                              WhatsApp/Contato
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
                            <span className="text-[9px] text-olive/80 font-extrabold uppercase tracking-widest block mb-0.5">Enviar E-mail</span>
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
                        <span className="text-[9px] uppercase font-extrabold tracking-widest text-cream/70 block mb-1">Síntese do Projeto</span>
                        <h4 className="font-display text-2xl font-black leading-tight border-b border-white/10 pb-3">Fazenda Macuco</h4>
                        
                        <ul className="space-y-3 mt-6 text-xs font-semibold">
                          <li className="flex items-center gap-3 bg-white/5 border border-white/10 p-3 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all duration-200">
                            <CheckCircle2 className="w-4 h-4 text-cream shrink-0" />
                            <span>220 ha de Área Produtiva Integrada</span>
                          </li>
                          <li className="flex items-center gap-3 bg-white/5 border border-white/10 p-3 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all duration-200">
                            <CheckCircle2 className="w-4 h-4 text-cream shrink-0" />
                            <span>Consórcio de Alta Margem (Seringa + Cacau)</span>
                          </li>
                          <li className="flex items-center gap-3 bg-white/5 border border-white/10 p-3 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all duration-200">
                            <CheckCircle2 className="w-4 h-4 text-cream shrink-0" />
                            <span>Logística Consolidada com Secadora Ativa</span>
                          </li>
                          <li className="flex items-center gap-3 bg-white/5 border border-white/10 p-3 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all duration-200">
                            <CheckCircle2 className="w-4 h-4 text-cream shrink-0" />
                            <span>Potencial ESG & Crédito de Carbono</span>
                          </li>
                        </ul>
                      </div>

                      <div className="border-t border-cream/20 pt-5 mt-8 relative z-10">
                        <span className="text-[9px] font-bold text-cream/60 uppercase tracking-widest block mb-0.5">PÓLO CACAU SP</span>
                        <span className="text-base font-display font-extrabold text-cream leading-tight">São José do Rio Preto</span>
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
            Anterior
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalSlides }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  idx === currentSlide ? "bg-olive w-6" : "bg-olive/20 hover:bg-olive/45"
                }`}
                title={`Ir para Slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-cream bg-olive hover:bg-olive-dark rounded-xl shadow-elevation-1 transition-all"
          >
            Próximo
            <ChevronRight className="w-4 h-4" />
          </button>
        </footer>
      </div>
    </div>
  );
}
