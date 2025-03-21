import { Suspense } from "react";
import Hero from "@/components/hero";
import BirthdayWishes from "@/components/birthday-wishes";
import BirthdayCountdown from "@/components/birthday-countdown";
import PhotoMemories from "@/components/photo-memories";
import MemoryQuote from "@/components/memory-quote";
import Footer from "@/components/footer";
import NavMenu from "@/components/nav-menu";
import BackgroundMusic from "@/components/background-music";

// Simple loading fallback
function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-pink-500 text-lg animate-pulse">
        Cargando...
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <NavMenu />

      {/* Wrap component that might cause issues in Suspense */}
      <Suspense fallback={<Loading />}>
        <BackgroundMusic />
      </Suspense>

      <Suspense fallback={<Loading />}>
        <Hero />
      </Suspense>

      <Suspense fallback={<div className="h-24" />}>
        <BirthdayCountdown />
      </Suspense>

      <Suspense fallback={<div className="h-24" />}>
        <BirthdayWishes />
      </Suspense>

      <Suspense fallback={<div className="h-24" />}>
        <MemoryQuote />
      </Suspense>

      <Suspense fallback={<div className="h-40" />}>
        <PhotoMemories />
      </Suspense>

      <Suspense fallback={<div className="h-24" />}>
        <Footer />
      </Suspense>
    </main>
  );
}
