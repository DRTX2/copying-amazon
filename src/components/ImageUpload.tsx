'use client';

import { useState, useCallback, useRef } from 'react';
import { X, Upload, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { PRODUCT_IMAGE_CONFIG } from '@/config/imageUpload';
import {
  validateImageFiles,
  compressImage,
  formatFileSize,
  createImagePreview,
} from '@/utils/imageUtils';

interface ImageFile {
  file: File;
  preview: string;
  id: string;
}

interface ImageUploadProps {
  images: ImageFile[];
  onChange: (images: ImageFile[]) => void;
  maxFiles?: number;
  disabled?: boolean;
}

export default function ImageUpload({
  images,
  onChange,
  maxFiles = PRODUCT_IMAGE_CONFIG.limits.maxFilesCount,
  disabled = false,
}: ImageUploadProps) {
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return;

      setError(null);
      const fileArray = Array.from(files);
      const currentFileCount = images.length;
      const availableSlots = maxFiles - currentFileCount;

      // Limitar archivos si excede el máximo
      const filesToProcess = fileArray.slice(0, availableSlots);

      // Validar archivos
      const validationError = validateImageFiles([
        ...images.map((img) => img.file),
        ...filesToProcess,
      ]);

      if (validationError) {
        setError(validationError);
        return;
      }

      setIsCompressing(true);

      try {
        // Comprimir y crear previews
        const newImages: ImageFile[] = await Promise.all(
          filesToProcess.map(async (file) => {
            const compressedFile = await compressImage(file);
            const preview = await createImagePreview(compressedFile);
            return {
              file: compressedFile,
              preview,
              id: `${Date.now()}-${Math.random()}`,
            };
          })
        );

        onChange([...images, ...newImages]);
      } catch (err) {
        setError('Error al procesar las imágenes');
        console.error(err);
      } finally {
        setIsCompressing(false);
      }
    },
    [images, maxFiles, onChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      if (disabled) return;
      handleFiles(e.dataTransfer.files);
    },
    [disabled, handleFiles]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFiles(e.target.files);
      // Reset input value para permitir seleccionar el mismo archivo
      e.target.value = '';
    },
    [handleFiles]
  );

  const removeImage = useCallback(
    (id: string) => {
      onChange(images.filter((img) => img.id !== id));
      setError(null);
    },
    [images, onChange]
  );

  const totalSize = images.reduce((sum, img) => sum + img.file.size, 0);

  return (
    <div className="w-full">
      {/* Área de carga */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => !disabled && fileInputRef.current?.click()}
        className={`
          relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
          transition-colors duration-200
          ${isDragging ? 'border-yellow-500 bg-yellow-50' : 'border-gray-300 hover:border-gray-400'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          ${images.length >= maxFiles ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={PRODUCT_IMAGE_CONFIG.formats.mimeTypes.join(',')}
          onChange={handleInputChange}
          disabled={disabled || images.length >= maxFiles}
          className="hidden"
        />

        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        
        <p className="text-sm text-gray-600 mb-2">
          {isCompressing ? (
            'Procesando imágenes...'
          ) : (
            <>
              <span className="font-medium text-yellow-600">Haz clic para subir</span>
              {' o arrastra y suelta'}
            </>
          )}
        </p>
        
        <p className="text-xs text-gray-500">
          PNG, JPG o WEBP (máx. {formatFileSize(PRODUCT_IMAGE_CONFIG.limits.maxFileSize)})
        </p>
        
        <p className="text-xs text-gray-500 mt-1">
          {images.length}/{maxFiles} imágenes • {formatFileSize(totalSize)}/
          {formatFileSize(PRODUCT_IMAGE_CONFIG.limits.maxTotalSize)}
        </p>
      </div>

      {/* Error message */}
      {error && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md flex items-start gap-2">
          <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Preview de imágenes */}
      {images.length > 0 && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {images.map((image) => (
            <div
              key={image.id}
              className="relative group aspect-square rounded-lg overflow-hidden border-2 border-gray-200 hover:border-yellow-400 transition-colors"
            >
              <img
                src={image.preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              
              <button
                type="button"
                onClick={() => removeImage(image.id)}
                disabled={disabled}
                className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 disabled:opacity-50"
                aria-label="Eliminar imagen"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {formatFileSize(image.file.size)}
              </div>
            </div>
          ))}

          {/* Placeholder para imágenes restantes */}
          {images.length < maxFiles && (
            <div
              onClick={() => !disabled && fileInputRef.current?.click()}
              className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-yellow-400 hover:bg-yellow-50 transition-colors"
            >
              <ImageIcon className="h-8 w-8 text-gray-400 mb-1" />
              <span className="text-xs text-gray-500">Agregar</span>
            </div>
          )}
        </div>
      )}

      {/* Información útil */}
      <div className="mt-3 text-xs text-gray-500 space-y-1">
        <p>• Las imágenes se comprimen automáticamente para optimizar la carga</p>
        <p>• Recomendado: imágenes cuadradas de al menos 800x800px</p>
        <p>• La primera imagen será la principal del producto</p>
      </div>
    </div>
  );
}
