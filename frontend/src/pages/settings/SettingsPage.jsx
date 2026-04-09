import { useAuth } from '@/contexts/AuthContext'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Avatar } from '@/components/ui/Avatar'

export function SettingsPage() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
            Configuracoes
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Perfil do utilizador e preferencias da conta
          </p>
        </div>

        {/* Profile Card */}
        <Card padding="md" className="mb-6">
          <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-4">
            Perfil
          </h2>
          <div className="flex items-center gap-4">
            <Avatar name={user?.name ?? 'U'} size="lg" />
            <div>
              <p className="text-base font-semibold text-slate-900 dark:text-slate-50">
                {user?.name ?? '—'}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {user?.email ?? '—'}
              </p>
              {user?.role && (
                <div className="mt-1">
                  <Badge variant="info">{user.role}</Badge>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Info Card */}
        <Card padding="md">
          <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-4">
            Informacoes da Conta
          </h2>
          <dl className="divide-y divide-slate-200 dark:divide-slate-800">
            <div className="py-3 flex justify-between">
              <dt className="text-sm text-slate-600 dark:text-slate-400">Nome</dt>
              <dd className="text-sm font-medium text-slate-900 dark:text-slate-50">
                {user?.name ?? '—'}
              </dd>
            </div>
            <div className="py-3 flex justify-between">
              <dt className="text-sm text-slate-600 dark:text-slate-400">Email</dt>
              <dd className="text-sm font-medium text-slate-900 dark:text-slate-50">
                {user?.email ?? '—'}
              </dd>
            </div>
            <div className="py-3 flex justify-between">
              <dt className="text-sm text-slate-600 dark:text-slate-400">Funcao</dt>
              <dd className="text-sm font-medium text-slate-900 dark:text-slate-50">
                {user?.role ?? '—'}
              </dd>
            </div>
            <div className="py-3 flex justify-between">
              <dt className="text-sm text-slate-600 dark:text-slate-400">ID</dt>
              <dd className="text-sm font-medium text-slate-900 dark:text-slate-50">
                {user?.id ?? '—'}
              </dd>
            </div>
          </dl>
        </Card>
      </div>
    </div>
  )
}
