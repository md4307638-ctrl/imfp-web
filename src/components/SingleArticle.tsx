import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/lib/sanity";

/* ════════════════════════════════════════════════════════════════
   TYPES
════════════════════════════════════════════════════════════════ */
interface SanitySpan {
  _type: "span";
  text?: string;
  marks?: string[];
}

interface SanityBlock {
  _type: string;
  style?: string;
  children?: SanitySpan[];
  listItem?: string;
  [key: string]: unknown;
}

export interface ArticleData {
  titre: string;
  extrait?: string;
  contenu?: SanityBlock[];
  publishedAt?: string;
  image?: { asset: { _ref: string }; alt?: string };
}

/* ════════════════════════════════════════════════════════════════
   UTILITAIRES
════════════════════════════════════════════════════════════════ */
function clean(text: string): string {
  return text
    .replace(/\[\d{1,2}:\d{2}(?::\d{2})?,?\s*\d{2}\/\d{2}\/\d{4}\]/g, "")
    .replace(/^MAD\s*:\s*/gim, "")
    .replace(/^\[.*?\]\s*/gm, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function blockToText(block: SanityBlock): string {
  return (block.children ?? [])
    .filter((s) => s._type === "span")
    .map((s) => s.text ?? "")
    .join("");
}

function looksLikeList(text: string): boolean {
  const items = text.split(/[,\n•\-]/).map((s) => s.trim()).filter(Boolean);
  return items.length >= 3 && items.every((s) => s.length < 80);
}

function formatDate(iso?: string): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric", month: "long", year: "numeric",
  });
}

/* ════════════════════════════════════════════════════════════════
   FILIÈRES — grille 2 colonnes
════════════════════════════════════════════════════════════════ */
function FiliereGrid({ text }: { text: string }) {
  const items = text.split(/[,\n•\-]/).map((s) => clean(s)).filter(Boolean);
  return (
    <ul className="grid grid-cols-2 gap-x-8 gap-y-3 my-6">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full flex-shrink-0 bg-[#00B4A6]" />
          <span className="text-slate-700 text-base font-medium">{item}</span>
        </li>
      ))}
    </ul>
  );
}

/* ════════════════════════════════════════════════════════════════
   PORTABLE TEXT — RENDERERS
════════════════════════════════════════════════════════════════ */
const ptComponents = {
  block: {
    normal: ({ children, value }: { children?: React.ReactNode; value: SanityBlock }) => {
      const raw = clean(blockToText(value));
      if (!raw) return null;
      if (looksLikeList(raw)) return <FiliereGrid text={raw} />;
      return <p className="text-lg text-slate-600 leading-relaxed mb-5">{children}</p>;
    },
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-2xl font-bold text-[#0A1F44] mt-10 mb-3 pb-2 border-b border-slate-100">
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-xl font-bold text-[#0A1F44] mt-8 mb-2">{children}</h3>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-[#00B4A6] pl-5 italic text-slate-500 text-lg my-6">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="grid grid-cols-2 gap-x-8 gap-y-3 my-6">{children}</ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol className="space-y-2 my-5 list-decimal list-inside text-slate-600 text-lg">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li className="flex items-center gap-3 text-slate-700 text-base font-medium">
        <span className="w-2 h-2 rounded-full flex-shrink-0 bg-[#00B4A6]" />
        <span>{children}</span>
      </li>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <li className="text-slate-600 text-lg leading-relaxed">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-bold text-[#0A1F44]">{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em className="italic text-slate-500">{children}</em>
    ),
    link: ({ value, children }: { value?: { href?: string }; children?: React.ReactNode }) => (
      <a
        href={value?.href ?? "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#00B4A6] underline underline-offset-2 hover:text-[#009183] transition-colors"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }: { value: NonNullable<ArticleData["image"]> & { caption?: string } }) => {
      if (!value?.asset) return null;
      const src = urlFor(value).width(800).auto("format").url();
      return (
        <figure className="my-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={value.alt ?? ""} className="w-full rounded-2xl object-cover shadow-md" />
          {value.caption && (
            <figcaption className="text-center text-slate-400 text-sm mt-3 italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

/* ════════════════════════════════════════════════════════════════
   COMPOSANT PRINCIPAL
════════════════════════════════════════════════════════════════ */
export default function SingleArticle({ article }: { article: ArticleData }) {
  const coverUrl = article.image?.asset
    ? urlFor(article.image).width(1200).height(675).fit("crop").auto("format").url()
    : null;

  return (
    <div className="min-h-screen bg-white">

      {/* ── Navbar offset + lien retour ── */}
      <div className="bg-[#0A1F44]" style={{ paddingTop: "72px" }}>
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link
            href="/actualites"
            className="inline-flex items-center gap-2 text-white/50 hover:text-[#00B4A6] text-sm transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Toute l&apos;actualité
          </Link>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          CONTENEUR PRINCIPAL — max-w-4xl, centré, padding généreux
      ══════════════════════════════════════════════════════════ */}
      <main className="max-w-4xl mx-auto px-4 py-8">

        {/* ── Image de couverture ── */}
        {coverUrl && (
          <div className="w-full mb-8 overflow-hidden rounded-2xl shadow-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={coverUrl}
              alt={article.image?.alt ?? article.titre}
              className="w-full h-[400px] object-cover object-center"
            />
          </div>
        )}

        {/* ── En-tête de l'article ── */}
        <div className="space-y-4 mb-10">

          {/* Badge catégorie */}
          <span className="inline-block bg-[#E6F9F8] text-[#00B4A6] px-3 py-1 rounded-full text-sm font-semibold">
            Actualité
          </span>

          {/* Titre */}
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
            {clean(article.titre)}
          </h1>

          {/* Trait de soulignement turquoise */}
          <div className="h-1 w-20 rounded bg-[#00B4A6]" />

          {/* Date */}
          {article.publishedAt && (
            <div className="flex items-center gap-2 text-slate-400 text-sm pt-1">
              <Calendar className="w-4 h-4" />
              <time>{formatDate(article.publishedAt)}</time>
            </div>
          )}

          {/* Extrait */}
          {article.extrait && (
            <p className="text-lg text-slate-600 leading-relaxed pt-2 border-l-4 border-[#00B4A6] pl-4">
              {clean(article.extrait)}
            </p>
          )}
        </div>

        {/* ── Corps Portable Text ── */}
        {article.contenu && article.contenu.length > 0 ? (
          <div className="space-y-1">
            <PortableText value={article.contenu} components={ptComponents} />
          </div>
        ) : (
          <p className="text-slate-400 italic text-center py-16">
            Contenu complet à venir.
          </p>
        )}

        {/* ── Bouton retour — seul élément en bas ── */}
        <div className="mt-16 pt-8 border-t border-slate-100 flex justify-center">
          <Link
            href="/actualites"
            className="inline-flex items-center gap-2 border border-slate-200 hover:border-[#00B4A6] hover:text-[#00B4A6] text-slate-700 font-semibold px-7 py-3 rounded-xl transition-all duration-200 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux actualités
          </Link>
        </div>
      </main>
    </div>
  );
}
