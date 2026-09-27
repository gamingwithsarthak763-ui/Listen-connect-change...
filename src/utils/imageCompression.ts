/**
 * Client-side image compression using HTML Canvas
 * Safely reduces image size to ~100KB-150KB for fast Firestore storage and preview
 */
export interface CompressionResult {
  dataUrl: string;
  originalSizeKB: number;
  compressedSizeKB: number;
  width: number;
  height: number;
}

export async function compressImage(
  file: File,
  maxWidth = 640,
  maxHeight = 640,
  quality = 0.65
): Promise<CompressionResult> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (readerEvent) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate aspect-ratio preserved dimensions
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas context not available'));
          return;
        }

        // High quality smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to WebP or JPEG
        const mimeType = 'image/jpeg';
        const dataUrl = canvas.toDataURL(mimeType, quality);

        const originalSizeKB = Math.round(file.size / 1024);
        // Base64 length calculation to approximate KB
        const head = 'data:' + mimeType + ';base64,';
        const base64Length = dataUrl.length - head.length;
        const compressedSizeKB = Math.round((base64Length * 3) / 4 / 1024);

        resolve({
          dataUrl,
          originalSizeKB,
          compressedSizeKB,
          width,
          height,
        });
      };

      img.onerror = () => reject(new Error('Failed to load image file'));
      if (typeof readerEvent.target?.result === 'string') {
        img.src = readerEvent.target.result;
      } else {
        reject(new Error('Invalid file reader result'));
      }
    };

    reader.onerror = () => reject(new Error('File reading error'));
    reader.readAsDataURL(file);
  });
}
