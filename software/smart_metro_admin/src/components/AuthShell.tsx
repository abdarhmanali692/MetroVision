import type { ReactNode } from 'react';
import Logo from './Logo';

// Decorative placeholder stops — replace with real network data in a later phase.
const stops = ['المرج', 'الشهداء', 'السادات', 'المعادي', 'حلوان'];

function MetroPanel() {
  return (
    <div className="hidden flex-col justify-between bg-brand tile-pattern p-12 text-white lg:flex">
      <div>
        <div className="flex items-center gap-3"><Logo className="h-11 w-11 text-white" /><p className="font-display text-3xl font-bold">المترو الذكي</p></div>
        <p className="mt-2 max-w-sm text-white/80">خطط رحلتك، اشترِ تذكرتك، وتابع حالة الزحام في المحطات.</p>
      </div>
      <svg viewBox="0 0 400 140" className="w-full" role="img" aria-label="خط المترو">
        <line x1="20" y1="50" x2="380" y2="50" stroke="#3BA55D" strokeWidth="8" strokeLinecap="round" />
        {stops.map((name, i) => {
          const x = 380 - i * 90; // right → left (RTL)
          const active = i === 2;
          return (
            <g key={name}>
              <circle cx={x} cy="50" r={active ? 14 : 10} fill={active ? '#3BA55D' : 'white'} stroke="#0B2447" strokeWidth="5" />
              <text x={x} y={active ? 92 : 86} textAnchor="middle" fontSize="14" fill="white" fontWeight={active ? 700 : 400}>
                {name}
              </text>
            </g>
          );
        })}
      </svg>
      <p className="text-sm text-white/60">الركاب والمشرفون: سجل الدخول بنفس الصفحة</p>
    </div>
  );
}

export default function AuthShell({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center p-6">{children}</div>
      <MetroPanel />
    </div>
  );
}
