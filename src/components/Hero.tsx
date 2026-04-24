"use client";

import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

/* ── Niveaux ── */
const NIVEAUX = [
  {
    id: "bts",
    label: "BTS",
    sub: "Bac +2 · 2 ans",
    tagline:
      "Transformez votre potentiel en expertise concrète et propulsez votre carrière dès aujourd'hui.",
    href: "#bts",
    img: "/formations/bts.jpeg",
    objPos: "center center",
    badge: "Inscriptions ouvertes",
  },
  {
    id: "licence-pro",
    label: "Licence Pro",
    sub: "Bac +3 · 1 an",
    tagline:
      "Le choix de la crédibilité pour passer au niveau supérieur et valider votre expertise métier.",
    href: "#licence-pro",
    img: "/formations/licence-pro.jpg",
    objPos: "center 20%",
    badge: null,
  },
  {
    id: "master-pro",
    label: "Master Pro",
    sub: "Bac +5 · 2 ans",
    tagline:
      "Prenez de la hauteur et forgez votre leadership pour piloter les projets stratégiques de demain.",
    href: "#master-pro",
    img: "/formations/master-pro.jpg",
    objPos: "center 15%",
    badge: null,
  },
];

const INTERVAL = 5000;

/* ── Small card (right slots) ── */
function SmallCard({
  niveau,
  onClick,
}: {
  niveau: typeof NIVEAUX[0];
  onClick: () => void;
}) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={niveau.href}
      onClick={(e) => { e.preventDefault(); onClick(); }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="relative block w-full h-full rounded-2xl overflow-hidden cursor-pointer"
      style={{
        boxShadow: hov ? "0 12px 40px rgba(0,180,166,0.3), 0 0 0 2px #00B4A6" : "0 4px 20px rgba(0,0,0,0.45)",
        transform: hov ? "scale(1.03)" : "scale(1)",
        transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={niveau.img}
        alt={niveau.label}
        suppressHydrationWarning
        style={{
          width: "100%", height: "100%", objectFit: "cover",
          objectPosition: niveau.objPos,
          display: "block",
          transform: hov ? "scale(1.07)" : "scale(1)",
          transition: "transform 0.5s ease",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F44]/90 via-[#0A1F44]/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-3.5">
        <p className="text-white font-extrabold text-[15px] leading-tight">{niveau.label}</p>
        <p className="text-white/60 text-[11px] mt-0.5">{niveau.sub}</p>
      </div>
    </a>
  );
}

/* ── Featured card (large left) ── */
function FeaturedSlot({
  activeIndex,
  paused,
  setPaused,
  goTo,
}: {
  activeIndex: number;
  paused: boolean;
  setPaused: (v: boolean) => void;
  goTo: (i: number) => void;
}) {
  return (
    <div
      className="relative w-full h-full rounded-2xl overflow-hidden"
      style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.55), 0 0 0 2px rgba(0,180,166,0.4)" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Crossfade layers */}
      {NIVEAUX.map((n, i) => (
        <div
          key={n.id}
          className="absolute inset-0"
          style={{
            opacity: i === activeIndex ? 1 : 0,
            transition: "opacity 0.8s ease-in-out",
            pointerEvents: i === activeIndex ? "auto" : "none",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={n.img}
            alt={n.label}
            suppressHydrationWarning
            style={{
              width: "100%", height: "100%", objectFit: "cover",
              objectPosition: n.objPos, display: "block",
            }}
          />
          {/* Gradient — strong at bottom for text readability */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to top, rgba(5,15,40,1) 0%, rgba(5,15,40,0.92) 30%, rgba(5,15,40,0.65) 52%, rgba(5,15,40,0.2) 72%, transparent 100%)",
            }}
          />
        </div>
      ))}

      {/* Badge (BTS only) */}
      {NIVEAUX[activeIndex].badge && (
        <div
          className="absolute top-4 left-4 z-20"
          style={{
            background: "#00B4A6", color: "white",
            fontSize: "10px", fontWeight: 800,
            padding: "4px 12px", borderRadius: "999px",
            letterSpacing: "0.06em", textTransform: "uppercase",
            opacity: 1, transition: "opacity 0.4s ease",
          }}
        >
          {NIVEAUX[activeIndex].badge}
        </div>
      )}

      {/* Text content */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-6 pb-10">
        <p className="text-[#00B4A6] text-xs font-bold uppercase tracking-widest mb-1" style={{ textShadow: "0 1px 6px rgba(0,0,0,0.8)" }}>
          {NIVEAUX[activeIndex].sub}
        </p>
        <h3 className="text-white text-2xl font-extrabold leading-tight mb-2" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.9)" }}>
          {NIVEAUX[activeIndex].label}
        </h3>
        <p className="text-white/90 text-sm leading-relaxed max-w-[260px]" style={{ textShadow: "0 1px 6px rgba(0,0,0,0.9)" }}>
          {NIVEAUX[activeIndex].tagline}
        </p>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-4 right-5 z-20 flex items-center gap-2">
        {NIVEAUX.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="cursor-pointer transition-all duration-300"
            style={{
              width: i === activeIndex ? "20px" : "6px",
              height: "6px",
              borderRadius: "999px",
              background: i === activeIndex ? "#00B4A6" : "rgba(255,255,255,0.35)",
              border: "none",
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/15 z-20">
        {!paused && (
          <div
            key={`pb-${activeIndex}`}
            style={{
              height: "100%",
              background: "#00B4A6",
              animation: `progressFill ${INTERVAL}ms linear forwards`,
            }}
          />
        )}
      </div>

      <style>{`
        @keyframes progressFill {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </div>
  );
}

/* ── Main Hero ── */
export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused]           = useState(false);

  /* Auto-advance */
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActiveIndex(p => (p + 1) % NIVEAUX.length), INTERVAL);
    return () => clearInterval(t);
  }, [paused]);

  const small1 = NIVEAUX[(activeIndex + 1) % NIVEAUX.length];
  const small2 = NIVEAUX[(activeIndex + 2) % NIVEAUX.length];

  return (
    <section
      id="accueil"
      className="relative flex items-start overflow-hidden bg-[#0A1F44] pt-16 md:pt-20"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full bg-[#00B4A6]/8 blur-[100px]" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#00B4A6]/6 blur-[80px]" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dot" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="#00B4A6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dot)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 w-full">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── LEFT ── */}
          <div className="text-center md:text-left">
            {/* ANAQ-Sup mini badge vertical */}
            <div className="inline-flex flex-col items-center gap-1 bg-[#00B4A6]/15 border border-[#00B4A6]/25 px-6 py-3 rounded-2xl mb-6 animate-fade-in-up">
              <span className="text-xl leading-none" role="img" aria-label="Drapeau du Sénégal">🇸🇳</span>
              <span className="text-white font-bold text-[11px] tracking-wider leading-none">ANAQ-Sup</span>
              <span className="text-[#00B4A6] text-[9px] font-semibold uppercase tracking-widest leading-none">Accrédité</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-white leading-[1.1] tracking-tight mb-5 animate-fade-in-up delay-100">
              Devenez l&apos;expert que les{" "}
              <span style={{
                background: "linear-gradient(130deg, #00B4A6 0%, #4dd9d0 50%, #00B4A6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                entreprises s&apos;arrachent.
              </span>
            </h1>

            <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-md mx-auto md:mx-0 animate-fade-in-up delay-200">
              L&apos;IMFP vous offre des formations professionnelles d&apos;excellence —
              BTS, Licences et Masters Pro — pour construire une carrière solide
              au Sénégal et à l&apos;international.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start animate-fade-in-up delay-300">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 bg-[#00B4A6] hover:bg-[#009990] text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] text-[15px] cursor-pointer"
                style={{ boxShadow: "0 8px 32px rgba(0,180,166,0.3)" }}
              >
                Prendre rendez-vous
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#formations"
                className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-[#00B4A6]/50 hover:bg-[#00B4A6]/8 text-white font-semibold px-7 py-3.5 rounded-xl transition-all duration-200 text-[15px] cursor-pointer"
              >
                Voir les formations
              </a>
            </div>
          </div>

          {/* ── RIGHT — Carousel ── */}
          <div className="relative animate-fade-in-up delay-400">

            {/* Desktop: featured left (spans 2 rows) + 2 small right */}
            <div
              className="hidden md:grid gap-3"
              style={{
                gridTemplateColumns: "1.35fr 1fr",
                gridTemplateRows: "240px 230px",
                height: "486px",
              }}
            >
              <div style={{ gridRow: "1 / 3" }}>
                <FeaturedSlot
                  activeIndex={activeIndex}
                  paused={paused}
                  setPaused={setPaused}
                  goTo={setActiveIndex}
                />
              </div>

              {/* Small cards with fade on change */}
              <div
                key={`s1-${small1.id}`}
                style={{ animation: "fadeIn 0.5s ease forwards" }}
              >
                <SmallCard niveau={small1} onClick={() => setActiveIndex((activeIndex + 1) % NIVEAUX.length)} />
              </div>
              <div
                key={`s2-${small2.id}`}
                style={{ animation: "fadeIn 0.5s ease forwards" }}
              >
                <SmallCard niveau={small2} onClick={() => setActiveIndex((activeIndex + 2) % NIVEAUX.length)} />
              </div>
            </div>

            <style>{`
              @keyframes fadeIn {
                from { opacity: 0; transform: translateY(6px); }
                to   { opacity: 1; transform: translateY(0); }
              }
            `}</style>

            {/* Ambient glow */}
            <div className="hidden md:block absolute -inset-6 rounded-3xl bg-[#00B4A6]/5 blur-2xl -z-10" />

            {/* Mobile: featured full width + 2 small side by side */}
            <div className="md:hidden flex flex-col gap-3">
              <div style={{ height: "220px" }}>
                <FeaturedSlot
                  activeIndex={activeIndex}
                  paused={paused}
                  setPaused={setPaused}
                  goTo={setActiveIndex}
                />
              </div>
              <div className="flex gap-3" style={{ height: "140px" }}>
                <SmallCard niveau={small1} onClick={() => setActiveIndex((activeIndex + 1) % NIVEAUX.length)} />
                <SmallCard niveau={small2} onClick={() => setActiveIndex((activeIndex + 2) % NIVEAUX.length)} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H0Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
