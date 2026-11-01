import { BarChart3, Bell, BrainCircuit, LayoutDashboard, MessageSquareWarning, Network, ScanLine, Ticket, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import ShellLayout, { type NavItem } from './ShellLayout';

const nav: NavItem[] = [
  { to: '/dashboard', label: 'لوحة التحكم', icon: LayoutDashboard },
  { to: '/tickets', label: 'التذاكر', icon: Ticket },
  { to: '/validations', label: 'سجل التحقق', icon: ScanLine },
  { to: '/users', label: 'المستخدمون', icon: Users },
  { to: '/ai', label: 'توقعات الازدحام', icon: BrainCircuit },
  { to: '/alerts', label: 'إعلانات الخدمة', icon: Bell },
  { to: '/complaints', label: 'الشكاوى', icon: MessageSquareWarning },
  { to: '/reports', label: 'التقارير', icon: BarChart3 },
  { to: '/network', label: 'بيانات الشبكة', icon: Network },
];

export default function AdminLayout() {
  const signOut = useAuthStore((s) => s.signOut);
  const navigate = useNavigate();
  const logout = async () => { await signOut(); navigate('/login', { replace: true }); };
  return <ShellLayout nav={nav} tagline="لوحة الإدارة" roleLabel="مشرف" collapsible sidebarAlways onLogout={logout} />;
}
