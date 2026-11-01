import { Bell, LogOut, PanelRightClose, PanelRightOpen, type LucideIcon } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import Logo from '@/components/Logo';
import ThemeToggle from '@/components/ThemeToggle';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/authStore';

export interface NavItem { to: string; label: string; icon: LucideIcon; end?: boolean }

interface Props {
  nav: NavItem[];
  bottomNav?: NavItem[]; // mobile bottom bar (passenger)
  tagline: string;
  roleLabel: string;
  collapsible?: boolean;
  sidebarAlways?: boolean; // keep sidebar on small screens too (admin)
  bellTo?: string;
  onLogout: () => void;
}

/** Right-hand sidebar (RTL: first flex child) + top actions + content outlet. */
export default function ShellLayout({ nav, bottomNav, tagline, roleLabel, collapsible, sidebarAlways, bellTo, onLogout }: Props) {
  const user = useAuthStore((s) => s.user);
  const [collapsed, setCollapsed] = useState(false);
  const slim = collapsible && collapsed;

  return (
    <div className="flex min-h-screen">
      <aside
        className={cn(
          'sticky top-0 h-screen shrink-0 flex-col bg-gradient-to-b from-navy to-navy/90 px-4 pb-5 pt-7 text-white transition-[width] duration-200',
          sidebarAlways ? 'flex' : 'hidden md:flex',
          slim ? 'w-[76px]' : 'w-[245px]',
        )}
      >
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-white/10"><Logo className="h-7 w-7 text-white" /></div>
          {!slim && (
            <div>
              <p className="font-display text-lg font-bold leading-none">المترو الذكي</p>
              <p className="mt-1 text-[11px] text-white/55">{tagline}</p>
            </div>
          )}
        </div>

        <nav className="mt-10 grid gap-1.5" aria-label="القائمة الرئيسية">
          {nav.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to} to={to} end={end} title={label}
              className={({ isActive }) =>
                cn(
                  'flex h-12 items-center gap-3 rounded-md px-3 text-sm font-bold transition-colors',
                  slim && 'justify-center px-0',
                  isActive ? 'bg-white/10 text-white [&_svg]:text-accent' : 'text-white/60 hover:bg-white/5 hover:text-white',
                )
              }
            >
              <Icon className="h-[18px] w-[18px] shrink-0" />
              {slim ? <span className="sr-only">{label}</span> : label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto space-y-3">
          {collapsible && (
            <button
              onClick={() => setCollapsed((c) => !c)}
              className="flex h-10 w-full items-center justify-center rounded-md text-white/60 hover:bg-white/5 hover:text-white"
              aria-label={slim ? 'توسيع القائمة' : 'طي القائمة'}
            >
              {slim ? <PanelRightOpen className="h-[18px] w-[18px]" /> : <PanelRightClose className="h-[18px] w-[18px]" />}
            </button>
          )}
          <div className={cn('flex items-center gap-3 border-t border-white/10 pt-4', slim && 'flex-col')}>
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/90 font-display font-bold text-navy">
              {user?.fullName?.trim().charAt(0)}
            </span>
            {!slim && (
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-bold">{user?.fullName}</p>
                <p className="text-[11px] text-white/55">{roleLabel}</p>
              </div>
            )}
            <button onClick={onLogout} aria-label="تسجيل الخروج" title="تسجيل الخروج" className="text-white/60 hover:text-white">
              <LogOut className="h-[18px] w-[18px]" />
            </button>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between px-4 py-3 sm:px-8">
          <div className={cn('items-center gap-2', sidebarAlways ? 'hidden' : 'flex md:hidden')}>
            <div className="grid h-9 w-9 place-items-center rounded-md bg-navy"><Logo className="h-6 w-6 text-white" /></div>
            <span className="font-display font-bold">المترو الذكي</span>
          </div>
          <div className="flex items-center gap-2" style={{ marginInlineStart: 'auto' }}>
            {bellTo && (
              <Link to={bellTo} aria-label="التنبيهات" className="relative grid h-10 w-10 place-items-center rounded-md border bg-card text-muted-foreground hover:text-foreground">
                <Bell className="h-[18px] w-[18px]" />
                <i className="absolute end-2.5 top-2.5 h-1.5 w-1.5 rounded-full border border-card bg-accent" />
              </Link>
            )}
            <ThemeToggle />
          </div>
        </div>
        <main className="mx-auto w-full max-w-[1450px] flex-1 px-4 pb-24 sm:px-8 md:pb-10">
          <Outlet />
        </main>
      </div>

      {bottomNav && (
        <nav className="fixed inset-x-0 bottom-0 z-20 grid h-[68px] border-t bg-card md:hidden" style={{ gridTemplateColumns: `repeat(${bottomNav.length}, 1fr)` }} aria-label="التنقل السريع">
          {bottomNav.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} className={({ isActive }) => cn('flex flex-col items-center justify-center gap-1 text-[11px] font-medium', isActive ? 'text-accent' : 'text-muted-foreground')}>
              <Icon className="h-5 w-5" />
              {label}
            </NavLink>
          ))}
        </nav>
      )}
    </div>
  );
}
