"use client";

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function PhotoMemories() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const photos = [
    {
      src: "/images/photo1.jpeg",
      alt: "Foto especial 1",
      className: "col-span-2 aspect-[4/3] object-cover rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
    },
    {
      src: "/images/photo2.jpeg",
      alt: "Foto especial 2",
      className: "col-span-1 aspect-square object-cover rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
    },
    {
      src: "/images/photo3.png",
      alt: "Foto especial 3",
      className: "col-span-1 aspect-square object-cover rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
    }
  ];

  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-pink-600 mb-6 text-center">
        Momentos Especiales
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {photos.map((photo, index) => (
          <div
            key={photo.src}
            className={cn(
              "relative overflow-hidden group cursor-pointer",
              photo.className
            )}
            onClick={() => setSelectedImage(photo.src)}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={index < 2}
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl w-full p-1 bg-white/5 backdrop-blur-xl">
          {selectedImage && (
            <div className="relative w-full aspect-[4/3]">
              <Image
                src={selectedImage}
                alt="Foto ampliada"
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
