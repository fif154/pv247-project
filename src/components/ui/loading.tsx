import { Spinner } from './spinner';

interface LoadingProps {
  fullScreen?: boolean;
}

export function Loading({ fullScreen = false }: LoadingProps) {
  return (
    <div
      className={`flex items-center justify-center ${
        fullScreen ? 'min-h-screen' : 'min-h-[200px]'
      }`}
    >
      <Spinner />
    </div>
  );
}
