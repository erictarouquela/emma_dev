import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Email invalido'),
  password: z.string().min(8, 'Minimo 8 caracteres'),
})

export const registerSchema = z.object({
  organization: z.object({
    name: z.string().min(1, 'Nome obrigatorio').max(200),
    type: z.enum(['clinic', 'school', 'both'], { required_error: 'Tipo obrigatorio' }),
    timezone: z.string().min(1, 'Fuso horario obrigatorio'),
  }),
  user: z.object({
    name: z.string().min(1, 'Nome obrigatorio').max(200),
    email: z.string().email('Email invalido'),
    password: z.string().min(8, 'Minimo 8 caracteres'),
    confirmPassword: z.string(),
  }),
}).refine((data) => data.user.password === data.user.confirmPassword, {
  message: 'As senhas nao coincidem',
  path: ['user', 'confirmPassword'],
})

// ─── Step schemas for RegisterPage multi-step form ───────────────────────────

export const registerStep1Schema = z.object({
  name: z.string().min(1, 'Nome obrigatorio').max(200),
  type: z.enum(['clinic', 'school', 'both'], { required_error: 'Tipo obrigatorio' }),
  timezone: z.string().min(1, 'Fuso horario obrigatorio'),
})

export const registerStep2Schema = z
  .object({
    name: z.string().min(1, 'Nome obrigatorio').max(200),
    email: z.string().email('Email invalido'),
    password: z.string().min(8, 'Minimo 8 caracteres'),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'As senhas nao coincidem',
    path: ['confirmPassword'],
  })
