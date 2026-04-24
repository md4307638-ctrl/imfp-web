import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Formations from "@/components/Formations";
import Actualites from "@/components/Actualites";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { sanityClient } from "@/lib/sanity";
import { ACTUALITES_QUERY } from "@/lib/queries";

export const revalidate = 60; // Revalide les données toutes les 60 secondes

export default async function Home() {
  const actualites = await sanityClient.fetch(ACTUALITES_QUERY);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Formations />
        <Actualites actualites={actualites} />
        <About />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
