import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Lock,
  Unlock,
  ChevronDown,
  CheckCircle2,
  Zap,
  Target,
  MessageSquare,
  TrendingDown,
  Users,
  Brain,
  Star,
  ArrowRight,
  ShieldAlert,
  Plus,
  Minus,
  AlertTriangle,
  Heart
} from 'lucide-react';

// --- COMPONENTES AUXILIARES ---

const SectionTitle = ({ children, subtitle, colorClass = "text-amber-500" }) => (
  <div className="text-center mb-16 px-4 relative z-10">
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`text-3xl md:text-5xl font-black mb-6 tracking-tighter uppercase leading-normal md:leading-tight py-2 ${colorClass}`}
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-zinc-400 max-w-2xl mx-auto text-base md:text-lg font-medium leading-relaxed whitespace-pre-line md:whitespace-normal"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

const FloatingParticles = () => {
  const particles = Array.from({ length: 40 });
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-amber-500/10 rounded-full"
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            opacity: 0
          }}
          animate={{
            y: [null, "-100%"],
            opacity: [0, 1, 0],
            scale: [1, 2, 1]
          }}
          transition={{
            duration: Math.random() * 20 + 15,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 10
          }}
        />
      ))}
    </div>
  );
};

const MapNode = ({ module, index, isLast }) => {
  const isEven = index % 2 === 0;
  const pathData = isEven
    ? "M 0 0 C 150 0, 150 160, 300 160"
    : "M 0 0 C -150 0, -150 160, -300 160";

  return (
    <div className="relative flex flex-col items-center w-full">
      {!isLast && (
        <div className="absolute top-full w-1.5 h-24 bg-gradient-to-b from-amber-500 via-amber-400 to-transparent md:hidden shadow-[0_0_20px_rgba(245,158,11,0.6)] z-0" />
      )}

      <motion.div
        initial={{ opacity: 0, x: isEven ? -30 : 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.05, borderColor: 'rgba(245, 158, 11, 0.7)', boxShadow: '0 0 50px rgba(245, 158, 11, 0.2)' }}
        className={`relative z-20 w-full max-w-sm bg-zinc-900/90 backdrop-blur-xl border-2 border-amber-500/20 rounded-[2.5rem] p-8 transition-all group shadow-2xl ${
          isEven ? 'md:mr-[300px]' : 'md:ml-[300px]'
        }`}
      >
        <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500 mb-6 group-hover:bg-amber-500 group-hover:text-zinc-950 transition-all duration-500 shadow-[0_0_30px_rgba(245,158,11,0.3)]">
          {module.icon}
        </div>
        <h4 className="text-xl font-black mb-4 text-amber-500 uppercase tracking-tighter">{module.title}</h4>
        <ul className="space-y-2">
          {module.topics.map((topic, i) => (
            <li key={i} className="text-zinc-300 flex items-center gap-2 text-sm font-bold text-left">
              <div className="w-2 h-2 bg-amber-500 rounded-full shrink-0 shadow-[0_0_8px_#f59e0b]" /> {topic}
            </li>
          ))}
        </ul>

        <div className="absolute -top-3 -right-3 w-12 h-12 bg-amber-500 text-zinc-950 rounded-full flex items-center justify-center font-black italic border-4 border-[#030806] shadow-xl text-lg">
          {index + 1}
        </div>
      </motion.div>

      {!isLast && (
        <svg
          className={`hidden md:block absolute top-1/2 z-10 pointer-events-none ${isEven ? 'left-1/2' : 'right-1/2'}`}
          width="450"
          height="200"
          viewBox="0 0 400 160"
        >
          <defs>
            <filter id={`glow-${index}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <linearGradient id={`grad-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="1" />
              <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          <path d={pathData} fill="none" stroke="rgba(245, 158, 11, 0.15)" strokeWidth="8" />

          <motion.path
            d={pathData}
            fill="none"
            stroke={`url(#grad-${index})`}
            strokeWidth="5"
            filter={`url(#glow-${index})`}
            strokeDasharray="20 12"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
          />

          <motion.circle
            r="5"
            fill="#fff"
            filter={`url(#glow-${index})`}
            style={{ offsetPath: `path('${pathData}')` }}
            animate={{ offsetDistance: "100%" }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      )}
    </div>
  );
};

const FAQItem = ({ question, answer, isOpen, onClick }) => (
  <div className="border-b border-zinc-800 bg-zinc-900/30 rounded-xl mb-3 overflow-hidden transition-all duration-300">
    <button
      onClick={() => {
        trackFAQInteraction(question, !isOpen);
        onClick();
      }}
      className="w-full p-5 text-left flex items-center justify-between hover:bg-zinc-800 transition-all group"
    >
      <span className="text-base md:text-lg font-bold text-zinc-100 pr-8 leading-tight">{question}</span>
      <div className={`p-1.5 rounded-full ${isOpen ? 'bg-amber-500 text-zinc-950' : 'bg-zinc-800 text-amber-500'} transition-all duration-300`}>
        {isOpen ? <Minus size={16} /> : <Plus size={16} />}
      </div>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="px-5 pb-6 text-zinc-400 text-base leading-relaxed"
        >
          {answer}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

// ===== FUNÇÕES DE RASTREAMENTO =====
const trackEvent = (eventName, eventData = {}) => {
  // Google Analytics 4
  if (window.gtag) {
    window.gtag('event', eventName, eventData);
  }
  
  // Facebook Pixel
  if (window.fbq) {
    window.fbq('track', eventName, eventData);
  }
  
  console.log(`📊 Event Tracked: ${eventName}`, eventData);
};

const trackCheckout = () => {
  trackEvent('begin_checkout', {
    currency: 'BRL',
    value: 297,
    items: [{
      item_name: 'Código do Fechamento - CDF',
      price: 297,
      quantity: 1,
      item_category: 'Curso Online'
    }]
  });
  
  // Facebook Pixel - InitiateCheckout
  window.fbq?.('track', 'InitiateCheckout', {
    currency: 'BRL',
    value: 297
  });
};

const trackSectionView = (sectionName) => {
  trackEvent('view_section', {
    section: sectionName,
    timestamp: new Date().toISOString()
  });
};

const trackFAQInteraction = (question, isOpen) => {
  trackEvent('faq_' + (isOpen ? 'expand' : 'collapse'), {
    question: question,
    action: isOpen ? 'expand' : 'collapse'
  });
};

const trackLinkClick = (linkName, linkUrl) => {
  trackEvent('outbound_link', {
    link_name: linkName,
    link_url: linkUrl
  });
};

export default function App() {
  const [faqOpenIndex, setFaqOpenIndex] = useState(null);
  const CHECKOUT_URL = 'https://pay.hotmart.com/Q105475690K?checkoutMode=2';

  // ===== RASTREAMENTO DE SCROLL E SEÇÕES =====
  React.useEffect(() => {
    const handleScroll = () => {
      const sections = ['video-section', 'offer-section'];
      sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight * 0.75 && rect.bottom > 0;
          if (isVisible && !element.dataset.tracked) {
            trackSectionView(sectionId);
            element.dataset.tracked = 'true';
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const modules = [
    { title: "Módulo 1: Mentalidade", topics: ["Fim da rejeição", "Postura de Elite"], icon: <Brain size={32} /> },
    { title: "Módulo 2: Qualificação", topics: ["Filtro de curiosos", "Dores Ocultas"], icon: <Users size={32} /> },
    { title: "Módulo 3: Gatilhos", topics: ["Escassez de Valor", "Ancoragem"], icon: <Zap size={32} /> },
    { title: "Módulo 4: Apresentação", topics: ["Pitch de 60s", "Valor Percebido"], icon: <Target size={32} /> },
    { title: "Módulo 5: Objeções", topics: ["Antídoto para o 'Está Caro'", "Scripts Finais"], icon: <ShieldCheck size={32} /> },
    { title: "Módulo 6: Fechamento", topics: ["Técnicas de Assunção", "Fidelização Imediata"], icon: <Lock size={32} /> },
    { title: "Módulo 7: Pós-venda", topics: ["Encantamento do Cliente", "Geração de Indicações", "LTV Estratégico"], icon: <Heart size={32} /> },
  ];

  const handleCheckout = (e) => {
    e?.preventDefault();
    trackCheckout();
  };

  return (
    <div className="min-h-screen bg-[#030806] text-white selection:bg-amber-500/30 overflow-x-hidden font-['Poppins',sans-serif]">
      <FloatingParticles />

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110vw] h-[110vh] md:w-[150vw] lg:w-[100vw] aspect-video">
            <iframe
              src="https://player.vimeo.com/video/1181183139?autoplay=1&loop=1&background=1&muted=1&badge=0&autopause=0&player_id=0&app_id=58479"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              className="absolute top-0 left-0 w-full h-full object-cover opacity-40 scale-110"
              title="Cofre de Ouro Aberto"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#030806] via-transparent to-[#030806]" />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} className="text-center lg:text-left">
            <motion.div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-black uppercase tracking-[0.3em] mb-8 shadow-[0_0_20px_rgba(245,158,11,0.1)]">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
              Sessão Privada de Vendas
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] mb-6 tracking-tighter uppercase">
              <span className="text-amber-500">Aprenda a fechar vendas</span><br />
              <span className="text-white">mesmo sem nunca ter vendido na vida</span>
            </h1>

            <p className="text-zinc-400 text-lg md:text-xl mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
              O Método CDF (Código do Fechamento) que transforma o seu medo em confiança absoluta e lucro real diante de qualquer cliente.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <a
                href={CHECKOUT_URL}
                onClick={handleCheckout}
                className="hotmart-fb group relative px-10 py-5 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black rounded-xl transition-all duration-300 shadow-[0_0_30px_rgba(245,158,11,0.3)] flex items-center gap-3 text-lg overflow-hidden uppercase tracking-tighter"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shimmer" />
                QUERO DESTRAVAR O ACESSO
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <div className="flex flex-col items-start gap-1 text-[10px] text-zinc-500 font-bold uppercase tracking-[0.15em]">
                <span className="flex items-center gap-2"><CheckCircle2 size={14} className="text-amber-500" /> Acesso Imediato</span>
                <span className="flex items-center gap-2"><ShieldCheck size={14} className="text-amber-500" /> 100% Blindado</span>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="relative flex items-center justify-center p-8">
            <div className="absolute inset-0 bg-amber-500/10 blur-[120px] rounded-full scale-110 animate-pulse" />
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }} className="relative z-10">
              <img
                src="https://i.postimg.cc/LsxPbnrb/Prancheta_1_12_27_43.png"
                alt="Logo CDF Oficial"
                className="w-full max-w-[180px] md:max-w-[280px] object-contain drop-shadow-[0_0_30px_rgba(245,158,11,0.5)]"
              />
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-amber-500/40 z-10"
        >
          <ChevronDown size={32} strokeWidth={1} />
        </motion.div>
      </section>

      {/* VSL */}
      <section id="video-section" className="py-24 px-4 bg-zinc-950/90 border-y border-zinc-900 relative">
        <div className="max-w-4xl mx-auto text-center">
          <SectionTitle subtitle="Entenda a ciência por trás de fechar vendas impossíveis com facilidade.">
            Por que o <span className="text-amber-500">CDF</span> é diferente?
          </SectionTitle>
          <div className="rounded-3xl border-4 border-zinc-900 overflow-hidden shadow-2xl" style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
            <iframe
              src="https://player.vimeo.com/video/1184942707?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
              title="VSL CDF"
            />
          </div>
          <a
            href={CHECKOUT_URL}
            onClick={handleCheckout}
            className="hotmart-fb mt-8 w-full max-w-lg mx-auto py-5 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-lg md:text-xl rounded-2xl transition-all duration-300 shadow-[0_15px_45px_rgba(245,158,11,0.3)] uppercase tracking-tight block text-center"
          >
            🔒 Garantir Minha Vaga Agora
          </a>
          <script src="https://player.vimeo.com/api/player.js" />
        </div>
      </section>

      {/* PROBLEMA */}
      <section className="py-32 px-4 bg-black relative overflow-hidden border-y border-red-900/40">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 animate-siren-rotate opacity-30">
            <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_160deg,rgba(220,38,38,0.8)_180deg,transparent_200deg)]" />
          </div>
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-red-600/10 blur-[150px] rounded-full"
          />
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `linear-gradient(rgba(220,38,38,0.2) 1px,transparent 1px),linear-gradient(90deg,rgba(220,38,38,0.2) 1px,transparent 1px)`, backgroundSize: '40px 40px' }} />
          <motion.div animate={{ top: ["-10%", "110%"] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="absolute left-0 right-0 h-[3px] bg-red-600/50 shadow-[0_0_20px_rgba(220,38,38,0.8)] z-10" />
        </div>

        <div className="max-w-6xl mx-auto relative z-20">
          <div className="flex flex-col items-center mb-16">
            <motion.div animate={{ scale: [1, 1.2, 1], color: ["#ef4444", "#ffffff", "#ef4444"] }} transition={{ duration: 1, repeat: Infinity }} className="mb-4 text-red-500">
              <AlertTriangle size={56} strokeWidth={2.5} />
            </motion.div>
            <SectionTitle colorClass="text-red-500" subtitle="O custo de não saber fechar é a falência silenciosa do seu projeto.">
              <span className="block mb-2 text-zinc-100 drop-shadow-lg">Você se identifica com</span>
              <span className="inline-block text-white bg-red-600 px-5 py-3 rounded-xl shadow-[0_0_40px_rgba(220,38,38,0.5)] tracking-normal animate-pulse">alguma dessas situações?</span>
            </SectionTitle>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { icon: <MessageSquare size={32} />, title: "O Gelo do Preço", desc: "Aquele silêncio constrangedor que destrói a sua autoridade em segundos." },
              { icon: <Users size={32} />, title: 'O "Vou Pensar"', desc: "Você sabe que é mentira, mas aceita e deixa o cliente ir embora para sempre." },
              { icon: <TrendingDown size={32} />, title: "Consultor Grátis", desc: "Você gasta horas explicando e ele acaba comprando no concorrente." },
              { icon: <Brain size={32} />, title: "Vergonha de Vender", desc: "O medo de parecer 'vendedor chato' impede-o de realizar os seus sonhos." },
              { icon: <ShieldAlert size={32} />, title: "Massacre do Preço", desc: "Sua única arma é o desconto, matando a sua margem de lucro." },
              { icon: <Target size={32} />, title: "Nocauteado por Objeção", desc: "Qualquer pergunta difícil faz com que gagueje e perca o controle." }
            ].map((item, idx) => (
              <motion.div key={idx} whileHover={{ y: -12, borderColor: 'rgba(220,38,38,0.7)', backgroundColor: 'rgba(20,0,0,0.9)' }} className="p-10 bg-zinc-950/90 backdrop-blur-xl border-2 border-red-900/20 rounded-[3rem] transition-all group shadow-2xl">
                <div className="w-16 h-16 bg-red-600/10 rounded-2xl flex items-center justify-center text-red-500 mb-8 group-hover:bg-red-600 group-hover:text-white transition-all duration-500">{item.icon}</div>
                <h3 className="text-xl font-black mb-4 uppercase tracking-tight text-zinc-100">{item.title}</h3>
                <p className="text-zinc-500 leading-relaxed font-medium text-base group-hover:text-zinc-300 transition-colors">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROVA SOCIAL */}
      <section className="py-24 px-4 bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <SectionTitle subtitle={<>Pessoas reais que saíram da inércia para <br className="hidden md:block" /> o fechamento em tempo recorde.</>}>
            Validado por <span className="text-amber-500">Quem Aplica</span>
          </SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
            {[
              {
                name: "Fulvio Santos",
                role: "Corretor de Imóveis",
                img: "https://i.postimg.cc/Y9Yqm8Nt/Fulvio.png",
                text: "Trabalhei anos no mercado imobiliário sem conseguir fechar metade do que eu deveria. Depois do CDF, aprendi a conduzir a negociação com autoridade real. Em menos de 30 dias fechei 3 contratos que antes eu teria perdido para a concorrência."
              },
              {
                name: "Osmar Costa",
                role: "Dono de Assessoria de Marketing",
                img: "https://i.postimg.cc/prSVn79c/Foto-Osmar-Perfil.jpg",
                text: "Como dono de assessoria, eu vendia o serviço, mas travava na hora de defender o preço. O CDF me deu as ferramentas para blindar o valor do meu trabalho. Hoje meus contratos são maiores e meus clientes chegam muito mais convictos."
              },
              {
                name: "Pablio Tavares",
                role: "Vendedor",
                img: "https://i.postimg.cc/3NNmTs5f/Pablio.png",
                text: "Eu achava que vender era um dom natural. O CDF me provou que é uma ciência exata. Aprendi a identificar objeções antes mesmo de o cliente verbalizá-las e a conduzir a conversa para o fechamento sem pressão. Minha comissão dobrou em dois meses."
              },
              {
                name: "Rafael",
                role: "Instalações de Mármores",
                img: "https://i.postimg.cc/cCtCT0NQ/Rafael.png",
                text: "No meu segmento, a concorrência é brutal e todo cliente só fala em preço. Depois do CDF, aprendi a apresentar o valor real do meu serviço antes de mencionar qualquer número. Passei a fechar obras que antes iam direto para o concorrente mais barato."
              },
            ].map((testi, i) => (
              <motion.div key={i} whileHover={{ scale: 1.02 }} className="p-8 bg-zinc-900 rounded-3xl border border-zinc-800 shadow-xl flex flex-col items-center">
                <div className="flex gap-1 mb-4 text-amber-500">
                  {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
                </div>
                <p className="text-zinc-300 text-base mb-8 leading-relaxed italic text-center">"{testi.text}"</p>
                <div className="mt-auto flex items-center gap-3">
                  <img src={testi.img} className="w-14 h-14 rounded-full border-2 border-amber-500 p-0.5 object-cover" alt={testi.name} />
                  <div className="text-left">
                    <div className="font-black uppercase tracking-tighter text-amber-500 text-xs">{testi.name}</div>
                    <div className="text-zinc-500 text-[10px] font-bold">{testi.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTEÚDO DO COFRE */}
      <section className="py-24 px-4 relative overflow-hidden bg-zinc-950">
        <div className="absolute inset-0 z-0 opacity-25 bg-cover bg-center bg-no-repeat grayscale-[0.4] pointer-events-none" style={{ backgroundImage: `url('https://i.postimg.cc/Hx8QGM0q/Gemini-Generated-Image-cazngucazngucazn.png')` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030806] via-transparent to-zinc-950 z-0" />
        <div className="max-w-5xl mx-auto relative z-10">
          <SectionTitle colorClass="text-amber-500" subtitle="A sequência exata de conhecimentos para dominar o fechamento.">
            O Conteúdo do <span className="text-white">Cofre</span>
          </SectionTitle>
          <div className="relative space-y-24 md:space-y-0">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-2 bg-gradient-to-b from-amber-500/10 via-amber-500/40 to-transparent -translate-x-1/2 shadow-[0_0_25px_rgba(245,158,11,0.2)] z-0" />
            <div className="flex flex-col items-center gap-24 md:gap-40">
              {modules.map((module, idx) => (
                <MapNode key={idx} module={module} index={idx} isLast={idx === modules.length - 1} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* OFERTA */}
      <section id="offer-section" className="py-24 px-4 bg-[#030806] relative overflow-hidden border-t border-amber-500/10">
        <div className="absolute inset-0 z-0 opacity-20 bg-cover bg-center bg-no-repeat grayscale-[0.5] pointer-events-none" style={{ backgroundImage: `url('https://i.postimg.cc/Hx8QGM0q/Gemini-Generated-Image-cazngucazngucazn.png')` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#030806] via-transparent to-[#030806] z-0" />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="bg-zinc-900/80 backdrop-blur-md border-4 border-amber-500/20 rounded-[40px] p-10 md:p-16 text-center shadow-[0_0_60px_rgba(0,0,0,0.8)]">
            <h3 className="text-3xl md:text-5xl font-black mb-10 uppercase tracking-tighter text-amber-500">O Tesouro Completo</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mb-16">
              <div className="space-y-6">
                {["Acesso Completo ao Método CDF", "Guia de Psicologia para Vendas", "Scripts de WhatsApp de Alta Conversão"].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <CheckCircle2 size={24} className="text-amber-500 shrink-0 mt-0.5" />
                    <span className="text-lg font-bold text-zinc-100">{item}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-6">
                {["Aulas de Atualização Semestrais", "Comunidade VIP de Membros", "Certificado de Elite CDF"].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <CheckCircle2 size={24} className="text-amber-500 shrink-0 mt-0.5" />
                    <span className="text-lg font-bold text-zinc-100">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center bg-zinc-950/90 p-8 md:p-14 rounded-[40px] border border-amber-500/10 shadow-[0_0_50px_rgba(245,158,11,0.2)] max-w-2xl mx-auto">
              <div className="mb-8 text-center">
                <span className="text-zinc-500 line-through text-xl font-bold uppercase block mb-1 tracking-widest">R$ 997,00</span>
                <span className="text-6xl md:text-8xl font-black text-amber-500 tracking-tighter block mb-1 leading-none">R$ 297</span>
                <span className="text-zinc-400 font-bold uppercase tracking-widest block text-xs">ou 12x de R$ 30,72 no cartão</span>
              </div>
              <a href={CHECKOUT_URL} onClick={handleCheckout} className="hotmart-fb w-full py-6 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-xl rounded-2xl transition-all duration-300 shadow-[0_15px_45px_rgba(245,158,11,0.3)] group overflow-hidden relative block text-center">
                <div className="flex items-center justify-center gap-3 uppercase"><Unlock size={24} /> Destravar Agora</div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-4 bg-[#030806]">
        <div className="max-w-3xl mx-auto text-center">
          <SectionTitle subtitle="Tudo o que você precisa saber antes de destravar o seu acesso.">
            Dúvidas <span className="text-amber-500">Comuns</span>
          </SectionTitle>
          <div className="space-y-2">
            {[
              { q: "O método funciona para qualquer produto?", a: "Sim. O Código do Fechamento baseia-se em psicologia comportamental humana. Os gatilhos de decisão são universais." },
              { q: "Preciso ter experiência prévia?", a: "Pelo contrário. O curso foi feito para iniciantes começarem da forma certa, sem vícios de vendedores antigos." },
              { q: "Por quanto tempo tenho acesso?", a: "O seu acesso é vitalício. Paga uma única vez e terá todas as atualizações futuras sem custos extra." },
              { q: "E se eu não gostar do conteúdo?", a: "Tem 7 dias de garantia total. Se achar que não é para si, devolvemos o dinheiro sem perguntas." }
            ].map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} isOpen={faqOpenIndex === i} onClick={() => setFaqOpenIndex(faqOpenIndex === i ? null : i)} />
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 px-4 border-t border-zinc-900 text-center bg-zinc-950">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-12 text-center">
          <div className="flex items-center gap-2 text-amber-500 font-black uppercase text-2xl tracking-tighter">
            <Lock size={24} /> CÓDIGO DO FECHAMENTO
          </div>
          <div className="flex items-center justify-center gap-4 bg-zinc-900/50 px-6 py-3 rounded-full border border-white/5">
            <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em] whitespace-nowrap">Desenvolvido por:</span>
            <a 
              href="https://perfowise.com.br/" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => trackLinkClick('Perfowise', 'https://perfowise.com.br/')}
              className="hover:opacity-80 transition-all hover:scale-105 active:scale-95"
            >
              <img src="https://i.postimg.cc/SKGPg3B5/Prancheta_1_co_pia_6.png" alt="Logo Perfowise" className="h-7 md:h-9 object-contain" />
            </a>
          </div>
          <p className="text-zinc-600 text-[10px] max-w-xl leading-loose font-bold uppercase tracking-[0.15em]">
            Copyright © 2024 Todos os direitos reservados. Este site não é afiliado ao Google ou Facebook.
          </p>
          <div className="flex gap-8 text-zinc-500 text-[10px] font-black uppercase tracking-widest">
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                trackLinkClick('Termos', '#termos');
              }}
              className="hover:text-amber-500 transition-colors"
            >
              Termos
            </a>
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                trackLinkClick('Privacidade', '#privacidade');
              }}
              className="hover:text-amber-500 transition-colors"
            >
              Privacidade
            </a>
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                trackLinkClick('Suporte', '#suporte');
              }}
              className="hover:text-amber-500 transition-colors"
            >
              Suporte
            </a>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes shimmer { 100% { transform: translateX(100%); } }
        .animate-shimmer { animation: shimmer 2.5s infinite; }
        @keyframes siren-rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-siren-rotate { animation: siren-rotate 3s linear infinite; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #030806; }
        ::-webkit-scrollbar-thumb { background: #f59e0b; border-radius: 10px; }
      `}</style>
    </div>
  );
}
