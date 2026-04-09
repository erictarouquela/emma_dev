import { useState } from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import { useStudents } from '@/hooks/useStudents'
import { useToast } from '@/components/feedback/Toast'
import { ErrorMessage } from '@/components/feedback/ErrorMessage'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { DataTable } from '@/components/ui/DataTable'
import { SearchBar } from '@/components/ui/SearchBar'
import { Select } from '@/components/ui/Select'
import { Modal } from '@/components/ui/Modal'
import { StudentForm } from './StudentForm'
import { STUDENT_STATUS_LABELS } from '@/constants/enums'

const STATUS_FILTER_OPTIONS = [
  { value: '', label: 'Todos' },
  { value: 'active', label: 'Ativos' },
  { value: 'inactive', label: 'Inativos' },
]

export function StudentsPage() {
  const { students, loading, error, refetch, createStudent, updateStudent, deleteStudent } = useStudents()
  const { addToast } = useToast()

  const [modalOpen, setModalOpen] = useState(false)
  const [editStudent, setEditStudent] = useState(null)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      !search ||
      `${s.first_name} ${s.last_name}`.toLowerCase().includes(search.toLowerCase()) ||
      s.email?.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = !statusFilter || s.status === statusFilter
    return matchesSearch && matchesStatus
  })

  function openEdit(student) {
    setEditStudent(student)
  }

  async function handleCreate(data) {
    try {
      await createStudent(data)
      addToast('Cliente criado com sucesso!', 'success')
      setModalOpen(false)
    } catch (err) {
      addToast('Erro ao criar cliente.', 'error')
      throw err // Let StudentForm handle field errors
    }
  }

  async function handleDelete(student) {
    if (!window.confirm(`Eliminar "${student.first_name} ${student.last_name ?? ''}"?`)) return
    try {
      await deleteStudent(student.id)
      addToast('Cliente eliminado.', 'success')
    } catch {
      addToast('Erro ao eliminar cliente.', 'error')
    }
  }

  async function handleUpdate(data) {
    try {
      await updateStudent(editStudent.id, data)
      addToast('Cliente atualizado!', 'success')
      setEditStudent(null)
    } catch (err) {
      addToast('Erro ao atualizar cliente.', 'error')
      throw err
    }
  }

  const columns = [
    {
      key: 'name',
      header: 'Nome',
      render: (row) => `${row.first_name} ${row.last_name ?? ''}`.trim(),
    },
    {
      key: 'email',
      header: 'Email',
      render: (row) => row.email ?? '—',
    },
    {
      key: 'phone_number',
      header: 'Telefone',
      render: (row) => row.phone_number ?? '—',
    },
    {
      key: 'status',
      header: 'Estado',
      render: (row) => (
        <Badge variant={row.status === 'active' ? 'success' : 'neutral'}>
          {STUDENT_STATUS_LABELS[row.status] ?? row.status}
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: '',
      render: (row) => (
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => { e.stopPropagation(); openEdit(row) }}
            aria-label="Editar cliente"
            className="text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-400 p-1 rounded transition-colors"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleDelete(row) }}
            aria-label="Eliminar cliente"
            className="text-slate-400 hover:text-red-600 dark:hover:text-red-400 p-1 rounded transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
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
              Clientes / Alunos
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Gestao de clientes e alunos
            </p>
          </div>
          <Button onClick={() => setModalOpen(true)}>Novo Cliente</Button>
        </div>

        {/* Error state */}
        {error && (
          <div className="mb-6">
            <ErrorMessage
              message="Falha ao carregar clientes."
              onRetry={refetch}
            />
          </div>
        )}

        {/* Search + Filter row */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Pesquisar por nome ou email..."
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
            data={filteredStudents}
            loading={loading}
            emptyMessage="Nenhum cliente encontrado."
          />
        </Card>

        {/* Create Modal */}
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Novo Cliente"
          size="lg"
        >
          <StudentForm
            onSubmit={handleCreate}
            onCancel={() => setModalOpen(false)}
          />
        </Modal>

        {/* Edit Modal */}
        <Modal
          isOpen={!!editStudent}
          onClose={() => setEditStudent(null)}
          title="Editar Cliente"
          size="lg"
        >
          <StudentForm
            onSubmit={handleUpdate}
            onCancel={() => setEditStudent(null)}
            defaultValues={editStudent ?? undefined}
          />
        </Modal>
      </div>
    </div>
  )
}
