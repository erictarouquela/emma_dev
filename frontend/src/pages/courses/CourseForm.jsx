import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { courseSchema } from '@/schemas/course'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'

const STATUS_OPTIONS = [
  { value: 'active', label: 'Ativo' },
  { value: 'inactive', label: 'Inativo' },
]

/**
 * CourseForm — controlled form for creating and editing courses.
 *
 * @param {function} props.onSubmit - Called with validated form data
 * @param {function} props.onCancel - Called when the user cancels
 * @param {object}  [props.defaultValues] - Pre-fills form fields for edit mode
 */
export function CourseForm({ onSubmit, onCancel, defaultValues }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(courseSchema),
    defaultValues: defaultValues ?? { status: 'active' },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      {/* Section: Informacoes do Curso */}
      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800 pb-2 w-full">
          Informacoes do Curso
        </legend>

        <Input
          label="Nome do Curso *"
          error={errors.name?.message}
          {...register('name')}
        />

        <Input
          label="Descricao"
          error={errors.description?.message}
          {...register('description')}
        />

        <Select
          label="Estado"
          options={STATUS_OPTIONS}
          error={errors.status?.message}
          {...register('status')}
        />
      </fieldset>

      {/* Section: Detalhes */}
      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800 pb-2 w-full">
          Detalhes
        </legend>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Duracao (horas)"
            type="number"
            min={1}
            error={errors.duration_hours?.message}
            {...register('duration_hours')}
          />

          <Input
            label="Maximo de Alunos"
            type="number"
            min={1}
            error={errors.max_students?.message}
            {...register('max_students')}
          />
        </div>

        <Input
          label="Preco (EUR)"
          type="number"
          min={0}
          step="0.01"
          error={errors.price?.message}
          {...register('price')}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Data de Inicio"
            type="date"
            error={errors.start_date?.message}
            {...register('start_date')}
          />

          <Input
            label="Data de Fim"
            type="date"
            error={errors.end_date?.message}
            {...register('end_date')}
          />
        </div>
      </fieldset>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          variant="primary"
          loading={isSubmitting}
        >
          Guardar
        </Button>
      </div>
    </form>
  )
}
