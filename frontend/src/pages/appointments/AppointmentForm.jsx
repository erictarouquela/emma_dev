import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { appointmentSchema } from '@/schemas/appointment'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'

const STATUS_OPTIONS = [
  { value: 'pending', label: 'Pendente' },
  { value: 'confirmed', label: 'Confirmado' },
  { value: 'completed', label: 'Concluido' },
  { value: 'cancelled', label: 'Cancelado' },
]

export function AppointmentForm({ onSubmit, onCancel, defaultValues }) {
  const [submitError, setSubmitError] = useState(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(appointmentSchema),
    defaultValues: defaultValues ?? { status: 'pending' },
  })

  async function handleFormSubmit(data) {
    setSubmitError(null)
    try {
      await onSubmit(data)
    } catch (err) {
      setSubmitError(
        err?.response?.data?.message ?? 'Ocorreu um erro ao guardar a marcacao.',
      )
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} noValidate className="space-y-8">
      {/* Section 1: Dados da Marcacao */}
      <div>
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-4">
          Dados da Marcacao
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="ID do Cliente *"
              type="number"
              error={errors.student_id?.message}
              {...register('student_id')}
            />
            <Input
              label="Data *"
              type="date"
              error={errors.appointment_date?.message}
              {...register('appointment_date')}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Hora Inicio *"
              type="time"
              error={errors.start_time?.message}
              {...register('start_time')}
            />
            <Input
              label="Hora Fim"
              type="time"
              error={errors.end_time?.message}
              {...register('end_time')}
            />
          </div>
        </div>
      </div>

      {/* Section 2: Servico */}
      <div>
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-4">
          Servico
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Tipo de Servico"
              error={errors.service_type?.message}
              {...register('service_type')}
            />
            <Input
              label="Terapeuta"
              error={errors.therapist_name?.message}
              {...register('therapist_name')}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Preco (EUR)"
              type="number"
              error={errors.price?.message}
              {...register('price')}
            />
            <Select
              label="Estado"
              options={STATUS_OPTIONS}
              error={errors.status?.message}
              {...register('status')}
            />
          </div>
          <Input
            label="Notas"
            error={errors.notes?.message}
            {...register('notes')}
          />
        </div>
      </div>

      {/* API error */}
      {submitError && (
        <p className="text-sm text-red-600 dark:text-red-400" role="alert">
          {submitError}
        </p>
      )}

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-200 dark:border-slate-800">
        <Button type="button" variant="ghost" onClick={onCancel} disabled={isSubmitting}>
          Cancelar
        </Button>
        <Button type="submit" loading={isSubmitting}>
          Guardar
        </Button>
      </div>
    </form>
  )
}
