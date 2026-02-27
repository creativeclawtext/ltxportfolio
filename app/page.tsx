import dynamic from "next/dynamic";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { AiVideos } from "@/components/ai-videos";

const BrandSocial = dynamic(() => import("@/components/brand-social").then(m => ({ default: m.BrandSocial })));
const AiPortfolio = dynamic(() => import("@/components/ai-portfolio").then(m => ({ default: m.AiPortfolio })));
const FilmBroadcast = dynamic(() => import("@/components/film-broadcast").then(m => ({ default: m.FilmBroadcast })));
const Footer = dynamic(() => import("@/components/footer").then(m => ({ default: m.Footer })));

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <AiVideos />
        <BrandSocial />
        <AiPortfolio />
        <FilmBroadcast />
      </main>
      <Footer />
    </>
  );
}
