import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { enrollmentSchema } from '@/schemas/enrollment'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'

const STATUS_OPTIONS = [
  { value: 'active', label: 'Ativo' },
  { value: 'completed', label: 'Concluido' },
  { value: 'cancelled', label: 'Cancelado' },
]

const PAYMENT_STATUS_OPTIONS = [
  { value: 'pending', label: 'Pendente' },
  { value: 'paid', label: 'Pago' },
  { value: 'refunded', label: 'Reembolsado' },
]

/**
 * EnrollmentForm — controlled form for enrolling a student in a course.
 *
 * @param {function} props.onSubmit - Called with validated form data
 * @param {function} props.onCancel - Called when the user cancels
 * @param {object}  [props.defaultValues] - Pre-fills form fields (e.g. course_id)
 */
export function EnrollmentForm({ onSubmit, onCancel, defaultValues }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(enrollmentSchema),
    defaultValues: defaultValues ?? { status: 'active', payment_status: 'pending' },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="ID do Cliente *"
          type="number"
          min={1}
          error={errors.student_id?.message}
          {...register('student_id')}
        />

        <Input
          label="ID do Curso *"
          type="number"
          min={1}
          error={errors.course_id?.message}
          {...register('course_id')}
        />
      </div>

      <Input
        label="Data de Inscricao"
        type="date"
        error={errors.enrollment_date?.message}
        {...register('enrollment_date')}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
          label="Estado"
          options={STATUS_OPTIONS}
          error={errors.status?.message}
          {...register('status')}
        />

        <Select
          label="Estado do Pagamento"
          options={PAYMENT_STATUS_OPTIONS}
          error={errors.payment_status?.message}
          {...register('payment_status')}
        />
      </div>

      <Input
        label="Notas"
        error={errors.notes?.message}
        {...register('notes')}
      />

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
          Inscrever
        </Button>
      </div>
    </form>
  )
}
