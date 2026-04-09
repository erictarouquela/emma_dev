import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, X } from 'lucide-react'
import { billingSchema } from '@/schemas/billing'
import { formatCurrency } from '@/utils/currency'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'

const DOCUMENT_TYPE_OPTIONS = [
  { value: 'receipt', label: 'Recibo' },
  { value: 'invoice', label: 'Fatura' },
  { value: 'invoice_receipt', label: 'Fatura-Recibo' },
]

export function BillingDocumentForm({ onSubmit, onCancel }) {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(billingSchema),
    defaultValues: {
      document_type: 'receipt',
      items: [{ description: '', quantity: 1, unit_price: 0 }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  })

  const watchedItems = watch('items') ?? []

  const total = watchedItems.reduce((acc, item) => {
    const qty = parseFloat(item?.quantity) || 0
    const price = parseFloat(item?.unit_price) || 0
    return acc + qty * price
  }, 0)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="ID do Cliente *"
        type="number"
        error={errors.student_id?.message}
        {...register('student_id')}
      />

      <Controller
        name="document_type"
        control={control}
        render={({ field }) => (
          <Select
            label="Tipo de Documento"
            options={DOCUMENT_TYPE_OPTIONS}
            error={errors.document_type?.message}
            {...field}
          />
        )}
      />

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Itens
          </span>
          <Button
            type="button"
            variant="ghost"
            onClick={() => append({ description: '', quantity: 1, unit_price: 0 })}
          >
            <Plus className="w-4 h-4 mr-1" />
            Adicionar item
          </Button>
        </div>

        {errors.items?.root && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {errors.items.root.message}
          </p>
        )}
        {typeof errors.items?.message === 'string' && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {errors.items.message}
          </p>
        )}

        {fields.map((field, index) => {
          const qty = parseFloat(watchedItems[index]?.quantity) || 0
          const price = parseFloat(watchedItems[index]?.unit_price) || 0
          const lineTotal = qty * price

          return (
            <div
              key={field.id}
              className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-3 space-y-3"
            >
              <div className="flex items-start gap-2">
                <div className="flex-1 space-y-3">
                  <Input
                    label="Descricao"
                    error={errors.items?.[index]?.description?.message}
                    {...register(`items.${index}.description`)}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      label="Quantidade"
                      type="number"
                      error={errors.items?.[index]?.quantity?.message}
                      {...register(`items.${index}.quantity`)}
                    />
                    <Input
                      label="Preco Unit. (EUR)"
                      type="number"
                      step="0.01"
                      error={errors.items?.[index]?.unit_price?.message}
                      {...register(`items.${index}.unit_price`)}
                    />
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 text-right">
                    Subtotal:{' '}
                    <span className="font-medium text-slate-700 dark:text-slate-200">
                      {formatCurrency(lineTotal)}
                    </span>
                  </p>
                </div>

                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="mt-6 p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
                    aria-label="Remover item"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )
        })}

        <div className="flex justify-end pt-1">
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">
            Total:{' '}
            <span className="text-emerald-700 dark:text-emerald-400">
              {formatCurrency(total)}
            </span>
          </p>
        </div>
      </div>

      <Input
        label="Notas"
        error={errors.notes?.message}
        {...register('notes')}
      />

      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary" loading={isSubmitting}>
          Emitir Documento
        </Button>
      </div>
    </form>
  )
}
