import { Target, Eye, Shield, TrendingUp } from "lucide-react";

const VALUES = [
  {
    icon: Target,
    title: "Excellence",
    desc: "Des programmes rigoureux alignés sur les standards internationaux et les besoins du marché africain.",
  },
  {
    icon: Eye,
    title: "Innovation",
    desc: "Des méthodes pédagogiques modernes intégrant le numérique et les outils de demain.",
  },
  {
    icon: Shield,
    title: "Intégrité",
    desc: "Une institution transparente, engagée pour l'épanouissement de chaque étudiant.",
  },
  {
    icon: TrendingUp,
    title: "Employabilité",
    desc: "Un réseau de 200+ entreprises partenaires pour garantir votre insertion professionnelle.",
  },
];

export default function About() {
  return (
    <section id="a-propos" className="py-14 md:py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header centré */}
        <div className="text-center mb-12">
          <span className="inline-block bg-[#E6F9F8] text-[#00B4A6] text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest mb-4">
            À propos de l&apos;IMFP
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0A1F44] mb-6 leading-tight">
            Former les{" "}
            <span className="text-[#00B4A6]">leaders africains</span>{" "}
            de demain
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed mb-4 max-w-2xl mx-auto">
            Fondé à Dakar, l&apos;Institut des Métiers et de la Formation Professionnelle (IMFP)
            est un établissement d&apos;enseignement supérieur privé reconnu par l&apos;État sénégalais
            et accrédité par l&apos;ANAQ-Sup.
          </p>
          <p className="text-gray-500 leading-relaxed max-w-2xl mx-auto">
            Notre mission : offrir une formation professionnelle de qualité, ancrée dans les réalités
            du marché, pour préparer nos étudiants à exceller dans leurs carrières au Sénégal et à l&apos;international.
          </p>
        </div>

        {/* Values grid — 4 colonnes sur desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {VALUES.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="flex flex-col gap-3 p-5 rounded-2xl bg-gray-50 hover:bg-[#E6F9F8] transition-colors duration-200 cursor-default"
            >
              <div className="w-10 h-10 rounded-xl bg-[#00B4A6]/15 flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-[#00B4A6]" />
              </div>
              <div>
                <p className="text-[#0A1F44] font-semibold text-sm mb-1">{title}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
