import { ArrowLeftRight, ChevronLeft, Clock, CreditCard, Map, QrCode, Ticket, TriangleAlert, X } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/authStore';

// ---- MOCK / placeholder content (replaced by real endpoints in later phases) ----
const stations = ['المرج', 'عزبة النخل', 'الشهداء', 'السادات', 'العتبة', 'المعادي', 'حلوان'];
const trains = [
  { line: 1, dest: 'اتجاه المرج', eta: 2, crowd: 'مرتفع' },
  { line: 1, dest: 'اتجاه حلوان', eta: 4, crowd: 'متوسط' },
  { line: 2, dest: 'اتجاه شبرا الخيمة', eta: 6, crowd: 'منخفض' },
  { line: 3, dest: 'اتجاه عدلي منصور', eta: 9, crowd: 'منخفض' },
] as const;
const lines = [
  { line: 1, name: 'الخط الأول', status: 'يعمل بانتظام', ok: true },
  { line: 2, name: 'الخط الثاني', status: 'تأخير بسيط', ok: false },
  { line: 3, name: 'الخط الثالث', status: 'يعمل بانتظام', ok: true },
] as const;
const lineBg = { 1: 'bg-line1', 2: 'bg-line2', 3: 'bg-line3' } as const;
const crowdColor = { منخفض: 'text-success', متوسط: 'text-warning', مرتفع: 'text-destructive' } as const;
const ar = (n: number) => n.toLocaleString('ar-EG');

const quick = [
  { to: '/app/tickets', title: 'شراء تذكرة', sub: 'اختر النوع وأكمل الدفع', icon: Ticket, tint: 'bg-accent/10 text-accent' },
  { to: '/app/tickets', title: 'تذكرتي (QR)', sub: 'اعرض الكود عند البوابة', icon: QrCode, tint: 'bg-primary/10 text-primary' },
  { to: '/app/payments', title: 'سجل المعاملات', sub: 'مدفوعاتك السابقة', icon: CreditCard, tint: 'bg-success/10 text-success' },
];

function Panel({ title, action, children, className }: { title: string; action?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <Card className={cn('p-5 shadow-card', className)}>
      <div className="mb-3 flex items-start justify-between">
        <h2 className="text-lg font-bold">{title}</h2>
        {action}
      </div>
      {children}
    </Card>
  );
}

export default function HomePage() {
  const user = useAuthStore((s) => s.user);
  const navigate = useNavigate();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [showNotice, setShowNotice] = useState(true);

  const swap = () => { setFrom(to); setTo(from); };
  const plan = (e: FormEvent) => { e.preventDefault(); navigate('/app/trip', { state: { from, to } }); };

  return (
    <div className="space-y-4">
      <header>
        <span className="text-xs font-bold text-muted-foreground">أهلاً بعودتك</span>
        <h1 className="text-3xl font-bold">مرحباً، {user?.fullName?.split(' ')[0]}</h1>
        <p className="text-sm text-muted-foreground">جاهز لرحلتك القادمة؟</p>
      </header>

      {showNotice && (
        <div className="flex items-center gap-3 rounded-lg border border-warning/40 bg-warning/10 px-4 py-3" role="status">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-warning/25 text-warning"><TriangleAlert className="h-4 w-4" /></span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold">تنبيه خدمة</p>
            <p className="text-xs text-muted-foreground">تأخير بسيط على الخط الثاني بسبب أعمال صيانة.</p>
          </div>
          <Link to="/app/alerts" className="hidden items-center gap-1 text-xs font-bold text-warning sm:flex">التفاصيل <ChevronLeft className="h-3 w-3" /></Link>
          <button onClick={() => setShowNotice(false)} aria-label="إغلاق التنبيه" className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
        </div>
      )}

      {/* Trip planner hero */}
      <section className="grid items-center gap-6 rounded-xl bg-brand tile-pattern p-6 text-white shadow-card lg:grid-cols-[.8fr_1.2fr] lg:p-8">
        <div>
          <span className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold">تخطيط الرحلة</span>
          <h2 className="mb-1 mt-3 text-2xl font-bold">إلى أين تريد الذهاب؟</h2>
          <p className="text-sm text-white/75">اختر محطة البداية والوصول واعرف أسرع مسار.</p>
        </div>
        <form onSubmit={plan} className="relative grid gap-2 rounded-lg bg-card p-3 text-foreground shadow-card sm:grid-cols-[1fr_1fr_auto]">
          <label className="flex h-14 items-center gap-3 rounded-md border px-3">
            <span className="h-2 w-2 shrink-0 rounded-full bg-accent ring-4 ring-accent/20" />
            <span className="w-full">
              <span className="block text-[10px] font-bold text-muted-foreground">من</span>
              <input list="stations" value={from} onChange={(e) => setFrom(e.target.value)} placeholder="محطة البداية" className="w-full bg-transparent text-sm font-bold outline-none placeholder:font-normal" />
            </span>
          </label>
          <label className="flex h-14 items-center gap-3 rounded-md border px-3">
            <span className="h-2 w-2 shrink-0 rounded-full bg-primary ring-4 ring-primary/20" />
            <span className="w-full">
              <span className="block text-[10px] font-bold text-muted-foreground">إلى</span>
              <input list="stations" value={to} onChange={(e) => setTo(e.target.value)} placeholder="محطة الوصول" className="w-full bg-transparent text-sm font-bold outline-none placeholder:font-normal" />
            </span>
          </label>
          <datalist id="stations">{stations.map((s) => <option key={s} value={s} />)}</datalist>
          <button type="button" onClick={swap} aria-label="تبديل المحطتين" className="absolute start-1/2 top-1/2 z-10 hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border bg-card text-muted-foreground sm:grid rtl:translate-x-1/2">
            <ArrowLeftRight className="h-4 w-4" />
          </button>
          <button type="submit" className="flex h-14 items-center justify-center gap-2 rounded-md bg-accent px-6 text-sm font-bold text-white transition active:scale-[0.97] hover:bg-accent/90">
            <Map className="h-4 w-4" /> خطط الرحلة
          </button>
        </form>
      </section>

      <div className="grid gap-3 sm:grid-cols-3">
        {quick.map(({ to, title, sub, icon: Icon, tint }) => (
          <Link key={title} to={to} className="group">
            <Card className="flex items-center gap-3 p-4 transition group-hover:-translate-y-0.5 group-hover:shadow-card">
              <span className={cn('grid h-10 w-10 place-items-center rounded-md', tint)}><Icon className="h-5 w-5" /></span>
              <span className="flex-1"><b className="block text-sm">{title}</b><small className="text-xs text-muted-foreground">{sub}</small></span>
              <ChevronLeft className="h-4 w-4 text-muted-foreground" />
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.55fr_1fr]">
        <Panel title="القطارات القادمة" action={<Link to="/app/trip" className="flex items-center gap-1 text-xs font-bold text-accent">كل المحطات <ChevronLeft className="h-3 w-3" /></Link>}>
          <div className="mb-2 flex items-center gap-2 rounded-md bg-muted px-3 py-2.5 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" /> محطة السادات <b className="ms-auto text-success">مفتوحة</b>
          </div>
          {trains.map((t) => (
            <div key={t.dest} className="grid grid-cols-[34px_1fr_auto_auto] items-center gap-3 border-b py-3 last:border-0">
              <span className={cn('grid h-8 w-8 place-items-center rounded-full text-xs font-bold text-white', lineBg[t.line])}>{ar(t.line)}</span>
              <span><b className="block text-sm">{t.dest}</b><small className="text-xs text-muted-foreground">ازدحام <span className={crowdColor[t.crowd]}>{t.crowd}</span></small></span>
              <b className="font-display text-base">{ar(t.eta)} د</b>
            </div>
          ))}
        </Panel>

        <div className="grid gap-4">
          <Panel title="حالة الخطوط" action={<span className="rounded-full bg-success/15 px-2.5 py-1 text-[10px] font-bold text-success">مباشر</span>}>
            {lines.map((l) => (
              <div key={l.line} className="grid grid-cols-[34px_1fr_10px] items-center gap-3 border-b py-3 last:border-0">
                <span className={cn('grid h-8 w-8 place-items-center rounded-full text-xs font-bold text-white', lineBg[l.line])}>{ar(l.line)}</span>
                <span><b className="block text-sm">{l.name}</b><small className={cn('text-xs', l.ok ? 'text-success' : 'text-warning')}>{l.status}</small></span>
                <i className={cn('h-2 w-2 rounded-full', l.ok ? 'bg-success' : 'bg-warning')} />
              </div>
            ))}
          </Panel>
          <div className="rounded-lg bg-brand tile-pattern p-5 text-white shadow-card">
            <span className="text-[11px] font-bold text-white/70">نصيحة للرحلة</span>
            <h3 className="my-1 text-base font-bold">تجنّب ساعات الذروة</h3>
            <p className="text-xs text-white/75">الزحام أقل قبل الثامنة صباحاً وبعد التاسعة مساءً.</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_1.5fr]">
        <Card className="p-5 shadow-card">
          <div className="flex items-center justify-between text-sm font-bold">
            تذكرتك الفعّالة <span className="rounded-full bg-success/15 px-2.5 py-1 text-[10px] text-success">فعّالة</span>
          </div>
          <div className="mt-4 flex items-center gap-4">
            {/* placeholder for the real QR (next phase) */}
            <div className="grid h-16 w-16 grid-cols-3 gap-[3px] rounded-md border p-1.5" aria-hidden="true">
              {Array.from({ length: 9 }).map((_, i) => <i key={i} className={[1, 3, 7].includes(i) ? 'bg-card' : 'bg-foreground'} />)}
            </div>
            <div>
              <h3 className="text-sm font-bold">رحلة واحدة</h3>
              <p className="mb-2 text-xs text-muted-foreground">لا توجد بيانات حقيقية بعد</p>
              <Link to="/app/tickets" className="flex items-center gap-1 text-xs font-bold text-accent">عرض الـ QR <ChevronLeft className="h-3 w-3" /></Link>
            </div>
          </div>
        </Card>
        <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-navy to-primary p-6 text-white shadow-card">
          <span className="text-[11px] font-bold text-accent">باقة الاشتراك</span>
          <h2 className="mb-1 mt-2 text-xl font-bold">وفّر مع الاشتراك الشهري</h2>
          <p className="mb-4 text-xs text-white/70">رحلات بلا حدود على الخطوط التي تختارها.</p>
          <Link to="/app/tickets" className="inline-flex items-center gap-1 text-sm font-bold">استكشف الباقات <ChevronLeft className="h-4 w-4" /></Link>
        </div>
      </div>
    </div>
  );
}
