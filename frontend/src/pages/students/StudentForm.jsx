import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { studentSchema } from '@/schemas/student'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'

const GENDER_OPTIONS = [
  { value: '', label: 'Selecionar...' },
  { value: 'male', label: 'Masculino' },
  { value: 'female', label: 'Feminino' },
  { value: 'not_specified', label: 'Nao especificado' },
]

const STATUS_OPTIONS = [
  { value: 'active', label: 'Ativo' },
  { value: 'inactive', label: 'Inativo' },
]

export function StudentForm({ onSubmit, onCancel, defaultValues }) {
  const [submitError, setSubmitError] = useState(null)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(studentSchema),
    defaultValues: defaultValues ?? { status: 'active', no_publicidade: false },
  })

  async function handleFormSubmit(data) {
    setSubmitError(null)
    try {
      await onSubmit(data) // no_publicidade is now part of RHF-managed data
    } catch (err) {
      setSubmitError(
        err?.response?.data?.message ?? 'Ocorreu um erro ao guardar o cliente.',
      )
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} noValidate className="space-y-8">
      {/* Section 1: Dados Pessoais */}
      <div>
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-4">
          Dados Pessoais
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Nome *"
              error={errors.first_name?.message}
              {...register('first_name')}
            />
            <Input
              label="Apelido *"
              error={errors.last_name?.message}
              {...register('last_name')}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Email"
              type="email"
              error={errors.email?.message}
              {...register('email')}
            />
            <Input
              label="Telefone"
              type="tel"
              error={errors.phone_number?.message}
              {...register('phone_number')}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Data de Nascimento"
              type="date"
              error={errors.birth_date?.message}
              {...register('birth_date')}
            />
            <Select
              label="Genero"
              options={GENDER_OPTIONS}
              error={errors.gender?.message}
              {...register('gender')}
            />
          </div>
        </div>
      </div>

      {/* Section 2: Morada */}
      <div>
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-4">
          Morada
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Morada"
              error={errors.address_line1?.message}
              {...register('address_line1')}
            />
            <Input
              label="Cidade"
              error={errors.city?.message}
              {...register('city')}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Distrito / Regiao"
              error={errors.state_province?.message}
              {...register('state_province')}
            />
            <Input
              label="Codigo Postal"
              error={errors.postal_code?.message}
              {...register('postal_code')}
            />
          </div>
        </div>
      </div>

      {/* Section 3: Outros */}
      <div>
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-4">
          Outros
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="NIF / Numero de Identificacao Fiscal"
              error={errors.tax_id_number?.message}
              {...register('tax_id_number')}
            />
            <Select
              label="Estado"
              options={STATUS_OPTIONS}
              error={errors.status?.message}
              {...register('status')}
            />
          </div>

          {/* RGPD — controlled via react-hook-form */}
          <div className="pt-1">
            <Controller
              name="no_publicidade"
              control={control}
              render={({ field }) => (
                <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={field.value ?? false}
                    onChange={(e) => field.onChange(e.target.checked)}
                    className="w-4 h-4 rounded accent-emerald-700"
                  />
                  Nao receber comunicacoes de marketing
                </label>
              )}
            />
          </div>
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
