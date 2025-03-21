"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useFiles } from "@/context/file-context";
import { Camera, ImageIcon, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";

export default function PhotoMemories() {
  const { images } = useFiles();
  const [viewingImage, setViewingImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Mark when component is mounted on client
  useEffect(() => {
    setIsClient(true);
    setIsMobile(window.innerWidth < 768);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Set images loaded status when we have images and are on client
  useEffect(() => {
    if (isClient && images.length > 0) {
      setImagesLoaded(true);
    }
  }, [isClient, images.length]);

  // Automatically rotate through images - slower on mobile
  useEffect(() => {
    if (!isClient || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, isMobile ? 7000 : 5000); // Slower rotation on mobile

    return () => clearInterval(interval);
  }, [images.length, isClient, isMobile]);

  // Make sure currentIndex is valid
  useEffect(() => {
    if (currentIndex >= images.length && images.length > 0) {
      setCurrentIndex(0);
    }
  }, [currentIndex, images.length]);

  // If not yet mounted on client, show a loading state
  if (!isClient) {
    return (
      <section className="py-6 md:py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-xl md:text-2xl text-center text-pink-600 font-medium mb-4 md:mb-6">
            Momentos Especiales
          </h2>

          <Card className="text-center p-4 md:p-8">
            <CardContent className="pt-4 md:pt-6 px-2 md:px-4 flex flex-col items-center">
              <p className="text-gray-600">Cargando recuerdos...</p>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  if (images.length === 0) {
    return (
      <section className="py-6 md:py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-xl md:text-2xl text-center text-pink-600 font-medium mb-4 md:mb-6">
            Momentos Especiales
          </h2>

          <Card className="text-center p-4 md:p-8 border-dashed border-pink-200">
            <CardContent className="pt-4 md:pt-6 px-2 md:px-4 flex flex-col items-center">
              <Camera className="h-10 w-10 md:h-12 md:w-12 text-pink-300 mb-3 md:mb-4" />
              <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
                Aún no hay fotos para mostrar. ¡Agrega algunas para crear recuerdos especiales!
              </p>
              <Link href="/uploads">
                <Button variant="outline" className="border-pink-200 text-pink-600 hover:bg-pink-50">
                  <ImageIcon className="mr-2 h-4 w-4" />
                  Subir Fotos
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  // Get safe current image index
  const safeCurrentIndex = Math.min(currentIndex, images.length - 1);

  return (
    <section className="py-6 md:py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-xl md:text-2xl text-center text-pink-600 font-medium mb-4 md:mb-6">
          Momentos Especiales
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
          {images.length > 0 && (
            <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex justify-center">
              <Card className="relative overflow-hidden w-full max-w-3xl shadow-lg">
                <div className="relative aspect-[4/3] md:aspect-[16/9] overflow-hidden">
                  <Image
                    src={images[safeCurrentIndex].url}
                    alt="Recuerdo especial"
                    fill
                    style={{ objectFit: "cover" }}
                    className="transition-transform duration-3000 hover:scale-105"
                    onClick={() => setViewingImage(images[safeCurrentIndex].url)}
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent flex items-end">
                    <div className="p-3 md:p-4 text-white">
                      <p className="text-sm md:text-base font-medium drop-shadow-md">
                        Recuerdos que atesoramos
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Show fewer images on mobile */}
          {images.slice(0, isMobile ? 4 : 6).map((image, index) => (
            index !== safeCurrentIndex && (
              <Card
                key={image.id}
                className="overflow-hidden cursor-pointer transform transition hover:scale-[1.02]"
                onClick={() => setViewingImage(image.url)}
              >
                <div className="relative aspect-square">
                  <Image
                    src={image.url}
                    alt={`Foto ${index + 1}`}
                    fill
                    style={{ objectFit: "cover" }}
                    loading="lazy"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  />
                </div>
              </Card>
            )
          ))}
        </div>

        {images.length > (isMobile ? 4 : 6) && (
          <div className="mt-4 text-center">
            <Link href="/uploads">
              <Button size={isMobile ? "sm" : "default"} className="bg-pink-600 hover:bg-pink-700 text-white">
                Ver todas las fotos ({images.length})
              </Button>
            </Link>
          </div>
        )}
      </div>

      <Dialog open={!!viewingImage} onOpenChange={() => setViewingImage(null)}>
        <DialogContent className={`max-w-5xl p-0 ${isMobile ? "w-[95vw] mx-auto rounded-lg overflow-hidden" : ""}`}>
          {viewingImage && (
            <div className="relative w-full h-[70vh] md:h-[80vh]">
              <DialogClose className="absolute right-2 top-2 z-10 rounded-full bg-black/40 p-2 text-white">
                <X className="h-4 w-4" />
              </DialogClose>
              <Image
                src={viewingImage}
                alt="Foto ampliada"
                fill
                style={{ objectFit: "contain" }}
                priority
                sizes="(max-width: 768px) 95vw, 80vw"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
