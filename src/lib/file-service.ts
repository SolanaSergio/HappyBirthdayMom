"use client";

// Type for storing files
export type StoredFile = {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  width?: number;
  height?: number;
};

// Storage key for localStorage
const STORAGE_KEY = "feliz-cumpleanos-files";

// Helper function to check if running in browser environment
function isBrowser(): boolean {
  return typeof window !== "undefined";
}

// Helper function to generate a unique ID
function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

// Safe localStorage wrapper functions
function safeGetItem(key: string): string | null {
  if (!isBrowser()) return null;
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.error("LocalStorage access error:", error);
    return null;
  }
}

function safeSetItem(key: string, value: string): boolean {
  if (!isBrowser()) return false;
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.error("LocalStorage write error:", error);
    return false;
  }
}

// Get files from storage
export async function getFiles(): Promise<StoredFile[]> {
  if (!isBrowser()) return [];

  try {
    const data = safeGetItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data);
  } catch (error) {
    console.error("Error parsing stored files:", error);
    return [];
  }
}

// Save a file to storage
export async function saveFile(file: File): Promise<StoredFile> {
  if (!isBrowser()) {
    throw new Error("Cannot save file in server environment");
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async (event) => {
      try {
        const url = event.target?.result as string;
        let newFile: StoredFile;

        // For images, get dimensions
        if (file.type.startsWith("image/")) {
          // Create a promise to get image dimensions
          const getDimensions = () => new Promise<{width: number, height: number}>((resolveImg, rejectImg) => {
            const img = new Image();
            img.onload = () => resolveImg({ width: img.width, height: img.height });
            img.onerror = () => rejectImg(new Error("Failed to load image"));
            img.src = url;
          });

          try {
            const { width, height } = await getDimensions();
            newFile = {
              id: generateId(),
              name: file.name,
              url,
              type: file.type,
              size: file.size,
              width,
              height,
            };
          } catch (imgError) {
            // Use a simplified file without dimensions if image loading fails
            console.warn("Could not get image dimensions, using default values");
            newFile = {
              id: generateId(),
              name: file.name,
              url,
              type: file.type,
              size: file.size,
            };
          }
        } else {
          // For non-image files
          newFile = {
            id: generateId(),
            name: file.name,
            url,
            type: file.type,
            size: file.size,
          };
        }

        // Save to storage
        const existingFiles = await getFiles();
        safeSetItem(STORAGE_KEY, JSON.stringify([...existingFiles, newFile]));
        resolve(newFile);

      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => reject(new Error("Failed to read file"));

    // Start reading the file
    reader.readAsDataURL(file);
  });
}

// Remove a file
export function removeFile(id: string): void {
  if (!isBrowser()) return;

  try {
    const files = getFiles().then(files => {
      const updatedFiles = files.filter(file => file.id !== id);
      safeSetItem(STORAGE_KEY, JSON.stringify(updatedFiles));
    });
  } catch (error) {
    console.error("Error removing file:", error);
  }
}

// Clear all files
export function clearFiles(): void {
  if (!isBrowser()) return;
  safeSetItem(STORAGE_KEY, JSON.stringify([]));
}
