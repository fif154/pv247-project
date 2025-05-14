'use client';

import { Button } from '@/components/ui/button';
import { useDropzone } from 'react-dropzone';
import { ImageIcon, X } from 'lucide-react';
import Image from 'next/image';
import { useCallback } from 'react';

type ImageUploaderProps = {
  imagePreview: string | null;
  activeTab: string;
  onImageChange: (file: File | null, preview: string | null) => void;
  onTabChange: (tab: string) => void;
};

export function ImageUploader({
  imagePreview,
  activeTab,
  onImageChange,
  onTabChange,
}: ImageUploaderProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const objectUrl = URL.createObjectURL(file);
        onImageChange(file, objectUrl);
        onTabChange('upload');
      }
    },
    [onImageChange, onTabChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
    },
    maxFiles: 1,
  });

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    onImageChange(null, null);
  };

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-4 text-center hover:bg-accent/5 transition-colors cursor-pointer ${
        isDragActive ? 'border-primary bg-accent/10' : 'border-border'
      }`}
    >
      <input {...getInputProps()} />

      {imagePreview && activeTab === 'upload' ? (
        <div className="space-y-4">
          <div className="relative w-full h-48 mb-2 group">
            <Image
              src={imagePreview}
              alt="Recipe preview"
              fill
              className="object-cover rounded-md"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-md">
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={handleRemoveImage}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <p className="text-sm">Click or drag to replace image</p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-8">
          <ImageIcon className="h-12 w-12 text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground mb-1">
            {isDragActive
              ? 'Drop the image here'
              : "Drag 'n' drop an image here, or click to select"}
          </p>
          <p className="text-xs text-muted-foreground">
            Supported formats: JPG, PNG, WebP
          </p>
        </div>
      )}
    </div>
  );
}
