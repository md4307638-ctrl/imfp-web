"use client";

import { useState, useEffect } from "react";
import { Menu, X, GraduationCap } from "lucide-react";

const NAV_LINKS = [
  { label: "Accueil",    href: "#accueil",    badge: false },
  { label: "Formations", href: "#formations", badge: true  },
  { label: "Actualités", href: "#actualites", badge: false },
  { label: "À propos",   href: "#a-propos",   badge: false },
  { label: "Contact",    href: "#contact",    badge: false },
];

export default function Navbar() {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive]   = useState("accueil");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_LINKS.map(l => l.href.replace("#", ""));
    const observers = ids.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive(id); },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  const close = () => setOpen(false);

  return (
    <header
      className="fixed z-50 transition-all duration-500 ease-out"
      style={scrolled ? {
        top: "12px", left: "16px", right: "16px",
        borderRadius: "16px",
        background: "rgba(10,31,68,0.85)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 8px 40px rgba(0,0,0,0.45), 0 0 0 1px rgba(0,180,166,0.08)",
      } : {
        top: 0, left: 0, right: 0,
        background: "#0A1F44",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-[70px]">

          {/* Logo */}
          <a
            href="#accueil"
            onClick={close}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
              style={{
                background: "linear-gradient(135deg, #00B4A6 0%, #009183 100%)",
                boxShadow: "0 4px 16px rgba(0,180,166,0.4)",
              }}
            >
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div className="leading-tight">
              <p className="text-white font-bold text-lg tracking-wide leading-none">IMFP</p>
              <p className="text-[#00B4A6]/75 text-[10px] hidden sm:block leading-none mt-0.5">
                Institut des Métiers et de la Formation Professionnelle
              </p>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {NAV_LINKS.map(({ label, href, badge }) => {
              const id = href.replace("#", "");
              const isActive = active === id;
              return (
                <a
                  key={href}
                  href={href}
                  className="relative px-4 py-2 text-sm rounded-lg transition-all duration-200 cursor-pointer flex items-center gap-1.5 font-medium"
                  style={{
                    color: isActive ? "#fff" : "rgba(255,255,255,0.65)",
                    background: isActive ? "rgba(255,255,255,0.09)" : "transparent",
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      e.currentTarget.style.color = "#fff";
                      e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      e.currentTarget.style.color = "rgba(255,255,255,0.65)";
                      e.currentTarget.style.background = "transparent";
                    }
                  }}
                >
                  {label}
                  {badge && (
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{
                        background: "#00B4A6",
                        boxShadow: "0 0 6px rgba(0,180,166,0.8)",
                        animation: "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite",
                      }}
                    />
                  )}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full"
                      style={{ width: "20px", background: "#00B4A6" }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 whitespace-nowrap"
            style={{
              background: "linear-gradient(135deg, #00B4A6 0%, #009183 100%)",
              boxShadow: "0 4px 20px rgba(0,180,166,0.35)",
            }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,180,166,0.55)")}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,180,166,0.35)")}
          >
            Prendre rendez-vous
          </a>

          {/* Burger */}
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors duration-200 cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div
          className="border-t border-white/10 px-4 pb-5 pt-3"
          style={{ background: scrolled ? "rgba(8,22,56,0.97)" : "#0A1F44" }}
        >
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map(({ label, href, badge }) => (
              <a
                key={href}
                href={href}
                onClick={close}
                className="px-4 py-3 text-white/80 hover:text-white hover:bg-white/8 rounded-xl transition-all duration-200 cursor-pointer font-medium min-h-[48px] flex items-center justify-between"
              >
                <span>{label}</span>
                {badge && (
                  <span className="text-[10px] font-bold text-white px-2.5 py-0.5 rounded-full"
                    style={{ background: "linear-gradient(135deg, #00B4A6, #009183)" }}>
                    Ouvert
                  </span>
                )}
              </a>
            ))}
            <a
              href="#contact"
              onClick={close}
              className="mt-2 text-white font-bold px-4 py-3.5 rounded-xl text-center transition-all duration-200 cursor-pointer min-h-[48px] flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #00B4A6 0%, #009183 100%)" }}
            >
              Prendre rendez-vous
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
