import { createBrowserRouter } from 'react-router-dom';
import AdminLayout from '@/layouts/AdminLayout';
import PassengerLayout from '@/layouts/PassengerLayout';
import AiPage from '@/pages/ai/AiPage';
import AlertsPage from '@/pages/alerts/AlertsPage';
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import ComplaintsPage from '@/pages/complaints/ComplaintsPage';
import DashboardPage from '@/pages/dashboard/DashboardPage';
import NetworkPage from '@/pages/network/NetworkPage';
import HomePage from '@/pages/passenger/HomePage';
import PassengerAlertsPage from '@/pages/passenger/PassengerAlertsPage';
import PassengerTicketsPage from '@/pages/passenger/PassengerTicketsPage';
import PaymentsPage from '@/pages/passenger/PaymentsPage';
import ProfilePage from '@/pages/passenger/ProfilePage';
import TripPage from '@/pages/passenger/TripPage';
import ReportsPage from '@/pages/reports/ReportsPage';
import TicketsPage from '@/pages/tickets/TicketsPage';
import UsersPage from '@/pages/users/UsersPage';
import ValidationsPage from '@/pages/validations/ValidationsPage';
import ProtectedRoute, { RoleRedirect } from './ProtectedRoute';

export const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },

  // Admin area
  {
    element: <ProtectedRoute role="Admin" />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { path: '/dashboard', element: <DashboardPage /> },
          { path: '/tickets', element: <TicketsPage /> },
          { path: '/validations', element: <ValidationsPage /> },
          { path: '/users', element: <UsersPage /> },
          { path: '/ai', element: <AiPage /> },
          { path: '/alerts', element: <AlertsPage /> },
          { path: '/complaints', element: <ComplaintsPage /> },
          { path: '/reports', element: <ReportsPage /> },
          { path: '/network', element: <NetworkPage /> },
        ],
      },
    ],
  },

  // Passenger area (same services as the mobile app)
  {
    element: <ProtectedRoute role="Passenger" />,
    children: [
      {
        path: '/app',
        element: <PassengerLayout />,
        children: [
          { index: true, element: <HomePage /> },
          { path: 'trip', element: <TripPage /> },
          { path: 'tickets', element: <PassengerTicketsPage /> },
          { path: 'payments', element: <PaymentsPage /> },
          { path: 'alerts', element: <PassengerAlertsPage /> },
          { path: 'profile', element: <ProfilePage /> },
        ],
      },
    ],
  },

  { path: '*', element: <RoleRedirect /> },
]);
