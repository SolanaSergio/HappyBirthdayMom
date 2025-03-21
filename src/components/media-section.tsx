"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Music, ImageIcon, RefreshCw } from "lucide-react";
import { useFiles } from "@/context/file-context";
import FileUpload from "@/components/file-upload";
import PhotoGallery from "@/components/photo-gallery";
import MusicPlayer from "@/components/music-player";
import { StoredFile } from "@/lib/file-service";

export default function MediaSection() {
  const { images, audioFiles, addFile, clearAllFiles, isLoading } = useFiles();
  const [isUploading, setIsUploading] = useState(false);

  // Process files when they are uploaded
  const handleFilesSelected = async (files: File[]) => {
    if (files.length === 0) return;

    setIsUploading(true);

    try {
      for (const file of files) {
        await addFile(file);
      }

      toast.success("Archivos subidos correctamente", {
        description: `${files.length} archivo(s) subido(s) con éxito.`,
      });
    } catch (error) {
      toast.error("Error al subir archivos", {
        description: "Ocurrió un problema al subir tus archivos.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  // Format photos for the gallery
  const formattedPhotos = images.map((image: StoredFile) => ({
    src: image.url,
    width: image.width || 800,
    height: image.height || 600,
    alt: image.name,
  }));

  // Format audio files for the music player
  const formattedAudioFiles = audioFiles.map((audio: StoredFile) => ({
    name: audio.name,
    url: audio.url,
  }));

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-pink-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-pink-600 mb-3">Tus Recuerdos Especiales</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Sube fotos y música para crear una experiencia personalizada y llena de amor para celebrar este día tan especial.
          </p>
        </div>

        <Tabs defaultValue="photos" className="w-full">
          <TabsList className="grid w-full md:w-[400px] grid-cols-2 mx-auto mb-8">
            <TabsTrigger value="photos" className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              <span>Fotos</span>
            </TabsTrigger>
            <TabsTrigger value="music" className="flex items-center gap-2">
              <Music className="h-4 w-4" />
              <span>Música</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="photos" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Subir Fotos</CardTitle>
                <CardDescription>
                  Arrastra y suelta tus fotos favoritas para compartirlos en esta celebración.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FileUpload
                  onFilesSelected={handleFilesSelected}
                  acceptedFileTypes={{ "image/*": [".jpg", ".jpeg", ".png", ".gif"] }}
                  maxFiles={10}
                  label="Arrastra y suelta tus fotos aquí"
                  description="o haz clic para seleccionar archivos (máximo 10)"
                />
              </CardContent>
            </Card>

            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-medium text-gray-800">
                  Galería de Fotos ({formattedPhotos.length})
                </h3>
                {formattedPhotos.length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (confirm("¿Estás seguro que deseas eliminar todas las fotos?")) {
                        clearAllFiles();
                        toast.success("Fotos eliminadas", {
                          description: "Todas las fotos han sido eliminadas.",
                        });
                      }
                    }}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Limpiar todo
                  </Button>
                )}
              </div>

              {formattedPhotos.length > 0 ? (
                <PhotoGallery photos={formattedPhotos} />
              ) : (
                <Card className="p-8 text-center bg-gray-50">
                  <ImageIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-500">
                    Aún no has subido ninguna foto. ¡Sube algunas fotos para comenzar!
                  </p>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="music" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Subir Música</CardTitle>
                <CardDescription>
                  Añade canciones especiales para acompañar esta celebración.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FileUpload
                  onFilesSelected={handleFilesSelected}
                  acceptedFileTypes={{ "audio/*": [".mp3", ".wav", ".ogg", ".m4a"] }}
                  maxFiles={5}
                  label="Arrastra y suelta tu música aquí"
                  description="o haz clic para seleccionar archivos (máximo 5)"
                />
              </CardContent>
            </Card>

            <div className="mt-8">
              <h3 className="text-xl font-medium text-gray-800 mb-4">
                Reproductor de Música ({formattedAudioFiles.length})
              </h3>

              {formattedAudioFiles.length > 0 ? (
                <MusicPlayer audioFiles={formattedAudioFiles} />
              ) : (
                <Card className="p-8 text-center bg-gray-50">
                  <Music className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-500">
                    Aún no has subido ninguna canción. ¡Sube algunas canciones para comenzar!
                  </p>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
