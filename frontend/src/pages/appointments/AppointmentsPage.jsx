import { useState } from 'react'
import { Pencil } from 'lucide-react'
import { useAppointments } from '@/hooks/useAppointments'
import { useToast } from '@/components/feedback/Toast'
import { ErrorMessage } from '@/components/feedback/ErrorMessage'
import { AlertBanner } from '@/components/feedback/AlertBanner'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { DataTable } from '@/components/ui/DataTable'
import { SearchBar } from '@/components/ui/SearchBar'
import { Select } from '@/components/ui/Select'
import { Modal } from '@/components/ui/Modal'
import { AppointmentForm } from './AppointmentForm'
import { APPOINTMENT_STATUS_LABELS } from '@/constants/enums'

const STATUS_FILTER_OPTIONS = [
  { value: '', label: 'Todos' },
  { value: 'pending', label: 'Pendente' },
  { value: 'confirmed', label: 'Confirmado' },
  { value: 'completed', label: 'Concluido' },
  { value: 'cancelled', label: 'Cancelado' },
]

const STATUS_BADGE_VARIANT = {
  pending: 'warning',
  confirmed: 'info',
  completed: 'success',
  cancelled: 'neutral',
}

export function AppointmentsPage() {
  const { appointments, loading, error, refetch, createAppointment, updateAppointment } =
    useAppointments()
  const { addToast } = useToast()

  const [modalOpen, setModalOpen] = useState(false)
  const [editAppointment, setEditAppointment] = useState(null)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [dismissCancellationBanner, setDismissCancellationBanner] = useState(false)
  const [dismissVoucherBanner, setDismissVoucherBanner] = useState(false)

  const filteredAppointments = appointments.filter((a) => {
    const matchesSearch =
      !search ||
      a.service_type?.toLowerCase().includes(search.toLowerCase()) ||
      a.therapist_name?.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = !statusFilter || a.status === statusFilter
    return matchesSearch && matchesStatus
  })

  function openEdit(appointment) {
    setEditAppointment(appointment)
  }

  async function handleCreate(data) {
    try {
      await createAppointment(data)
      addToast('Marcacao criada com sucesso!', 'success')
      setModalOpen(false)
    } catch (err) {
      addToast('Erro ao criar marcacao.', 'error')
      throw err
    }
  }

  async function handleUpdate(data) {
    try {
      await updateAppointment(editAppointment.id, data)
      addToast('Marcacao atualizada!', 'success')
      setEditAppointment(null)
    } catch (err) {
      addToast('Erro ao atualizar marcacao.', 'error')
      throw err
    }
  }

  const columns = [
    {
      key: 'appointment_date',
      header: 'Data',
      render: (row) => row.appointment_date ?? '—',
    },
    {
      key: 'start_time',
      header: 'Hora',
      render: (row) => row.start_time ?? '—',
    },
    {
      key: 'student_id',
      header: 'Cliente',
      render: (row) => row.student_id ?? '—',
    },
    {
      key: 'service_type',
      header: 'Servico',
      render: (row) => row.service_type ?? '—',
    },
    {
      key: 'therapist_name',
      header: 'Terapeuta',
      render: (row) => row.therapist_name ?? '—',
    },
    {
      key: 'status',
      header: 'Estado',
      render: (row) => (
        <Badge variant={STATUS_BADGE_VARIANT[row.status] ?? 'neutral'}>
          {APPOINTMENT_STATUS_LABELS[row.status] ?? row.status}
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: '',
      render: (row) => (
        <button
          onClick={(e) => {
            e.stopPropagation()
            openEdit(row)
          }}
          aria-label="Editar marcacao"
          className="text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-400 p-1 rounded transition-colors"
        >
          <Pencil className="w-4 h-4" />
        </button>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
              Marcacoes
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Gestao de marcacoes e agendamentos
            </p>
          </div>
          <Button onClick={() => setModalOpen(true)}>Nova Marcacao</Button>
        </div>

        {/* Alert Banners */}
        {!dismissCancellationBanner && (
          <div className="mb-4">
            <AlertBanner
              type="warning"
              message="Atencao: marcacoes canceladas com menos de 24h podem incorrer em taxa."
              onDismiss={() => setDismissCancellationBanner(true)}
            />
          </div>
        )}
        {!dismissVoucherBanner && (
          <div className="mb-6">
            <AlertBanner
              type="info"
              message="Verifique se existem vouchers proximos do prazo de validade."
              onDismiss={() => setDismissVoucherBanner(true)}
            />
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="mb-6">
            <ErrorMessage
              message="Falha ao carregar marcacoes."
              onRetry={refetch}
            />
          </div>
        )}

        {/* Search + Filter row */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Pesquisar por servico ou terapeuta..."
            className="flex-1"
          />
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={STATUS_FILTER_OPTIONS}
          />
        </div>

        {/* Data table */}
        <Card padding="none">
          <DataTable
            columns={columns}
            data={filteredAppointments}
            loading={loading}
            emptyMessage="Nenhuma marcacao encontrada."
          />
        </Card>

        {/* Create Modal */}
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Nova Marcacao"
          size="lg"
        >
          <AppointmentForm
            onSubmit={handleCreate}
            onCancel={() => setModalOpen(false)}
          />
        </Modal>

        {/* Edit Modal */}
        <Modal
          isOpen={!!editAppointment}
          onClose={() => setEditAppointment(null)}
          title="Editar Marcacao"
          size="lg"
        >
          <AppointmentForm
            onSubmit={handleUpdate}
            onCancel={() => setEditAppointment(null)}
            defaultValues={editAppointment ?? undefined}
          />
        </Modal>
      </div>
    </div>
  )
}
