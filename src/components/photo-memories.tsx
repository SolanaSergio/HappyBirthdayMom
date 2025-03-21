"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { useFiles } from "@/context/file-context";
import { ImageIcon } from "lucide-react";
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
    }, isMobile ? 7000 : 5000);

    return () => clearInterval(interval);
  }, [images.length, isClient, isMobile]);

  if (!isClient) return null;

  if (images.length === 0) {
    return (
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <Card className="p-8 text-center bg-pink-50/50 backdrop-blur-sm">
            <ImageIcon className="h-12 w-12 mx-auto mb-4 text-pink-300" />
            <p className="text-pink-800">
              Pronto habrá fotos especiales aquí...
            </p>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <Card
              key={image.url}
              className="group relative aspect-[4/3] overflow-hidden cursor-pointer photo-frame"
              onClick={() => setViewingImage(image.url)}
            >
              <Image
                src={image.url}
                alt={image.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Card>
          ))}
        </div>

        <Dialog open={!!viewingImage} onOpenChange={() => setViewingImage(null)}>
          <DialogContent className="max-w-4xl bg-black/95 border-none p-0">
            <DialogClose className="absolute right-4 top-4 text-white hover:text-white/80" />
            {viewingImage && (
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={viewingImage}
                  alt="Foto ampliada"
                  fill
                  className="object-contain"
                />
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
