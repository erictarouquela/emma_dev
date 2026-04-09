import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { AuthProvider, useAuth } from '@/contexts/AuthContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { ToastProvider } from '@/components/feedback/Toast'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { LoadingScreen } from '@/components/feedback/LoadingScreen'
import { ROUTES } from '@/constants/routes'

// Lazy-loaded pages
const LoginPage = lazy(() => import('@/pages/auth/LoginPage').then((m) => ({ default: m.LoginPage })))
const RegisterPage = lazy(() => import('@/pages/auth/RegisterPage').then((m) => ({ default: m.RegisterPage })))
const DashboardPage = lazy(() => import('@/pages/dashboard/DashboardPage').then((m) => ({ default: m.DashboardPage })))
const StudentsPage = lazy(() => import('@/pages/students/StudentsPage').then((m) => ({ default: m.StudentsPage })))
const AppointmentsPage = lazy(() => import('@/pages/appointments/AppointmentsPage').then((m) => ({ default: m.AppointmentsPage })))
const PaymentsPage = lazy(() => import('@/pages/payments/PaymentsPage').then((m) => ({ default: m.PaymentsPage })))
const CoursesPage = lazy(() => import('@/pages/courses/CoursesPage').then((m) => ({ default: m.CoursesPage })))
const SettingsPage = lazy(() => import('@/pages/settings/SettingsPage').then((m) => ({ default: m.SettingsPage })))

/**
 * Guards protected routes — redirects unauthenticated users to /login.
 * Shows LoadingScreen during the initial auth token validation.
 */
function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()
  if (loading) return <LoadingScreen />
  return isAuthenticated ? children : <Navigate to={ROUTES.LOGIN} replace />
}

/**
 * Redirects already-authenticated users away from auth pages.
 */
function PublicRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()
  if (loading) return <LoadingScreen />
  return isAuthenticated ? <Navigate to={ROUTES.DASHBOARD} replace /> : children
}

function AppRoutes() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      {/* ⚠️ DEV MODE: Mock auth warning banner */}
      {import.meta.env.VITE_MOCK_AUTH === 'true' && (
        <div className="w-full bg-amber-50 dark:bg-amber-900/30 border-b border-amber-200 dark:border-amber-800 px-4 py-2 text-center text-sm font-medium text-amber-800 dark:text-amber-300">
          🧪 MODO TESTE: Login desativado. Remova <code className="bg-amber-100 dark:bg-amber-800 px-2 py-1 rounded">VITE_MOCK_AUTH</code> do <code className="bg-amber-100 dark:bg-amber-800 px-2 py-1 rounded">.env.local</code> para reverter.
        </div>
      )}
      <Routes>
        {/* Public routes */}
        <Route
          path={ROUTES.LOGIN}
          element={<PublicRoute><LoginPage /></PublicRoute>}
        />
        <Route
          path={ROUTES.REGISTER}
          element={<PublicRoute><RegisterPage /></PublicRoute>}
        />

        {/* Protected routes inside DashboardLayout */}
        <Route
          path={ROUTES.DASHBOARD}
          element={<PrivateRoute><DashboardLayout><DashboardPage /></DashboardLayout></PrivateRoute>}
        />
        <Route
          path={ROUTES.STUDENTS}
          element={<PrivateRoute><DashboardLayout><StudentsPage /></DashboardLayout></PrivateRoute>}
        />
        <Route
          path={ROUTES.APPOINTMENTS}
          element={<PrivateRoute><DashboardLayout><AppointmentsPage /></DashboardLayout></PrivateRoute>}
        />
        <Route
          path={ROUTES.COURSES}
          element={<PrivateRoute><DashboardLayout><CoursesPage /></DashboardLayout></PrivateRoute>}
        />
        <Route
          path={ROUTES.PAYMENTS}
          element={<PrivateRoute><DashboardLayout><PaymentsPage /></DashboardLayout></PrivateRoute>}
        />
        <Route
          path={ROUTES.SETTINGS}
          element={<PrivateRoute><DashboardLayout><SettingsPage /></DashboardLayout></PrivateRoute>}
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
      </Routes>
    </Suspense>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <ToastProvider>
            <AppRoutes />
          </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
