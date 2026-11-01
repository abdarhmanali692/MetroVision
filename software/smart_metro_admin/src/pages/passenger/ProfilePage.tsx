import { UserX } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { authService } from '@/api/authService';
import AppEmptyView from '@/components/AppEmptyView';
import AppErrorView from '@/components/AppErrorView';
import AppLoading from '@/components/AppLoading';
import { Card } from '@/components/ui/card';
import { formatDate } from '@/lib/validation';
import type { UserProfile } from '@/types/models';

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const res = await authService.profile();
    if (res.ok) setProfile(res.data);
    else setError(res.message);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  if (loading) return <AppLoading />;
  if (error) return <AppErrorView message={error} onRetry={load} />;
  if (!profile) return <AppEmptyView icon={UserX} title="لا توجد بيانات للحساب" />;

  const rows: [string, string][] = [
    ['الاسم', profile.fullName],
    ['البريد الإلكتروني', profile.email],
    ['رقم الهاتف', profile.phone],
    ['تاريخ التسجيل', formatDate(profile.createdAt)],
  ];

  return (
    <div className="max-w-xl space-y-6">
      <h1 className="text-2xl font-bold">حسابي</h1>
      <Card className="divide-y">
        {rows.map(([label, value]) => (
          <div key={label} className="p-4">
            <p className="text-xs text-muted-foreground">{label}</p>
            <p>{value}</p>
          </div>
        ))}
      </Card>
    </div>
  );
}
