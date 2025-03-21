"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import MediaSection from "@/components/media-section";

export default function AdminPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <div className="py-4 px-4 bg-pink-50/50 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-pink-800">
              Administrar Contenido
            </h1>
            <Link href="/">
              <Button variant="ghost" className="flex items-center text-pink-600">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <MediaSection />

      <footer className="py-8 bg-pink-50/50 backdrop-blur-sm text-center mt-auto">
        <div className="container mx-auto px-4">
          <p className="text-gray-600">
            Aquí puedes subir fotos y música para personalizar la celebración
          </p>
        </div>
      </footer>
    </main>
  );
} 