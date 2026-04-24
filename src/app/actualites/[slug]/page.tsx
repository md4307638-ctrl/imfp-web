import { notFound } from "next/navigation";
import { sanityClient } from "@/lib/sanity";
import { ACTUALITE_BY_SLUG_QUERY, ACTUALITES_QUERY } from "@/lib/queries";
import SingleArticle from "@/components/SingleArticle";
import type { Actualite } from "@/components/Actualites";

export const revalidate = 60;

export async function generateStaticParams() {
  const actualites: Actualite[] = await sanityClient.fetch(ACTUALITES_QUERY);
  return actualites.map((a) => ({ slug: a.slug.current }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const actu = await sanityClient.fetch(ACTUALITE_BY_SLUG_QUERY, { slug });
  if (!actu) return { title: "Article introuvable" };
  return {
    title: actu.titre,
    description: actu.extrait ?? `Actualité IMFP : ${actu.titre}`,
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const actu = await sanityClient.fetch(ACTUALITE_BY_SLUG_QUERY, { slug });
  if (!actu) notFound();

  return <SingleArticle article={actu} />;
}
