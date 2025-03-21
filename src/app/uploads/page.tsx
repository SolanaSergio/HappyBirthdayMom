"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import MediaSection from "@/components/media-section";

export default function UploadsPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <div className="py-4 px-4 bg-pink-50">
        <div className="container mx-auto max-w-6xl">
          <Link href="/">
            <Button variant="ghost" className="flex items-center text-pink-600">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver a la página principal
            </Button>
          </Link>
        </div>
      </div>

      <MediaSection />

      <footer className="py-8 bg-pink-50 text-center mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center">
            <p className="text-gray-600">
              Sube tus fotos y música favoritas para crear una experiencia especial
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
