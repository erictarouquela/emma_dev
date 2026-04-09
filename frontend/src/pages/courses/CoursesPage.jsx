import { useState } from 'react'
import { useCourses } from '@/hooks/useCourses'
import { useToast } from '@/components/feedback/Toast'
import { ErrorMessage } from '@/components/feedback/ErrorMessage'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { SearchBar } from '@/components/ui/SearchBar'
import { Select } from '@/components/ui/Select'
import { CourseCard } from '@/components/ui/CourseCard'
import { CourseForm } from './CourseForm'
import { EnrollmentForm } from './EnrollmentForm'
import { enrollmentsApi } from '@/services/api/enrollments'

const STATUS_FILTER_OPTIONS = [
  { value: '', label: 'Todos' },
  { value: 'active', label: 'Ativos' },
  { value: 'inactive', label: 'Inativos' },
]

function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl h-48 animate-pulse" />
  )
}

export function CoursesPage() {
  const { courses, loading, error, refetch, createCourse, updateCourse } = useCourses()
  const { addToast } = useToast()

  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [editModalCourse, setEditModalCourse] = useState(null)
  const [enrollModalCourse, setEnrollModalCourse] = useState(null)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  const filteredCourses = courses.filter((c) => {
    const matchesSearch =
      !search || c.name?.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = !statusFilter || c.status === statusFilter
    return matchesSearch && matchesStatus
  })

  async function handleCreate(data) {
    try {
      await createCourse(data)
      addToast('Curso criado com sucesso!', 'success')
      setCreateModalOpen(false)
    } catch (err) {
      addToast('Erro ao criar curso.', 'error')
      throw err
    }
  }

  async function handleUpdate(data) {
    try {
      await updateCourse(editModalCourse.id, data)
      addToast('Curso atualizado!', 'success')
      setEditModalCourse(null)
    } catch (err) {
      addToast('Erro ao atualizar curso.', 'error')
      throw err
    }
  }

  async function handleEnroll(data) {
    try {
      await enrollmentsApi.create(data)
      addToast('Inscricao realizada com sucesso!', 'success')
      setEnrollModalCourse(null)
    } catch (err) {
      addToast('Erro ao realizar inscricao.', 'error')
      throw err
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
              Cursos
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Gestao de cursos e inscricoes
            </p>
          </div>
          <Button onClick={() => setCreateModalOpen(true)}>Novo Curso</Button>
        </div>

        {/* Error state */}
        {error && (
          <div className="mb-6">
            <ErrorMessage
              message="Falha ao carregar cursos."
              onRetry={refetch}
            />
          </div>
        )}

        {/* Search + Filter row */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Pesquisar por nome do curso..."
            className="flex-1"
          />
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={STATUS_FILTER_OPTIONS}
          />
        </div>

        {/* Loading state — 6 skeleton cards */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Course grid */}
        {!loading && !error && (
          <>
            {filteredCourses.length === 0 ? (
              <div className="text-center py-16 text-slate-500 dark:text-slate-400">
                Nenhum curso encontrado.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    onEdit={setEditModalCourse}
                    onEnroll={setEnrollModalCourse}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* Create Modal */}
        <Modal
          isOpen={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          title="Novo Curso"
          size="lg"
        >
          <CourseForm
            onSubmit={handleCreate}
            onCancel={() => setCreateModalOpen(false)}
          />
        </Modal>

        {/* Edit Modal */}
        <Modal
          isOpen={!!editModalCourse}
          onClose={() => setEditModalCourse(null)}
          title="Editar Curso"
          size="lg"
        >
          <CourseForm
            onSubmit={handleUpdate}
            onCancel={() => setEditModalCourse(null)}
            defaultValues={editModalCourse ?? undefined}
          />
        </Modal>

        {/* Enroll Modal */}
        <Modal
          isOpen={!!enrollModalCourse}
          onClose={() => setEnrollModalCourse(null)}
          title="Inscrever Aluno"
          size="md"
        >
          <EnrollmentForm
            onSubmit={handleEnroll}
            onCancel={() => setEnrollModalCourse(null)}
            defaultValues={
              enrollModalCourse
                ? { course_id: enrollModalCourse.id, status: 'active', payment_status: 'pending' }
                : undefined
            }
          />
        </Modal>
      </div>
    </div>
  )
}
