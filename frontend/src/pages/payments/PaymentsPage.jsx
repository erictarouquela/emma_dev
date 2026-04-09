import { useState, useMemo } from 'react'
import { Plus, FileText } from 'lucide-react'
import { usePayments } from '@/hooks/usePayments'
import { useToast } from '@/components/feedback/Toast'
import { ErrorMessage } from '@/components/feedback/ErrorMessage'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { DataTable } from '@/components/ui/DataTable'
import { SearchBar } from '@/components/ui/SearchBar'
import { Select } from '@/components/ui/Select'
import { Modal } from '@/components/ui/Modal'
import { CurrencyDisplay } from '@/components/ui/CurrencyDisplay'
import { PaymentForm } from './PaymentForm'
import { BillingDocumentForm } from './BillingDocumentForm'
import { billingApi } from '@/services/api/billing'
import { PAYMENT_STATUS_LABELS } from '@/constants/enums'

const PAYMENT_METHOD_LABELS = {
  cash: 'Numerario',
  card: 'Cartao',
  transfer: 'Transferencia',
  sepa: 'SEPA',
}

const STATUS_BADGE_VARIANT = {
  pending: 'warning',
  completed: 'success',
  failed: 'danger',
  refunded: 'info',
}

const STATUS_FILTER_OPTIONS = [
  { value: '', label: 'Todos' },
  { value: 'pending', label: 'Pendente' },
  { value: 'completed', label: 'Concluido' },
  { value: 'failed', label: 'Falhado' },
  { value: 'refunded', label: 'Reembolsado' },
]

function formatDate(dateStr) {
  if (!dateStr) return '—'
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return '—'
  return d.toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

const columns = [
  {
    key: 'payment_date',
    header: 'Data',
    render: (row) => (
      <span className="text-slate-600 dark:text-slate-400">{formatDate(row.payment_date)}</span>
    ),
  },
  {
    key: 'student_id',
    header: 'Cliente',
    render: (row) => (
      <span className="text-slate-900 dark:text-slate-50">{row.student_id ?? '—'}</span>
    ),
  },
  {
    key: 'description',
    header: 'Descricao',
    render: (row) => (
      <span className="text-slate-600 dark:text-slate-400">{row.description || '—'}</span>
    ),
  },
  {
    key: 'payment_method',
    header: 'Metodo',
    render: (row) => (
      <span className="text-slate-600 dark:text-slate-400">
        {PAYMENT_METHOD_LABELS[row.payment_method] ?? row.payment_method ?? '—'}
      </span>
    ),
  },
  {
    key: 'amount',
    header: 'Valor',
    render: (row) => (
      <CurrencyDisplay
        amount={row.amount}
        className="font-medium text-slate-900 dark:text-slate-50"
      />
    ),
  },
  {
    key: 'status',
    header: 'Estado',
    render: (row) => (
      <Badge variant={STATUS_BADGE_VARIANT[row.status] ?? 'neutral'}>
        {PAYMENT_STATUS_LABELS[row.status] ?? row.status ?? '—'}
      </Badge>
    ),
  },
]

export function PaymentsPage() {
  const { payments, loading, error, refetch, createPayment } = usePayments()
  const { addToast } = useToast()

  const [paymentModalOpen, setPaymentModalOpen] = useState(false)
  const [billingModalOpen, setBillingModalOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const filtered = useMemo(() => {
    return payments.filter((p) => {
      const matchesSearch =
        !search ||
        (p.reference ?? '').toLowerCase().includes(search.toLowerCase()) ||
        (p.description ?? '').toLowerCase().includes(search.toLowerCase())

      const matchesStatus = !statusFilter || p.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [payments, search, statusFilter])

  async function handleCreatePayment(data) {
    try {
      await createPayment(data)
      addToast('Pagamento registado com sucesso!', 'success')
      setPaymentModalOpen(false)
    } catch {
      addToast('Erro ao registar pagamento.', 'error')
    }
  }

  async function handleCreateDocument(data) {
    try {
      await billingApi.createDocument(data)
      addToast('Documento emitido com sucesso!', 'success')
      setBillingModalOpen(false)
    } catch (err) {
      addToast('Erro ao emitir documento.', 'error')
      throw err
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 space-y-6">
      {/* Page header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">Pagamentos</h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Gere pagamentos e documentos de faturacao
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => setBillingModalOpen(true)}>
            <FileText className="w-4 h-4 mr-2" />
            Emitir Documento
          </Button>
          <Button variant="primary" onClick={() => setPaymentModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Novo Pagamento
          </Button>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <ErrorMessage
          message="Erro ao carregar pagamentos."
          onRetry={refetch}
        />
      )}

      {/* Filters */}
      <Card padding="md">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="flex-1">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Pesquisar por referencia ou descricao..."
            />
          </div>
          <div className="sm:w-52">
            <Select
              label="Estado"
              options={STATUS_FILTER_OPTIONS}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            />
          </div>
        </div>
      </Card>

      {/* Data table */}
      <Card padding="none">
        <DataTable
          columns={columns}
          data={filtered}
          loading={loading}
          emptyMessage="Nenhum pagamento encontrado."
        />
      </Card>

      {/* New payment modal */}
      <Modal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        title="Novo Pagamento"
        size="md"
      >
        <PaymentForm
          onSubmit={handleCreatePayment}
          onCancel={() => setPaymentModalOpen(false)}
        />
      </Modal>

      {/* Billing document modal */}
      <Modal
        isOpen={billingModalOpen}
        onClose={() => setBillingModalOpen(false)}
        title="Emitir Documento"
        size="lg"
      >
        <BillingDocumentForm
          onSubmit={handleCreateDocument}
          onCancel={() => setBillingModalOpen(false)}
        />
      </Modal>
    </div>
  )
}
