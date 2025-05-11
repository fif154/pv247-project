import { cn } from '@/lib/utils';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from './button';
import { toast } from 'react-toastify';
import { Spinner } from './spinner';

type DropzoneProps = React.ComponentProps<'section'> & {
  onUploadComplete?: (url: string) => void;
};

function Dropzone({ className, onUploadComplete, ...props }: DropzoneProps) {
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      const formData = new FormData();
      formData.append('file', file);

      setIsUploading(true);
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      setIsUploading(false);
      if (res.ok) {
        toast.success('File uploaded successfully');
        onUploadComplete?.(data.url);
      } else {
        toast.error('File upload failed');
      }
    },
    [onUploadComplete]
  );

  const { acceptedFiles, getRootProps, getInputProps, open } = useDropzone({
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
    maxFiles: 1,
    maxSize: 1048576, // 1MB
    onDrop,
  });
  return (
    <section
      className={cn(
        'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-30 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        className
      )}
      {...props}
    >
      {acceptedFiles.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-lg w-full h-full gap-1">
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <span>Drag &apos;n&apos; drop some image here</span>
          </div>
          <span>or</span>
          <Button type="button" onClick={open}>
            Select File
          </Button>
        </div>
      ) : (
        acceptedFiles.map((file) => (
          <div
            className="flex flex-col items-center justify-center w-full h-full"
            key={file.path}
          >
            {isUploading && <Spinner />}
            {file.path?.split('/').pop()}
          </div>
        ))
      )}
    </section>
  );
}

export default Dropzone;
