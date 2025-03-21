"use client";

import { Card } from "@/components/ui/card";
import { Heart } from "lucide-react";

export default function MemoryQuote() {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex flex-col items-center">
          <div className="relative mb-8">
            <Heart className="h-10 w-10 text-pink-200 absolute -top-1 -left-1 animate-heartbeat" />
            <Heart className="h-12 w-12 text-pink-400 animate-heartbeat" style={{ animationDelay: "0.5s" }} />
          </div>

          <blockquote className="text-center">
            <p className="text-2xl md:text-3xl font-light italic text-gray-700 mb-6 relative">
              <span className="absolute -top-6 -left-4 text-5xl text-pink-200">"</span>
              Una madre es aquella que puede tomar el lugar de todos, pero cuyo lugar nadie puede tomar.
              <span className="absolute -bottom-6 -right-4 text-5xl text-pink-200">"</span>
            </p>
            <footer className="text-gray-500">
              <cite>— Cardlinal Mermillod</cite>
            </footer>
          </blockquote>

          <div className="mt-12 w-full max-w-xl">
            <Card className="bg-gradient-to-r from-pink-50 to-white p-6 text-center border-pink-100 shadow-sm">
              <p className="text-gray-700">
                Gracias por ser mi guía, mi apoyo y mi mejor amiga.
                Tu amor ha sido la luz que ilumina mi camino todos los días.
              </p>
              <p className="mt-4 text-pink-600 font-medium">
                Con todo mi amor, en tu día especial.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
