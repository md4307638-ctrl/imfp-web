import { groq } from "next-sanity";

export const ACTUALITES_QUERY = groq`
  *[_type == "actualite"] | order(publishedAt desc) {
    _id,
    titre,
    slug,
    image,
    extrait,
    publishedAt
  }
`;

export const ACTUALITE_BY_SLUG_QUERY = groq`
  *[_type == "actualite" && slug.current == $slug][0] {
    _id,
    titre,
    slug,
    image,
    extrait,
    contenu,
    publishedAt
  }
`;
