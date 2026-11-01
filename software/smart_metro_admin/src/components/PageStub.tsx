import type { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import AppEmptyView from './AppEmptyView';

export default function PageStub({ title, icon }: { title: string; icon: LucideIcon }) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{title}</h1>
      <Card>
        <AppEmptyView icon={icon} title={title} description="هذه الصفحة قادمة في مرحلة لاحقة" />
      </Card>
    </div>
  );
}
