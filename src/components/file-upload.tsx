"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { UploadCloud, X } from "lucide-react";

type FileUploadProps = {
  onFilesSelected: (files: File[]) => void;
  acceptedFileTypes?: Record<string, string[]>;
  maxFiles?: number;
  label?: string;
  description?: string;
};

export default function FileUpload({
  onFilesSelected,
  acceptedFileTypes = {
    "image/*": [".jpg", ".jpeg", ".png", ".gif"],
  },
  maxFiles = 5,
  label = "Arrastra y suelta tus archivos aquí",
  description = "o haz clic para seleccionar archivos",
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = [...files];
      acceptedFiles.forEach((file) => {
        if (newFiles.length < maxFiles && !newFiles.some((f) => f.name === file.name)) {
          newFiles.push(file);
        }
      });
      setFiles(newFiles);
      onFilesSelected(newFiles);
    },
    [files, maxFiles, onFilesSelected]
  );

  const removeFile = (name: string) => {
    const newFiles = files.filter((file) => file.name !== name);
    setFiles(newFiles);
    onFilesSelected(newFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes,
    maxFiles,
  });

  return (
    <div className="w-full">
      <Card
        {...getRootProps()}
        className={`border-2 border-dashed p-4 text-center cursor-pointer ${
          isDragActive ? "border-primary/70 bg-primary/5" : "border-muted-foreground/25"
        }`}
      >
        <CardContent className="pt-5 px-0 flex flex-col items-center gap-2">
          <input {...getInputProps()} />
          <UploadCloud className="h-10 w-10 text-muted-foreground" />
          <p className="text-lg font-medium">{label}</p>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
      </Card>

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          <p className="text-sm font-medium">Archivos seleccionados:</p>
          <div className="space-y-2">
            {files.map((file) => (
              <div
                key={file.name}
                className="flex items-center justify-between p-2 bg-muted rounded-md"
              >
                <span className="text-sm truncate max-w-[80%]">{file.name}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(file.name);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
