import { AlertCircle } from 'lucide-react';
import AppButton from './AppButton';

interface Props {
  message: string; // server message, shown as-is
  onRetry?: () => void;
  /** inline = compact banner for forms; otherwise a centered block for pages */
  inline?: boolean;
}

export default function AppErrorView({ message, onRetry, inline }: Props) {
  if (inline) {
    return (
      <div role="alert" className="flex items-start gap-2 rounded-md bg-destructive/10 p-3 text-sm font-medium text-destructive">
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
        <span>{message}</span>
      </div>
    );
  }
  return (
    <div role="alert" className="flex flex-col items-center gap-4 py-16 text-center">
      <AlertCircle className="h-10 w-10 text-destructive" />
      <p>{message}</p>
      {onRetry && (
        <AppButton variant="outline" onClick={onRetry}>
          إعادة المحاولة
        </AppButton>
      )}
    </div>
  );
}
