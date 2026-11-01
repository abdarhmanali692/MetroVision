import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { router } from './router';

export default function App() {
  const bootstrap = useAuthStore((s) => s.bootstrap);
  useEffect(() => {
    bootstrap(); // restore session from the stored token
  }, [bootstrap]);

  return <RouterProvider router={router} />;
}
