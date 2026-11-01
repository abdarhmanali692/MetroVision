import { Navigate, Outlet, useLocation } from 'react-router-dom';
import AppLoading from '@/components/AppLoading';
import { homeFor } from '@/lib/roles';
import { useAuthStore } from '@/store/authStore';

/** Wraps pages that need a session. `role` limits who may enter (Admin area vs Passenger area). */
export default function ProtectedRoute({ role }: { role: 'Admin' | 'Passenger' }) {
  const { status, user } = useAuthStore();
  const location = useLocation();

  if (status === 'loading') return <AppLoading fullScreen message="جاري التحميل..." />;
  if (status === 'unauthenticated') return <Navigate to="/login" replace state={{ from: location }} />;
  if (user?.role !== role) return <Navigate to={homeFor(user?.role)} replace />; // wrong area -> own home
  return <Outlet />;
}

/** "/" and unknown URLs: send each person to their own home. */
export function RoleRedirect() {
  const { status, user } = useAuthStore();
  if (status === 'loading') return <AppLoading fullScreen />;
  return <Navigate to={status === 'authenticated' ? homeFor(user?.role) : '/login'} replace />;
}
