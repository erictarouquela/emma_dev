import { cn } from '@/utils/cn'
import { useAuth } from '@/contexts/AuthContext'
import { useTheme } from '@/contexts/ThemeContext'
import { Avatar } from '@/components/ui/Avatar'
import { ROUTES } from '@/constants/routes'
import { useLocation } from 'react-router-dom'
import { Menu, Sun, Moon } from 'lucide-react'

const PAGE_TITLES = {
  [ROUTES.DASHBOARD]:    'Dashboard',
  [ROUTES.APPOINTMENTS]: 'Marcações',
  [ROUTES.STUDENTS]:     'Clientes / Alunos',
  [ROUTES.PAYMENTS]:     'Pagamentos',
  [ROUTES.COURSES]:      'Cursos',
  [ROUTES.SETTINGS]:     'Configurações',
}

export function Header({ onMenuClick }) {
  const { user } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const { pathname } = useLocation()

  const pageTitle = PAGE_TITLES[pathname] ?? 'EMMA'

  return (
    <header
      role="banner"
      className={cn(
        'h-16 bg-white dark:bg-slate-900',
        'border-b border-slate-200 dark:border-slate-800',
        'flex items-center px-4 gap-4',
        'sticky top-0 z-20',
      )}
    >
      {/* Mobile hamburger */}
      <button
        onClick={onMenuClick}
        aria-label="Abrir menu"
        className={cn(
          'md:hidden p-2 rounded-xl',
          'text-slate-500 hover:text-slate-700 hover:bg-slate-100',
          'dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800',
          'transition-colors',
        )}
      >
        <Menu size={20} aria-hidden="true" />
      </button>

      {/* Page title */}
      <h2 className="flex-1 text-base font-semibold text-slate-800 dark:text-slate-100 truncate">
        {pageTitle}
      </h2>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
          className={cn(
            'p-2 rounded-xl',
            'text-slate-500 hover:text-slate-700 hover:bg-slate-100',
            'dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800',
            'transition-colors',
          )}
        >
          {theme === 'dark' ? (
            <Sun size={18} aria-hidden="true" />
          ) : (
            <Moon size={18} aria-hidden="true" />
          )}
        </button>

        {/* User avatar */}
        <Avatar name={user?.name ?? 'U'} size="sm" />
      </div>
    </header>
  )
}
