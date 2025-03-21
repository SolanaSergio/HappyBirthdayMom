"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { HeartHandshake, Sparkles, Star } from "lucide-react";
import { cn } from "@/lib/utils";

// Beautiful messages for mom in Spanish
const messages = [
  "Tu amor incondicional me ha hecho ser quien soy.",
  "Gracias por guiarme siempre con tu luz y sabiduría.",
  "Eres el corazón de nuestra familia, la fuerza que nos une.",
  "Tus abrazos tienen el poder de arreglar cualquier problema.",
  "Tu sonrisa ilumina hasta el día más oscuro.",
  "Cada día agradezco al cielo por tenerte como madre.",
  "Eres mi ejemplo, mi guía y mi mejor amiga.",
  "No hay palabras suficientes para agradecerte todo lo que has hecho por mí.",
  "Tu paciencia y dedicación me han enseñado el verdadero significado del amor.",
];

export default function BirthdayWishes() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Mark as client-side rendered
    setIsClient(true);

    const interval = setInterval(() => {
      setFadeIn(false);

      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
        setFadeIn(true);
      }, 1000);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  // Decorative elements that float around
  const FloatingElement = ({ className, icon, delay }: { className: string, icon: React.ReactNode, delay: string }) => (
    <div
      className={cn(
        "absolute opacity-70 text-pink-300",
        className
      )}
      style={{
        animation: `float 15s ease-in-out infinite ${delay}`
      }}
    >
      {icon}
    </div>
  );

  // Simple server-side content to prevent hydration errors
  if (!isClient) {
    return (
      <section className="py-12 md:py-16 overflow-hidden relative">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="border-pink-100 bg-gradient-to-r from-pink-50 to-white shadow-md relative overflow-hidden">
            <CardContent className="pt-10 px-6 pb-10 text-center relative z-10">
              <div className="mb-6">
                <h2 className="text-2xl md:text-3xl text-pink-600 font-medium mb-6">Querida Mamá</h2>

                <div className="min-h-[110px] flex items-center justify-center">
                  <p className="text-lg md:text-xl text-gray-700 italic">
                    Cargando mensaje...
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16 overflow-hidden relative">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card className="border-pink-100 bg-gradient-to-r from-pink-50 to-white shadow-md relative overflow-hidden">
          <CardContent className="pt-10 px-6 pb-10 text-center relative z-10">
            {/* Decorative elements */}
            <FloatingElement
              className="top-4 left-6"
              icon={<Sparkles className="h-5 w-5" />}
              delay="0s"
            />
            <FloatingElement
              className="bottom-6 right-8"
              icon={<Star className="h-6 w-6" />}
              delay="2s"
            />
            <FloatingElement
              className="top-12 right-10"
              icon={<HeartHandshake className="h-5 w-5" />}
              delay="5s"
            />

            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl text-pink-600 font-medium mb-6">Querida Mamá</h2>

              <div className="min-h-[110px] flex items-center justify-center">
                <p
                  className={cn(
                    "text-lg md:text-xl text-gray-700 italic transition-opacity duration-1000",
                    fadeIn ? "opacity-100" : "opacity-0"
                  )}
                >
                  "{messages[currentIndex]}"
                </p>
              </div>
            </div>

            <div className="text-center">
              <p className="text-base text-gray-600 mb-2">
                En tu cumpleaños, quiero que sepas lo especial que eres para mí.
              </p>
              <p className="text-base text-gray-600">
                Gracias por tu amor, tu paciencia y tu fortaleza.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
