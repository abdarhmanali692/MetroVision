import { Loader2 } from 'lucide-react';

export default function AppLoading({ message, fullScreen }: { message?: string; fullScreen?: boolean }) {
  return (
    <div className={`flex flex-col items-center justify-center gap-3 text-muted-foreground ${fullScreen ? 'min-h-screen' : 'py-16'}`}>
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      {message && <p className="text-sm">{message}</p>}
    </div>
  );
}
