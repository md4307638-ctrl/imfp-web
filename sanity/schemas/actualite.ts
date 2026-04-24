import { defineField, defineType } from "sanity";

export const actualiteType = defineType({
  name: "actualite",
  title: "Actualité",
  type: "document",
  fields: [
    defineField({
      name: "titre",
      title: "Titre",
      type: "string",
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "titre", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image principale",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Texte alternatif", type: "string" }),
      ],
    }),
    defineField({
      name: "extrait",
      title: "Extrait / Résumé",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: "contenu",
      title: "Contenu complet",
      type: "array",
      of: [{ type: "block" }, { type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "publishedAt",
      title: "Date de publication",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: { title: "titre", media: "image", subtitle: "publishedAt" },
  },
});
