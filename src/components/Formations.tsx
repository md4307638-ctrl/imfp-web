"use client";

import { useState } from "react";
import { Award, Clock, ChevronRight, X, Briefcase, GraduationCap, TrendingUp, BookOpen } from "lucide-react";

const DEBOUCHES: Record<string, string[]> = {
  "Comptabilité & Gestion": [
    "Comptable", "Contrôleur de Gestion", "Auditeur Junior",
    "Gestionnaire de Paie", "Assistant Financier",
  ],
  "Marketing & Communication": [
    "Chargé de Communication", "Community Manager", "Traffic Manager",
    "Chef de Projet Marketing", "Brand Manager",
  ],
  "Informatique de Gestion": [
    "Développeur Full-Stack", "Administrateur Système",
    "Analyste Cybersécurité", "Technicien Support IT",
  ],
  "Gestion des Ressources Humaines": [
    "Chargé de Recrutement", "Gestionnaire RH", "Responsable Formation",
    "Assistant RH", "Chargé de Paie",
  ],
  "Commerce International": [
    "Chargé d'Affaires Export", "Logisticien", "Agent Commercial International",
    "Acheteur", "Analyste Marché",
  ],
  "Management des Entreprises": [
    "Directeur de Business Unit", "Consultant en Management",
    "Responsable Commercial", "Chef de Projet", "Entrepreneur",
  ],
  "Finance & Banque": [
    "Analyste Financier", "Chargé de Clientèle Entreprises",
    "Gestionnaire de Portefeuille", "Trésorier", "Auditeur Senior",
  ],
  "Systèmes d'Information": [
    "Chef de Projet IT", "Architecte Système", "Business Analyst",
    "DevOps Engineer", "Data Analyst",
  ],
  "Logistique & Supply Chain": [
    "Responsable Logistique", "Supply Chain Manager",
    "Directeur Achats", "Chef de Projet Transport", "Planificateur",
  ],
  "Droit des Affaires": [
    "Juriste d'Entreprise", "Conseiller Juridique", "Chargé de Conformité",
    "Assistant Notaire", "Legal Officer",
  ],
  "Management Stratégique": [
    "Directeur Général", "Consultant Stratégique",
    "Directeur des Opérations", "Country Manager", "DG Adjoint",
  ],
  "Audit & Contrôle de Gestion": [
    "Directeur Financier (DAF)", "Responsable Audit Interne",
    "Commissaire aux Comptes", "Expert-Comptable", "CFO",
  ],
  "Ingénierie des Systèmes": [
    "DSI / CTO", "Architecte Entreprise",
    "Expert Cybersécurité", "Responsable Infrastructure", "Tech Lead",
  ],
  "Marketing Digital": [
    "Directeur Marketing / CMO", "Digital Strategist",
    "Head of Growth", "Directeur Communication", "Chief Digital Officer",
  ],
  "Gestion de Projet": [
    "Directeur de Programme", "PMO Manager",
    "Scrum Master Senior", "Coordinateur Multiprojet", "Certifié PMP",
  ],
};

const FORMATIONS = [
  {
    niveau: "BTS",
    badge: "Bac +2",
    icon: GraduationCap,
    inscriptionOuverte: true,
    eliteBadge: "Soyez parmi les premières promotions d'élite",
    color: "from-[#0A1F44] to-[#122d5e]",
    accent: "#00B4A6",
    accentDark: "#007f76",
    duree: "2 ans",
    filieres: [
      "Comptabilité & Gestion",
      "Marketing & Communication",
      "Informatique de Gestion",
      "Gestion des Ressources Humaines",
      "Commerce International",
    ],
    description:
      "Le BTS IMFP vous donne les bases solides pour intégrer le marché du travail ou poursuivre vers une Licence Pro.",
  },
  {
    niveau: "Licence Pro",
    badge: "Bac +3",
    icon: BookOpen,
    inscriptionOuverte: false,
    eliteBadge: null,
    color: "from-[#00B4A6] to-[#009183]",
    accent: "#0A1F44",
    accentDark: "#061530",
    duree: "1 an",
    filieres: [
      "Management des Entreprises",
      "Finance & Banque",
      "Systèmes d'Information",
      "Logistique & Supply Chain",
      "Droit des Affaires",
    ],
    description:
      "La Licence Professionnelle offre une spécialisation ciblée pour accéder directement aux postes à responsabilités.",
  },
  {
    niveau: "Master Pro",
    badge: "Bac +5",
    icon: TrendingUp,
    inscriptionOuverte: false,
    eliteBadge: null,
    color: "from-[#0A1F44] to-[#122d5e]",
    accent: "#00B4A6",
    accentDark: "#007f76",
    duree: "2 ans",
    filieres: [
      "Management Stratégique",
      "Audit & Contrôle de Gestion",
      "Ingénierie des Systèmes",
      "Marketing Digital",
      "Gestion de Projet",
    ],
    description:
      "Le Master Pro prépare les cadres de demain avec une vision globale et des compétences managériales avancées.",
  },
];

function DebouchesModal({
  filiere,
  jobs,
  onClose,
}: {
  filiere: string;
  jobs: string[];
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-[#0A1F44]/70 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm p-7"
        style={{ boxShadow: "0 32px 80px rgba(10,31,68,0.25), 0 0 0 1px rgba(0,180,166,0.1)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>

        <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4"
          style={{ background: "linear-gradient(135deg, #00B4A6, #009183)", boxShadow: "0 4px 16px rgba(0,180,166,0.3)" }}>
          <Briefcase className="w-5 h-5 text-white" />
        </div>

        <p className="text-[#0A1F44]/50 text-xs font-bold uppercase tracking-widest mb-1">Débouchés</p>
        <h3 className="text-[#0A1F44] font-bold text-lg mb-5 leading-tight">{filiere}</h3>

        <ul className="space-y-2.5">
          {jobs.map((job) => (
            <li key={job} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(0,180,166,0.15)" }}>
                <ChevronRight className="w-3 h-3 text-[#00B4A6]" />
              </div>
              <span className="text-gray-700 text-sm font-medium">{job}</span>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          onClick={onClose}
          className="mt-6 w-full inline-flex items-center justify-center gap-2 text-white text-sm font-bold px-5 py-3.5 rounded-2xl transition-all duration-200 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          style={{ background: "linear-gradient(135deg, #0A1F44, #1a3a6e)", boxShadow: "0 8px 24px rgba(10,31,68,0.2)" }}
          onMouseEnter={e => (e.currentTarget.style.background = "linear-gradient(135deg, #00B4A6, #009183)")}
          onMouseLeave={e => (e.currentTarget.style.background = "linear-gradient(135deg, #0A1F44, #1a3a6e)")}
        >
          Prendre rendez-vous
          <ChevronRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}

export default function Formations() {
  const [modal, setModal] = useState<{ filiere: string; jobs: string[] } | null>(null);

  function openDebouches(filiere: string) {
    setModal({ filiere, jobs: DEBOUCHES[filiere] ?? [] });
  }

  return (
    <section id="formations" className="py-14 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-[#E6F9F8] text-[#00B4A6] text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest mb-4">
            Nos Formations
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0A1F44] mb-4">
            Des parcours adaptés à{" "}
            <span className="text-[#00B4A6]">votre ambition</span>
          </h2>
          <p className="text-gray-500 text-base max-w-xl mx-auto mb-6">
            De Bac +2 à Bac +5, chaque niveau est conçu pour vous propulser vers l&apos;excellence professionnelle.
          </p>
          {/* ANAQ-Sup vertical seal */}
          <div className="inline-flex flex-col items-center gap-2 bg-[#0A1F44] px-10 py-5 rounded-3xl"
            style={{ boxShadow: "0 8px 28px rgba(10,31,68,0.25), 0 0 0 1px rgba(0,180,166,0.15)" }}>
            <span className="text-3xl leading-none" role="img" aria-label="Drapeau du Sénégal">🇸🇳</span>
            <p className="text-white font-bold text-base tracking-wide leading-none">ANAQ-Sup</p>
            <p className="text-[#00B4A6] text-[11px] font-semibold uppercase tracking-widest leading-none">Accrédité</p>
          </div>
        </div>

        {/* Cards — alignement parfait, même hauteur */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 md:items-stretch">
          {FORMATIONS.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.niveau}
                className="group rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-2 cursor-pointer flex flex-col"
                style={{
                  boxShadow: "0 4px 24px rgba(10,31,68,0.08), 0 0 0 1px rgba(10,31,68,0.06)",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    `0 24px 60px rgba(10,31,68,0.16), 0 0 0 2px ${f.accent}55`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    "0 4px 24px rgba(10,31,68,0.08), 0 0 0 1px rgba(10,31,68,0.06)";
                }}
              >
                {/* Top accent stripe */}
                <div
                  className="h-1 w-full"
                  style={{ background: `linear-gradient(90deg, ${f.accent}, ${f.accentDark}88)` }}
                />

                {/* ── Card header — hauteur identique pour les 3 cartes ── */}
                <div
                  className={`bg-gradient-to-br ${f.color} p-7 flex flex-col`}
                  style={{ minHeight: "240px" }}
                >
                  {/* Icon + badges niveau/durée uniquement (pas de badges variables) */}
                  <div className="flex items-start justify-between mb-5">
                    <div
                      className="rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{
                        width: "52px", height: "52px",
                        background: f.accent + "28",
                        boxShadow: `0 4px 16px ${f.accent}22`,
                      }}
                    >
                      <Icon className="w-6 h-6" style={{ color: f.accent }} />
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span
                        className="inline-block text-xs font-bold px-3 py-1 rounded-full"
                        style={{ background: f.accent + "33", color: f.accent }}
                      >
                        {f.badge}
                      </span>
                      <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl">
                        <Clock className="w-3.5 h-3.5 text-white/70" />
                        <span className="text-white/70 text-xs font-medium">{f.duree}</span>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-white text-2xl font-bold mb-3">{f.niveau}</h3>
                  {/* Description pousse vers le bas grâce à mt-auto */}
                  <p className="text-white/70 text-sm leading-relaxed mt-auto">{f.description}</p>
                </div>

                {/* ── Section blanche — badges variables + filières ── */}
                <div className="bg-white p-6 flex flex-col flex-1">

                  {/* Inscriptions ouvertes + élite badge (déplacés hors du header) */}
                  {(f.inscriptionOuverte || f.eliteBadge) && (
                    <div className="flex flex-col gap-2 mb-4">
                      {f.inscriptionOuverte && (
                        <span
                          className="self-start text-xs font-bold px-3 py-1.5 rounded-full text-white"
                          style={{
                            background: "linear-gradient(135deg, #00B4A6, #009183)",
                            boxShadow: "0 4px 12px rgba(0,180,166,0.35)",
                          }}
                        >
                          Inscriptions ouvertes
                        </span>
                      )}
                      {f.eliteBadge && (
                        <div
                          className="flex items-center gap-2 px-3 py-2 rounded-xl"
                          style={{
                            background: "rgba(0,180,166,0.10)",
                            border: "1px solid rgba(0,180,166,0.28)",
                          }}
                        >
                          <Award className="w-3.5 h-3.5 text-[#00B4A6] flex-shrink-0" />
                          <span className="text-[#00B4A6] text-[11px] font-bold leading-tight">{f.eliteBadge}</span>
                        </div>
                      )}
                    </div>
                  )}

                  <p className="text-[#0A1F44] text-xs font-bold uppercase tracking-widest mb-4">
                    Filières disponibles
                  </p>
                  <ul className="space-y-2.5 flex-1">
                    {f.filieres.map((fil) => (
                      <li key={fil} className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ background: "rgba(0,180,166,0.12)" }}
                          >
                            <ChevronRight className="w-3 h-3 text-[#00B4A6]" />
                          </div>
                          <span className="text-gray-700 text-sm truncate font-medium">{fil}</span>
                        </div>
                        <button
                          onClick={() => openDebouches(fil)}
                          className="flex-shrink-0 text-[10px] font-bold px-2.5 py-1 rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap"
                          style={{
                            color: "#00B4A6",
                            border: "1px solid rgba(0,180,166,0.35)",
                            background: "transparent",
                          }}
                          onMouseEnter={e => {
                            (e.currentTarget as HTMLButtonElement).style.background = "#00B4A6";
                            (e.currentTarget as HTMLButtonElement).style.color = "#fff";
                          }}
                          onMouseLeave={e => {
                            (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                            (e.currentTarget as HTMLButtonElement).style.color = "#00B4A6";
                          }}
                        >
                          Débouchés
                        </button>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#contact"
                    className="mt-6 w-full inline-flex items-center justify-center gap-2 text-white text-sm font-bold px-5 py-3.5 rounded-2xl transition-all duration-200 cursor-pointer min-h-[48px] hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                      background: "linear-gradient(135deg, #0A1F44, #1a3a6e)",
                      boxShadow: "0 4px 16px rgba(10,31,68,0.18)",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLAnchorElement).style.background = "linear-gradient(135deg, #00B4A6, #009183)";
                      (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 24px rgba(0,180,166,0.35)";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLAnchorElement).style.background = "linear-gradient(135deg, #0A1F44, #1a3a6e)";
                      (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 16px rgba(10,31,68,0.18)";
                    }}
                  >
                    Prendre rendez-vous
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {modal && (
        <DebouchesModal
          filiere={modal.filiere}
          jobs={modal.jobs}
          onClose={() => setModal(null)}
        />
      )}
    </section>
  );
}
