"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Cake, Gift, Heart, PartyPopper } from "lucide-react";
import confetti from "canvas-confetti";
import Image from "next/image";

export default function Hero() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Mark as client-side rendered first in a separate effect
  useEffect(() => {
    setIsClient(true);
    // Check if it's a mobile device
    setIsMobile(window.innerWidth < 768);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle initial confetti separately
  useEffect(() => {
    if (!isClient) return;

    // Only show intro confetti on desktop to avoid mobile performance issues
    if (!isMobile) {
      const timer = setTimeout(() => {
        setShowConfetti(true);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [isClient, isMobile]);

  useEffect(() => {
    if (!isClient || !showConfetti || isMobile) return;

    try {
      // Wrap in setTimeout to ensure DOM is fully loaded
      setTimeout(() => {
        const end = Date.now() + 3 * 1000;

        const runConfetti = () => {
          // Reduced particle count for better performance
          confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ["#FF1493", "#FF69B4", "#FFB6C1"]
          });

          confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ["#FF1493", "#FF69B4", "#FFB6C1"]
          });

          if (Date.now() < end) {
            requestAnimationFrame(runConfetti);
          }
        };

        runConfetti();
      }, 100);
    } catch (error) {
      console.error("Confetti error:", error);
    }
  }, [showConfetti, isClient, isMobile]);

  const triggerConfetti = () => {
    if (!isClient) return;

    try {
      // Always allow manual confetti, but reduce amount on mobile
      confetti({
        particleCount: isMobile ? 50 : 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (error) {
      console.error("Confetti trigger error:", error);
    }
  };

  // Simple server-side content to prevent hydration errors
  if (!isClient) {
    return (
      <section className="relative pt-16 pb-12 md:pt-32 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-pink-100 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <div className="mb-6 inline-block relative">
                <PartyPopper className="h-16 w-16 text-pink-500" />
              </div>

              <h1 className="text-4xl md:text-6xl font-bold text-pink-600 mb-6">
                ¡Feliz Cumpleaños Mamá!
              </h1>

              <p className="text-xl md:text-2xl text-gray-700 max-w-xl mb-8">
                En tu día especial, quiero celebrar todo el amor, cariño y dedicación que siempre nos has dado.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative pt-16 pb-12 md:pt-32 md:pb-28 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-pink-100 to-transparent"></div>
        <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-pink-100 opacity-50 blur-3xl"></div>
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-pink-200 opacity-50 blur-3xl"></div>

        {/* Decorative elements - hide some on mobile for better performance */}
        {!isMobile && (
          <>
            <div className="absolute top-1/4 right-[15%] h-6 w-6 rounded-full bg-pink-300 opacity-40"></div>
            <div className="absolute top-1/3 left-[20%] h-4 w-4 rounded-full bg-pink-400 opacity-30"></div>
            <div className="absolute bottom-1/4 right-[30%] h-5 w-5 rounded-full bg-pink-200 opacity-50"></div>
          </>
        )}
      </div>

      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <div className="mb-6 inline-block relative">
              <PartyPopper className="h-12 w-12 md:h-16 md:w-16 text-pink-500" />
              <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-pink-300 animate-ping"></span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-pink-600 mb-4 md:mb-6">
              ¡Feliz Cumpleaños Mamá!
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-gray-700 max-w-xl mb-6 md:mb-8">
              En tu día especial, quiero celebrar todo el amor, cariño y dedicación que siempre nos has dado.
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-4 mb-6 md:mb-8">
              <div className="flex items-center bg-pink-50 p-2 md:p-3 rounded-lg shadow-sm">
                <Heart className="h-4 w-4 md:h-5 md:w-5 text-pink-500 mr-2" />
                <span className="text-sm md:text-base text-pink-700">Con mucho amor</span>
              </div>

              <div className="flex items-center bg-pink-50 p-2 md:p-3 rounded-lg shadow-sm">
                <Cake className="h-4 w-4 md:h-5 md:w-5 text-pink-500 mr-2" />
                <span className="text-sm md:text-base text-pink-700">En tu día especial</span>
              </div>

              <div className="flex items-center bg-pink-50 p-2 md:p-3 rounded-lg shadow-sm">
                <Gift className="h-4 w-4 md:h-5 md:w-5 text-pink-500 mr-2" />
                <span className="text-sm md:text-base text-pink-700">Lleno de sorpresas</span>
              </div>
            </div>

            <Button
              size={isMobile ? "default" : "lg"}
              className="bg-pink-600 hover:bg-pink-700 text-white shadow-lg"
              onClick={triggerConfetti}
            >
              <PartyPopper className="mr-2 h-4 w-4 md:h-5 md:w-5" />
              ¡Celebremos!
            </Button>
          </div>

          {/* Image frame - show a mobile version for small screens */}
          {isMobile ? (
            <div className="flex justify-center mt-8">
              <div className="relative w-48 h-64 rounded-lg overflow-hidden shadow-md transform rotate-2 photo-frame">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-pink-300 flex items-center justify-center">
                  <Heart className="h-16 w-16 text-white opacity-70" />
                </div>
                <div className="absolute inset-0 border-4 border-white rounded-lg"></div>
              </div>
            </div>
          ) : (
            <div className="hidden md:flex justify-center">
              <div className="relative w-72 h-80 rounded-lg overflow-hidden shadow-xl transform rotate-3 photo-frame">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-pink-300 flex items-center justify-center">
                  <Heart className="h-24 w-24 text-white opacity-70" />
                </div>
                <div className="absolute inset-0 border-8 border-white rounded-lg"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
