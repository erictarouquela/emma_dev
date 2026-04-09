import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { paymentSchema } from '@/schemas/payment'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'

const PAYMENT_METHOD_OPTIONS = [
  { value: 'cash', label: 'Numerario' },
  { value: 'card', label: 'Cartao' },
  { value: 'transfer', label: 'Transferencia' },
  { value: 'sepa', label: 'SEPA' },
]

const PAYMENT_STATUS_OPTIONS = [
  { value: 'pending', label: 'Pendente' },
  { value: 'completed', label: 'Concluido' },
  { value: 'failed', label: 'Falhado' },
  { value: 'refunded', label: 'Reembolsado' },
]

export function PaymentForm({ onSubmit, onCancel, defaultValues }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(paymentSchema),
    defaultValues: defaultValues ?? {
      payment_method: 'cash',
      status: 'pending',
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="ID do Cliente *"
        type="number"
        error={errors.student_id?.message}
        {...register('student_id')}
      />

      <Input
        label="Valor (EUR) *"
        type="number"
        step="0.01"
        error={errors.amount?.message}
        {...register('amount')}
      />

      <Select
        label="Metodo de Pagamento"
        options={PAYMENT_METHOD_OPTIONS}
        error={errors.payment_method?.message}
        {...register('payment_method')}
      />

      <Select
        label="Estado"
        options={PAYMENT_STATUS_OPTIONS}
        error={errors.status?.message}
        {...register('status')}
      />

      <Input
        label="Data de Pagamento"
        type="date"
        error={errors.payment_date?.message}
        {...register('payment_date')}
      />

      <Input
        label="Descricao"
        error={errors.description?.message}
        {...register('description')}
      />

      <Input
        label="Referencia"
        error={errors.reference?.message}
        {...register('reference')}
      />

      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary" loading={isSubmitting}>
          Guardar
        </Button>
      </div>
    </form>
  )
}
