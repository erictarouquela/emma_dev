import { useEffect, useRef, useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Calendar, Users, CreditCard,
  GraduationCap, Settings, LogOut, Sun, Moon,
  ChevronLeft, ChevronRight,
} from 'lucide-react'

import { cn } from '@/utils/cn'
import { useAuth } from '@/contexts/AuthContext'
import { useTheme } from '@/hooks/useTheme'
import { ROUTES } from '@/constants/routes'

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard',     path: ROUTES.DASHBOARD },
  { icon: Calendar,        label: 'Marcações',     path: ROUTES.APPOINTMENTS },
  { icon: Users,           label: 'Clientes',      path: ROUTES.STUDENTS },
  { icon: CreditCard,      label: 'Pagamentos',    path: ROUTES.PAYMENTS },
  { icon: GraduationCap,   label: 'Cursos',        path: ROUTES.COURSES },
  { icon: Settings,        label: 'Configurações', path: ROUTES.SETTINGS },
]

function getInitials(name) {
  if (!name) return 'U'
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

export function Sidebar({ isOpen, onClose, collapsed, onToggle }) {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const bottomRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!dropdownOpen) return
    function onPointerDown(e) {
      if (bottomRef.current && !bottomRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [dropdownOpen])

  function handleLogout() {
    setDropdownOpen(false)
    logout()
    navigate(ROUTES.LOGIN)
  }

  const initials = getInitials(user?.name)

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          'fixed left-0 top-0 h-full flex flex-col z-40',
          'bg-emerald-800 dark:bg-slate-900',
          'border-r border-emerald-700/50 dark:border-slate-800',
          'transition-all duration-300',
          // Mobile: full width when open, hidden when closed
          'w-60',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          // Desktop: always visible, width depends on collapsed state
          'md:translate-x-0',
          collapsed ? 'md:w-16' : 'md:w-60',
        )}
        role="navigation"
        aria-label="Menu principal"
      >

        {/* ── Brand + toggle ─────────────────────────────────────────── */}
        <div className={cn(
          'flex items-center border-b border-emerald-700/40 dark:border-slate-800 py-5',
          collapsed ? 'md:justify-center px-3' : 'justify-between px-5',
        )}>
          {/* Hide brand text on desktop when collapsed */}
          <div className={collapsed ? 'md:hidden' : ''}>
            <p className="text-xl font-bold tracking-widest text-white dark:text-emerald-200">
              EMMA
            </p>
            <p className="text-xs text-emerald-300/60 mt-0.5 tracking-wide">
              Clínica &amp; Escola
            </p>
          </div>

          {/* Collapse toggle — desktop only */}
          <button
            onClick={onToggle}
            className={cn(
              'hidden md:flex items-center justify-center w-7 h-7 rounded-md',
              'text-emerald-300/60 hover:text-white hover:bg-emerald-700/50',
              'transition-colors flex-shrink-0',
            )}
            aria-label={collapsed ? 'Expandir menu' : 'Recolher menu'}
          >
            {collapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
          </button>
        </div>

        {/* ── Navigation ─────────────────────────────────────────────── */}
        <nav className="flex-1 py-4 overflow-y-auto overflow-x-hidden">
          <ul className="space-y-0.5">
            {NAV_ITEMS.map(({ icon: Icon, label, path }) => (
              <li key={path} className="relative group/item">
                <NavLink
                  to={path}
                  end={path === ROUTES.DASHBOARD}
                  onClick={onClose}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 py-3 px-3 rounded-lg mx-2 text-sm font-medium',
                      'transition-colors border-l-2',
                      // Center icon when collapsed on desktop
                      collapsed ? 'md:justify-center' : '',
                      isActive
                        ? 'bg-emerald-900/50 dark:bg-emerald-800/30 text-white border-emerald-300'
                        : 'text-emerald-100 hover:bg-emerald-700/50 hover:text-white border-transparent',
                    )
                  }
                >
                  <Icon size={18} aria-hidden="true" className="flex-shrink-0" />

                  {/* Label: always visible on mobile, hidden on desktop when collapsed */}
                  <span className={collapsed ? 'md:hidden' : ''}>{label}</span>
                </NavLink>

                {/* Tooltip — desktop + collapsed only */}
                {collapsed && (
                  <span
                    className={cn(
                      'hidden md:block',
                      'pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-3',
                      'px-2.5 py-1 rounded-md bg-slate-900 text-white text-xs font-medium',
                      'whitespace-nowrap shadow-lg',
                      'opacity-0 group-hover/item:opacity-100 transition-opacity duration-150',
                    )}
                  >
                    {label}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* ── Bottom: Avatar + dropdown ───────────────────────────────── */}
        <div
          ref={bottomRef}
          className="relative border-t border-emerald-700/40 dark:border-slate-800 p-3"
        >

          {/* Dropdown menu */}
          {dropdownOpen && (
            <div
              className={cn(
                'absolute z-50 bg-slate-900 dark:bg-slate-800',
                'rounded-xl shadow-2xl border border-white/10 overflow-hidden',
                // Expanded: above the avatar, full width
                // Collapsed (desktop): to the right, fixed width
                collapsed
                  ? 'md:bottom-0 md:left-full md:ml-2 md:w-56 bottom-full mb-2 left-0 right-0'
                  : 'bottom-full mb-2 left-0 right-0',
              )}
            >
              {/* User header */}
              <div className="flex items-center gap-3 p-4 border-b border-white/10">
                <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
                  {initials}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white truncate">
                    {user?.name ?? 'Utilizador'}
                  </p>
                  <p className="text-xs text-slate-400 truncate">
                    {user?.email ?? ''}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="py-1.5">
                <Link
                  to={ROUTES.SETTINGS}
                  onClick={() => { setDropdownOpen(false); onClose() }}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
                >
                  <Settings size={15} className="text-slate-500 flex-shrink-0" />
                  Configurações
                </Link>

                <button
                  type="button"
                  onClick={() => { toggleTheme(); setDropdownOpen(false) }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
                >
                  {theme === 'dark'
                    ? <Sun size={15} className="text-slate-500 flex-shrink-0" />
                    : <Moon size={15} className="text-slate-500 flex-shrink-0" />
                  }
                  {theme === 'dark' ? 'Modo claro' : 'Modo escuro'}
                </button>
              </div>

              <div className="border-t border-white/10 py-1.5">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-white/5 hover:text-red-300 transition-colors"
                >
                  <LogOut size={15} className="flex-shrink-0" />
                  Sair
                </button>
              </div>
            </div>
          )}

          {/* Avatar button */}
          <button
            type="button"
            onClick={() => setDropdownOpen((prev) => !prev)}
            aria-expanded={dropdownOpen}
            aria-haspopup="true"
            className={cn(
              'flex items-center gap-3 w-full rounded-xl p-2 transition-colors',
              'hover:bg-emerald-700/40 dark:hover:bg-slate-800',
              collapsed ? 'md:justify-center' : '',
              dropdownOpen && 'bg-emerald-700/40 dark:bg-slate-800',
            )}
          >
            <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0 ring-2 ring-emerald-500/40">
              {initials}
            </div>

            {/* Name + role — hidden on desktop when collapsed */}
            <div className={cn('flex-1 min-w-0 text-left', collapsed ? 'md:hidden' : '')}>
              <p className="text-sm font-semibold text-white dark:text-white truncate leading-tight">
                {user?.name ?? 'Utilizador'}
              </p>
              <p className="text-xs text-emerald-50 dark:text-emerald-300 truncate">
                {user?.role ?? 'admin'}
              </p>
            </div>
          </button>
        </div>
      </aside>
    </>
  )
}
