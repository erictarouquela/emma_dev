/**
 * LoginPage — split-panel design with EMMA brand panel.
 * Left: login form. Right: dark emerald brand panel with logo.
 */
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, Lock, ArrowRight } from 'lucide-react'

import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/components/feedback/Toast'
import { loginSchema } from '@/schemas/auth'
import { ROUTES } from '@/constants/routes'

const STAGGER = (i) => ({
  animation: 'fadeSlideUp 0.5s ease both',
  animationDelay: `${i * 0.07}s`,
})

const inputClass =
  'w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-slate-50 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-600 dark:focus:ring-emerald-500 focus:border-transparent transition-all'

export function LoginPage() {
  const { login } = useAuth()
  const { addToast } = useToast()
  const navigate = useNavigate()
  const [apiError, setApiError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema) })

  async function onSubmit(data) {
    setApiError('')
    try {
      await login(data.email, data.password)
      navigate(ROUTES.DASHBOARD)
    } catch (err) {
      if (err?.response?.status === 422) {
        setApiError(err.response.data?.message ?? 'Credenciais invalidas.')
      } else {
        addToast('Erro ao fazer login. Tente novamente.', 'error')
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 dark:bg-slate-950">
      {/* ── Main split panel ─────────────────────────────────────────── */}
      <div className="flex flex-1 items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-4xl flex rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/5 dark:ring-white/5">

          {/* ── Left: Form ────────────────────────────────────────────── */}
          <div className="flex-1 bg-white dark:bg-slate-900 flex flex-col px-10 py-12 lg:px-14 lg:py-14">

            {/* Brand */}
            <div style={STAGGER(0)}>
              <span className="text-xs font-bold tracking-[0.2em] text-emerald-800 dark:text-emerald-400 uppercase">
                EMMA
              </span>
            </div>

            {/* Heading */}
            <div className="mt-10" style={STAGGER(1)}>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                Entrar na sua conta
              </h1>
              <p className="mt-2 text-sm text-emerald-700 dark:text-emerald-400 font-medium">
                Bem-vindo de volta. Insira os seus dados.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-8 flex-1 flex flex-col gap-5">

              {/* Email */}
              <div style={STAGGER(2)}>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Endereco de e-mail <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    type="email"
                    placeholder="nome@exemplo.com"
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                    {...register('email')}
                    className={inputClass}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-500 dark:text-red-400">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div style={STAGGER(3)}>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Palavra-passe
                  </label>
                  <button
                    type="button"
                    className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-300 transition-colors"
                  >
                    Esqueceu-se da senha?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    autoComplete="current-password"
                    aria-invalid={!!errors.password}
                    {...register('password')}
                    className={inputClass}
                  />
                </div>
                {errors.password && (
                  <p className="mt-1.5 text-xs text-red-500 dark:text-red-400">{errors.password.message}</p>
                )}
              </div>

              {/* Remember me */}
              <div className="flex items-center gap-2.5" style={STAGGER(4)}>
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 rounded accent-emerald-800 dark:accent-emerald-500 cursor-pointer"
                />
                <label
                  htmlFor="remember"
                  className="text-sm text-slate-600 dark:text-slate-400 cursor-pointer select-none"
                >
                  Lembrar-me neste dispositivo
                </label>
              </div>

              {/* API error */}
              {apiError && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 px-4 py-3 text-sm text-red-700 dark:text-red-400"
                >
                  {apiError}
                </div>
              )}

              {/* Submit */}
              <div style={STAGGER(5)}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-emerald-800 hover:bg-emerald-700 active:bg-emerald-900 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-full transition-colors duration-200 group"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      A entrar...
                    </span>
                  ) : (
                    <>
                      Entrar na plataforma
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>
              </div>

              {/* Register link */}
              <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-auto pt-4" style={STAGGER(6)}>
                Nao tem uma conta?{' '}
                <Link
                  to={ROUTES.REGISTER}
                  className="font-semibold text-slate-900 dark:text-slate-100 hover:text-emerald-800 dark:hover:text-emerald-400 transition-colors"
                >
                  Registe-se agora
                </Link>
              </p>
            </form>
          </div>

          {/* ── Right: Brand panel ────────────────────────────────────── */}
          <div
            className="hidden lg:flex w-[420px] flex-col p-10 relative overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, #1B4A38 0%, #0E2D20 55%, #071A12 100%)',
            }}
          >
            {/* Ambient glows */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  'radial-gradient(ellipse at 15% 85%, rgba(62,171,205,0.18) 0%, transparent 55%),' +
                  'radial-gradient(ellipse at 85% 15%, rgba(45,158,107,0.15) 0%, transparent 50%)',
              }}
            />

            {/* Logo as brand mark — centered */}
            <div className="relative z-10 flex-1 flex flex-col items-center justify-center gap-8">
              <img
                src="/logo-emma-clinica.svg"
                alt="EMMA"
                className="w-48 object-contain drop-shadow-lg"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
              <div className="text-center">
                <h2 className="text-[2rem] font-bold text-white leading-tight mb-3">
                  Elevando o padrao da{' '}
                  <span className="text-emerald-400">Gestao Clinica.</span>
                </h2>
                <p className="text-sm leading-relaxed text-emerald-100/60 max-w-xs">
                  Uma plataforma unificada para escolas e clinicas que priorizam a excelencia no atendimento e organizacao.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer ────────────────────────────────────────────────────── */}
      <footer className="bg-slate-900 dark:bg-slate-950 border-t border-white/5 px-8 py-3 flex items-center justify-center flex-shrink-0">
        <span className="text-xs text-slate-500">
          © 2026 EMMA. GESTAO DE CLINICA &amp; ESCOLA
        </span>
      </footer>
    </div>
  )
}
