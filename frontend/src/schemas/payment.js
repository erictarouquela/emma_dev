import { z } from 'zod'

export const paymentSchema = z.object({
  student_id: z.coerce.number().min(1, 'Cliente obrigatorio'),
  amount: z.coerce.number().min(0.01, 'Valor obrigatorio'),
  payment_method: z.enum(['card', 'transfer', 'cash', 'sepa']).default('cash'),
  status: z.enum(['pending', 'completed', 'failed', 'refunded']).default('pending'),
  description: z.string().optional(),
  payment_date: z.string().optional(),
  reference: z.string().optional(),
})
