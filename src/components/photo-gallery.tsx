"use client";

import React, { useState } from "react";
import PhotoAlbum from "react-photo-album";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, XCircle } from "lucide-react";
import Image from "next/image";

type Photo = {
  src: string;
  width: number;
  height: number;
  alt?: string;
};

type PhotoGalleryProps = {
  photos: Photo[];
};

export default function PhotoGallery({ photos }: PhotoGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setIsDialogOpen(true);
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? photos.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === photos.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (photos.length === 0) {
    return (
      <Card className="p-6 text-center">
        <p className="text-muted-foreground">No hay fotos disponibles</p>
      </Card>
    );
  }

  // For react-photo-album
  const photoAlbumPhotos = photos.map((photo) => ({
    src: photo.src,
    width: photo.width,
    height: photo.height,
    alt: photo.alt || "Foto de cumpleaños",
  }));

  return (
    <>
      <PhotoAlbum
        layout="masonry"
        photos={photoAlbumPhotos}
        onClick={({ index }) => openLightbox(index)}
        // Remove the custom rendering to use default
      />

      <Dialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      >
        <DialogContent className="max-w-7xl w-[95vw] min-h-[50vh] flex items-center justify-center p-1 sm:p-2 md:p-4">
          <button
            onClick={() => setIsDialogOpen(false)}
            className="absolute top-2 right-2 z-10 text-white bg-black/30 rounded-full p-1"
            aria-label="Cerrar"
          >
            <XCircle className="h-6 w-6" />
          </button>

          <button
            onClick={goToPrevious}
            className="absolute left-2 z-10 text-white bg-black/30 rounded-full p-2"
            aria-label="Anterior"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-2 z-10 text-white bg-black/30 rounded-full p-2"
            aria-label="Siguiente"
          >
            <ArrowRight className="h-6 w-6" />
          </button>

          <div className="relative h-full w-full flex items-center justify-center">
            <div className="relative w-full h-[80vh] flex items-center justify-center">
              <Image
                src={photos[currentImageIndex].src}
                alt={photos[currentImageIndex].alt || "Foto de cumpleaños"}
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
