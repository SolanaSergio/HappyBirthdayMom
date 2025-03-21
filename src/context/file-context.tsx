"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getFiles, saveFile, clearFiles, StoredFile } from '@/lib/file-service';

type FileContextType = {
  images: StoredFile[];
  audioFiles: StoredFile[];
  addFile: (file: File) => Promise<StoredFile>;
  clearAllFiles: () => void;
  isLoading: boolean;
};

// Create a single context with default values
const FileContext = createContext<FileContextType>({
  images: [],
  audioFiles: [],
  addFile: async () => {
    throw new Error('FileContext not initialized');
  },
  clearAllFiles: () => {},
  isLoading: false,
});

export function FileProvider({ children }: { children: ReactNode }) {
  // State initialization
  const [images, setImages] = useState<StoredFile[]>([]);
  const [audioFiles, setAudioFiles] = useState<StoredFile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Load files on mount
  useEffect(() => {
    // Skip if we're already initialized or if we're not in a browser
    if (initialized || typeof window === 'undefined') return;

    async function loadStoredFiles() {
      try {
        const files = await getFiles();

        // Sort files by type
        const imageFiles = files.filter(file => file.type.startsWith('image/'));
        const audio = files.filter(file => file.type.startsWith('audio/'));

        setImages(imageFiles);
        setAudioFiles(audio);
        setInitialized(true);
      } catch (error) {
        console.error('Error loading files:', error);
        // Still mark as initialized to prevent endless retries
        setInitialized(true);
      }
    }

    loadStoredFiles();
  }, [initialized]);

  // Add a new file
  const addFile = async (file: File): Promise<StoredFile> => {
    if (typeof window === 'undefined') {
      throw new Error('Cannot add file in server environment');
    }

    setIsLoading(true);

    try {
      const storedFile = await saveFile(file);

      if (file.type.startsWith('image/')) {
        setImages(prev => [...prev, storedFile]);
      } else if (file.type.startsWith('audio/')) {
        setAudioFiles(prev => [...prev, storedFile]);
      }

      return storedFile;
    } catch (error) {
      console.error('Error adding file:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Clear all files
  const clearAllFiles = () => {
    if (typeof window === 'undefined') return;

    try {
      clearFiles();
      setImages([]);
      setAudioFiles([]);
    } catch (error) {
      console.error('Error clearing files:', error);
    }
  };

  // Create context value
  const contextValue = {
    images,
    audioFiles,
    addFile,
    clearAllFiles,
    isLoading,
  };

  return (
    <FileContext.Provider value={contextValue}>
      {children}
    </FileContext.Provider>
  );
}

// Hook for using files
export function useFiles() {
  return useContext(FileContext);
}
