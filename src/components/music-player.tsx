"use client";

import React, { useState, useEffect } from "react";
import useSound from "use-sound";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";

type MusicPlayerProps = {
  audioFiles: { name: string; url: string }[];
};

export default function MusicPlayer({ audioFiles }: MusicPlayerProps) {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);

  const currentSong = audioFiles[currentSongIndex];

  const [play, { stop, sound }] = useSound(currentSong?.url || "", {
    volume: isMuted ? 0 : volume,
    onend: () => {
      handleNext();
    },
  });

  useEffect(() => {
    if (sound) {
      if (isPlaying) {
        play();
      } else {
        stop();
      }
    }
  }, [currentSongIndex, isPlaying, play, stop, sound]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePrevious = () => {
    stop();
    setCurrentSongIndex((prev) =>
      prev === 0 ? audioFiles.length - 1 : prev - 1
    );
    setIsPlaying(true);
  };

  const handleNext = () => {
    stop();
    setCurrentSongIndex((prev) =>
      prev === audioFiles.length - 1 ? 0 : prev + 1
    );
    setIsPlaying(true);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  if (audioFiles.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">No hay archivos de música disponibles</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="flex flex-col gap-4">
          <div className="text-center">
            <h3 className="font-medium truncate">{currentSong?.name || "Música"}</h3>
            <p className="text-sm text-muted-foreground">
              {currentSongIndex + 1} de {audioFiles.length}
            </p>
          </div>
          <div className="flex justify-center items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrevious}
              disabled={audioFiles.length <= 1}
            >
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button
              variant="default"
              size="icon"
              onClick={handlePlayPause}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              disabled={audioFiles.length <= 1}
            >
              <SkipForward className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleMute}
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
