import { Calendar, Users, CreditCard, GraduationCap } from 'lucide-react'
import { useDashboard } from '@/hooks/useDashboard'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { DataTable } from '@/components/ui/DataTable'
import { ErrorMessage } from '@/components/feedback/ErrorMessage'
import { formatTime } from '@/utils/formatDate'
import {
  APPOINTMENT_STATUS_LABELS,
} from '@/constants/enums'

const STATUS_BADGE = {
  pending: 'warning',
  confirmed: 'success',
  completed: 'neutral',
  cancelled: 'danger',
}

function StatsCard({ icon: Icon, label, value, color, loading }) {
  const colors = {
    emerald: {
      bg: 'bg-emerald-100 dark:bg-emerald-900/30',
      icon: 'text-emerald-700 dark:text-emerald-400',
    },
    blue: {
      bg: 'bg-blue-100 dark:bg-blue-900/30',
      icon: 'text-blue-700 dark:text-blue-400',
    },
    amber: {
      bg: 'bg-amber-100 dark:bg-amber-900/30',
      icon: 'text-amber-700 dark:text-amber-400',
    },
    violet: {
      bg: 'bg-violet-100 dark:bg-violet-900/30',
      icon: 'text-violet-700 dark:text-violet-400',
    },
  }
  const c = colors[color] ?? colors.emerald

  return (
    <Card className="flex items-center gap-4">
      <div className={`p-3 rounded-xl ${c.bg}`}>
        <Icon className={`w-6 h-6 ${c.icon}`} />
      </div>
      <div className="min-w-0">
        <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
        {loading ? (
          <div className="h-7 w-16 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mt-1" />
        ) : (
          <p className="text-2xl font-bold text-slate-900 dark:text-slate-50">
            {value}
          </p>
        )}
      </div>
    </Card>
  )
}

const columns = [
  {
    key: 'time',
    header: 'Hora',
    render: (row) => formatTime(row.starts_at),
  },
  {
    key: 'student',
    header: 'Cliente',
    render: (row) =>
      row.student?.first_name
        ? `${row.student.first_name} ${row.student.last_name ?? ''}`.trim()
        : `#${row.student_id}`,
  },
  {
    key: 'status',
    header: 'Estado',
    render: (row) => (
      <Badge variant={STATUS_BADGE[row.status] ?? 'neutral'}>
        {APPOINTMENT_STATUS_LABELS[row.status] ?? row.status}
      </Badge>
    ),
  },
  {
    key: 'notes',
    header: 'Notas',
    render: (row) => row.notes ?? '—',
  },
]

export function DashboardPage() {
  const { loading, error, refetch, stats } = useDashboard()

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-6">
        <ErrorMessage
          message="Falha ao carregar dados do dashboard."
          onRetry={refetch}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Visão geral da clínica e escola
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard
            icon={Calendar}
            label="Marcações Hoje"
            value={stats.todayAppointments.length}
            color="emerald"
            loading={loading}
          />
          <StatsCard
            icon={Users}
            label="Total de Alunos"
            value={stats.totalStudents.length}
            color="blue"
            loading={loading}
          />
          <StatsCard
            icon={CreditCard}
            label="Pagamentos Pendentes"
            value={stats.pendingPayments.length}
            color="amber"
            loading={loading}
          />
          <StatsCard
            icon={GraduationCap}
            label="Inscrições Ativas"
            value={stats.activeEnrollments.length}
            color="violet"
            loading={loading}
          />
        </div>

        {/* Today's Appointments */}
        <Card>
          <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
              Marcações de Hoje
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              {loading
                ? 'A carregar...'
                : `${stats.todayAppointments.length} marcação${stats.todayAppointments.length !== 1 ? 'ões' : ''} para hoje`}
            </p>
          </div>
          <div className="p-6">
            {loading ? (
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="h-10 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse"
                  />
                ))}
              </div>
            ) : (
              <DataTable
                columns={columns}
                data={stats.todayAppointments}
                emptyMessage="Sem marcações para hoje."
              />
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
