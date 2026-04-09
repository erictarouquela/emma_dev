/**
 * RegisterPage — multi-step registration for new organizations and their admin user.
 * Step 1: Organization details. Step 2: Admin user credentials.
 */
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, Lock, ArrowLeft } from 'lucide-react'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Card } from '@/components/ui/Card'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/components/feedback/Toast'
import { ROUTES } from '@/constants/routes'
import { registerStep1Schema as step1Schema, registerStep2Schema as step2Schema } from '@/schemas/auth'

// ─── Constants ────────────────────────────────────────────────────────────────

const TYPE_OPTIONS = [
  { value: 'clinic', label: 'Clinica' },
  { value: 'school', label: 'Escola' },
  { value: 'both', label: 'Ambos' },
]

const TIMEZONE_OPTIONS = [
  { value: 'Europe/Lisbon', label: 'Lisboa (UTC+0/+1)' },
  { value: 'Europe/Madrid', label: 'Madrid (UTC+1/+2)' },
  { value: 'UTC', label: 'UTC' },
]

// ─── Step indicator ───────────────────────────────────────────────────────────

function StepIndicator({ current, total }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-6">
      {Array.from({ length: total }, (_, i) => {
        const step = i + 1
        const isActive = step === current
        const isDone = step < current
        return (
          <div key={step} className="flex items-center gap-3">
            <div
              className={[
                'w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-colors',
                isActive
                  ? 'bg-emerald-800 text-white dark:bg-emerald-600'
                  : isDone
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-400'
                  : 'bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500',
              ].join(' ')}
            >
              {step}
            </div>
            {step < total && (
              <div
                className={[
                  'h-px w-10 transition-colors',
                  isDone
                    ? 'bg-emerald-400 dark:bg-emerald-600'
                    : 'bg-slate-200 dark:bg-slate-700',
                ].join(' ')}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export function RegisterPage() {
  const { register: registerFn } = useAuth()
  const { addToast } = useToast()
  const navigate = useNavigate()

  const [step, setStep] = useState(1)
  const [step1Data, setStep1Data] = useState(null)
  const [apiError, setApiError] = useState('')

  // Step 1 form
  const form1 = useForm({
    resolver: zodResolver(step1Schema),
    defaultValues: { name: '', type: '', timezone: '' },
  })

  // Step 2 form
  const form2 = useForm({
    resolver: zodResolver(step2Schema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  })

  // ── Step 1 submit ──
  function onStep1Submit(data) {
    setStep1Data(data)
    setStep(2)
  }

  // ── Step 2 submit ──
  async function onStep2Submit(data) {
    setApiError('')
    // Strip confirmPassword — it's a client-side validation field only
    const { confirmPassword: _, ...userFields } = data
    const payload = {
      organization: step1Data,
      user: userFields,
    }
    try {
      await registerFn(payload)
      addToast('Conta criada com sucesso!', 'success')
      navigate(ROUTES.LOGIN)
    } catch (err) {
      if (err?.response?.status === 422) {
        setApiError(err.response.data?.message ?? 'Dados invalidos. Verifique os campos.')
      } else {
        addToast('Erro ao criar conta. Tente novamente.', 'error')
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-emerald-800 dark:text-emerald-400">
            EMMA
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Gestao de Clinica &amp; Escola
          </p>
        </div>

        <Card padding="lg" className="shadow-lg">
          <StepIndicator current={step} total={2} />

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
              {step === 1 ? 'Criar nova conta' : 'Dados do administrador'}
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              {step === 1
                ? 'Passo 1 de 2 — Informacoes da organizacao'
                : 'Passo 2 de 2 — Conta de acesso'}
            </p>
          </div>

          {/* ── Step 1 ── */}
          {step === 1 && (
            <form onSubmit={form1.handleSubmit(onStep1Submit)} noValidate className="space-y-4">
              <Input
                label="Nome da Organizacao"
                placeholder="Ex: Clinica Saude Total"
                error={form1.formState.errors.name?.message}
                {...form1.register('name')}
              />

              <Select
                label="Tipo"
                placeholder="Selecionar tipo..."
                options={TYPE_OPTIONS}
                error={form1.formState.errors.type?.message}
                {...form1.register('type')}
              />

              <Select
                label="Fuso Horario"
                placeholder="Selecionar fuso horario..."
                options={TIMEZONE_OPTIONS}
                error={form1.formState.errors.timezone?.message}
                {...form1.register('timezone')}
              />

              <Button type="submit" fullWidth size="lg" className="mt-2">
                Continuar
              </Button>
            </form>
          )}

          {/* ── Step 2 ── */}
          {step === 2 && (
            <form onSubmit={form2.handleSubmit(onStep2Submit)} noValidate className="space-y-4">
              <Input
                label="Nome completo"
                placeholder="Ex: Ana Silva"
                error={form2.formState.errors.name?.message}
                {...form2.register('name')}
              />

              <Input
                label="Email"
                type="email"
                icon={Mail}
                placeholder="seu@email.com"
                error={form2.formState.errors.email?.message}
                {...form2.register('email')}
              />

              <Input
                label="Senha"
                type="password"
                icon={Lock}
                placeholder="Minimo 8 caracteres"
                error={form2.formState.errors.password?.message}
                {...form2.register('password')}
              />

              <Input
                label="Confirmar Senha"
                type="password"
                icon={Lock}
                placeholder="Repita a senha"
                error={form2.formState.errors.confirmPassword?.message}
                {...form2.register('confirmPassword')}
              />

              {/* API error message */}
              {apiError && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 px-4 py-3 text-sm text-red-700 dark:text-red-400"
                >
                  {apiError}
                </div>
              )}

              <Button
                type="submit"
                fullWidth
                size="lg"
                loading={form2.formState.isSubmitting}
                className="mt-2"
              >
                Criar Conta
              </Button>

              <button
                type="button"
                onClick={() => {
                  setApiError('')
                  setStep(1)
                }}
                className="flex items-center justify-center gap-1.5 w-full text-sm text-slate-600 dark:text-slate-400 hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors mt-1"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar
              </button>
            </form>
          )}

          <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
            Ja tem conta?{' '}
            <Link
              to={ROUTES.LOGIN}
              className="font-medium text-emerald-800 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors"
            >
              Entrar
            </Link>
          </p>
        </Card>
      </div>
    </div>
  )
}
