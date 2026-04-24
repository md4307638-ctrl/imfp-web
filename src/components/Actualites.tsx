import { Calendar, ArrowRight } from "lucide-react";
import { urlFor } from "@/lib/sanity";

export interface Actualite {
  _id: string;
  titre: string;
  slug: { current: string };
  image?: { asset: { _ref: string }; alt?: string };
  extrait?: string;
  publishedAt?: string;
}

function formatDate(iso?: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function Actualites({ actualites }: { actualites?: Actualite[] }) {
  const items = actualites && actualites.length > 0 ? actualites : [];

  if (items.length === 0) return null;

  return (
    <section id="actualites" className="py-14 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="inline-block bg-[#E6F9F8] text-[#00B4A6] text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest mb-4">
              Actualités
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0A1F44]">
              Restez informé de{" "}
              <span className="text-[#00B4A6]">la vie de l&apos;IMFP</span>
            </h2>
          </div>
          <a
            href="/actualites"
            className="inline-flex items-center gap-2 text-[#00B4A6] font-semibold hover:gap-3 transition-all duration-200 cursor-pointer text-sm flex-shrink-0"
          >
            Toute l&apos;actualité <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((actu, i) => {
            /* BUG 1 FIX — Génération de l'URL image via @sanity/image-url */
            const imageUrl = actu.image?.asset
              ? urlFor(actu.image).width(800).height(400).fit("crop").auto("format").url()
              : null;

            return (
              <article
                key={actu._id}
                className={`bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group ${
                  i === 0 ? "sm:col-span-2 lg:col-span-1" : ""
                }`}
              >
                {/* Image ou placeholder gradient */}
                <div className="relative h-48 bg-gradient-to-br from-[#0A1F44] to-[#00B4A6] overflow-hidden">
                  {imageUrl ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={imageUrl}
                      alt={actu.image?.alt ?? actu.titre}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center opacity-20">
                      <div className="w-32 h-32 rounded-full border-4 border-white" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-[#00B4A6] text-white text-xs font-bold px-3 py-1 rounded-full">
                      Actualité
                    </span>
                  </div>
                </div>

                {/* Contenu */}
                <div className="p-6">
                  {actu.publishedAt && (
                    <div className="flex items-center gap-2 text-gray-400 text-xs mb-3">
                      <Calendar className="w-3.5 h-3.5" />
                      <time>{formatDate(actu.publishedAt)}</time>
                    </div>
                  )}
                  <h3 className="text-[#0A1F44] font-bold text-lg leading-snug mb-3 group-hover:text-[#00B4A6] transition-colors duration-200">
                    {actu.titre}
                  </h3>
                  {actu.extrait && (
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                      {actu.extrait}
                    </p>
                  )}

                  <a
                    href={`/actualites/${actu.slug.current}`}
                    className="mt-4 inline-flex items-center gap-1 text-[#00B4A6] text-sm font-semibold hover:gap-2 transition-all duration-200"
                  >
                    Lire la suite
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
