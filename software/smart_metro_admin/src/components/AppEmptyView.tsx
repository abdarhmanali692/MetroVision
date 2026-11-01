import type { LucideIcon } from 'lucide-react';
import { Inbox } from 'lucide-react';

interface Props {
  icon?: LucideIcon;
  title: string;
  description?: string;
}

export default function AppEmptyView({ icon: Icon = Inbox, title, description }: Props) {
  return (
    <div className="flex flex-col items-center gap-2 py-16 text-center">
      <Icon className="h-10 w-10 text-primary" />
      <h2 className="text-lg font-bold">{title}</h2>
      {description && <p className="text-muted-foreground">{description}</p>}
    </div>
  );
}
