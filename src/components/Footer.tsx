import { GraduationCap, Phone, Mail, MapPin } from "lucide-react";

const SOCIAL = [
  {
    label: "Facebook",
    href: "#",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/imfp_edu?igsh=MXg0YnpsbXVha3VvaQ==",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#061530] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#00B4A6] flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-xl">IMFP</p>
                <p className="text-white/50 text-xs">Institut des Métiers et de la Formation Professionnelle</p>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-sm mb-4">
              Former les professionnels de demain, au cœur de l&apos;Afrique.
            </p>
            {/* ANAQ-Sup badge horizontal compact */}
            <div className="inline-flex items-center gap-3 bg-white/8 border border-white/10 px-4 py-2.5 rounded-xl"
              style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.2)" }}>
              <span className="text-lg leading-none flex-shrink-0" role="img" aria-label="Drapeau du Sénégal">🇸🇳</span>
              <div className="leading-tight">
                <p className="text-white font-bold text-xs leading-none">ANAQ-Sup</p>
                <p className="text-[#00B4A6] text-[10px] font-semibold uppercase tracking-widest leading-none mt-0.5">Accrédité · Dakar, Sénégal</p>
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-3 mt-6">
              {SOCIAL.map(({ svg, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#00B4A6] flex items-center justify-center transition-all duration-200 cursor-pointer"
                >
                  {svg}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <p className="text-white font-semibold text-sm uppercase tracking-widest mb-5">Navigation</p>
            <ul className="space-y-3">
              {["Accueil", "Formations", "Actualités", "À propos", "Contact"].map((l) => (
                <li key={l}>
                  <a
                    href={`#${l.toLowerCase().replace(/\s/g, "-").replace("é", "e").replace("à", "a")}`}
                    className="text-white/50 hover:text-[#00B4A6] text-sm transition-colors duration-200 cursor-pointer"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <p className="text-white font-semibold text-sm uppercase tracking-widest mb-5">Contact</p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-white/50 text-sm">
                <MapPin className="w-4 h-4 text-[#00B4A6] mt-0.5 flex-shrink-0" />
                Avenue Cheikh Anta Diop, Dakar
              </li>
              <li className="flex items-center gap-3 text-white/50 text-sm">
                <Phone className="w-4 h-4 text-[#00B4A6] flex-shrink-0" />
                +221 78 730 25 25
              </li>
              <li className="flex items-center gap-3 text-white/50 text-sm">
                <Mail className="w-4 h-4 text-[#00B4A6] flex-shrink-0" />
                contact@imfp.sn
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/30">
          <p>© {year} IMFP — Institut des Métiers et de la Formation Professionnelle. Tous droits réservés.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white/60 transition-colors cursor-pointer">Mentions légales</a>
            <a href="#" className="hover:text-white/60 transition-colors cursor-pointer">Politique de confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
