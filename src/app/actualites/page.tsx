import Link from "next/link";
import { ArrowRight, Calendar, ArrowLeft } from "lucide-react";
import { sanityClient } from "@/lib/sanity";
import { ACTUALITES_QUERY } from "@/lib/queries";
import { urlFor } from "@/lib/sanity";
import type { Actualite } from "@/components/Actualites";

export const revalidate = 60;

export const metadata = {
  title: "Actualités",
  description: "Toutes les actualités de l'IMFP – Institut des Métiers et de la Formation Professionnelle, Dakar.",
};

function formatDate(iso?: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric", month: "long", year: "numeric",
  });
}

export default async function ActualitesPage() {
  const actualites: Actualite[] = await sanityClient.fetch(ACTUALITES_QUERY);

  return (
    <>
      {/* Header */}
      <div className="bg-[#0A1F44] pt-24 pb-14 px-4">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/#actualites"
            className="inline-flex items-center gap-2 text-white/50 hover:text-[#00B4A6] text-sm mb-6 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" /> Retour au site
          </Link>
          <span className="inline-block bg-[#00B4A6]/20 text-[#00B4A6] text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest mb-4">
            Actualités
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white">
            Toute l&apos;<span className="text-[#00B4A6]">actualité IMFP</span>
          </h1>
        </div>
      </div>

      {/* Grille */}
      <main className="bg-gray-50 py-14 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {actualites.length === 0 ? (
            <p className="text-gray-400 text-center py-20">Aucune actualité pour le moment.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {actualites.map((actu) => {
                const imageUrl = actu.image?.asset
                  ? urlFor(actu.image).width(800).height(400).fit("crop").auto("format").url()
                  : null;

                return (
                  <article
                    key={actu._id}
                    className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                  >
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

                    <div className="p-6">
                      {actu.publishedAt && (
                        <div className="flex items-center gap-2 text-gray-400 text-xs mb-3">
                          <Calendar className="w-3.5 h-3.5" />
                          <time>{formatDate(actu.publishedAt)}</time>
                        </div>
                      )}
                      <h2 className="text-[#0A1F44] font-bold text-lg leading-snug mb-3 group-hover:text-[#00B4A6] transition-colors duration-200">
                        {actu.titre}
                      </h2>
                      {actu.extrait && (
                        <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-4">
                          {actu.extrait}
                        </p>
                      )}
                      <Link
                        href={`/actualites/${actu.slug.current}`}
                        className="inline-flex items-center gap-1 text-[#00B4A6] text-sm font-semibold hover:gap-2 transition-all duration-200"
                      >
                        Lire la suite <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
