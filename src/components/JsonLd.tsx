export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "EducationalOrganization",
        "@id": "https://www.imfp.com/#organization",
        name: "IMFP – Institut des Métiers et de la Formation Professionnelle",
        alternateName: "IMFP",
        url: "https://www.imfp.com",
        logo: {
          "@type": "ImageObject",
          url: "https://www.imfp.com/logo.png",
          width: 200,
          height: 200,
        },
        description:
          "L'IMFP est un établissement d'enseignement supérieur privé à Dakar, accrédité ANAQ-Sup, proposant des BTS, Licences Professionnelles et Masters Professionnels.",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Sacré-Cœur 2, en face arrêt BRT, Villa N° 8602/B",
          addressLocality: "Dakar",
          addressCountry: "SN",
          addressRegion: "Dakar",
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: "+221787302525",
            contactType: "customer service",
            availableLanguage: ["French"],
          },
          {
            "@type": "ContactPoint",
            telephone: "+221787322424",
            contactType: "customer service",
            availableLanguage: ["French"],
          },
        ],
        email: "contact@imfp.com",
        sameAs: [
          "https://www.imfp.com",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Formations IMFP",
          itemListElement: [
            {
              "@type": "Course",
              name: "BTS – Brevet de Technicien Supérieur",
              description: "Formation de 2 ans (Bac +2) dans les filières : Comptabilité, Marketing, Informatique, RH, Commerce International.",
              provider: { "@id": "https://www.imfp.com/#organization" },
              timeRequired: "P2Y",
              educationalLevel: "Bac +2",
            },
            {
              "@type": "Course",
              name: "Licence Professionnelle",
              description: "Formation de 1 an (Bac +3) en Management, Finance, Systèmes d'Information, Logistique, Droit des Affaires.",
              provider: { "@id": "https://www.imfp.com/#organization" },
              timeRequired: "P1Y",
              educationalLevel: "Bac +3",
            },
            {
              "@type": "Course",
              name: "Master Professionnel",
              description: "Formation de 2 ans (Bac +5) en Management Stratégique, Audit, Ingénierie des Systèmes, Marketing Digital, Gestion de Projet.",
              provider: { "@id": "https://www.imfp.com/#organization" },
              timeRequired: "P2Y",
              educationalLevel: "Bac +5",
            },
          ],
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://www.imfp.com/#website",
        url: "https://www.imfp.com",
        name: "IMFP Dakar",
        description: "Site officiel de l'Institut des Métiers et de la Formation Professionnelle",
        inLanguage: "fr-SN",
        publisher: { "@id": "https://www.imfp.com/#organization" },
      },
      {
        "@type": "WebPage",
        "@id": "https://www.imfp.com/#webpage",
        url: "https://www.imfp.com",
        name: "IMFP – Institut des Métiers et de la Formation Professionnelle | Dakar",
        isPartOf: { "@id": "https://www.imfp.com/#website" },
        about: { "@id": "https://www.imfp.com/#organization" },
        inLanguage: "fr-SN",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
