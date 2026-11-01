import { CreditCard, Home, Map, Ticket, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import ShellLayout, { type NavItem } from './ShellLayout';

const nav: NavItem[] = [
  { to: '/app', label: 'الرئيسية', icon: Home, end: true },
  { to: '/app/trip', label: 'الرحلة', icon: Map },
  { to: '/app/tickets', label: 'تذاكري', icon: Ticket },
  { to: '/app/payments', label: 'المعاملات', icon: CreditCard },
  { to: '/app/profile', label: 'حسابي', icon: User },
];
const bottomNav = [nav[0], nav[1], nav[2], nav[4]];

export default function PassengerLayout() {
  const signOut = useAuthStore((s) => s.signOut);
  const navigate = useNavigate();
  const logout = async () => { await signOut(); navigate('/login', { replace: true }); };
  return <ShellLayout nav={nav} bottomNav={bottomNav} tagline="تطبيق الراكب" roleLabel="راكب" bellTo="/app/alerts" onLogout={logout} />;
}
