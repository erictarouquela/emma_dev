import { z } from 'zod'

export const courseSchema = z.object({
  name: z.string().min(1, 'Nome obrigatorio'),
  description: z.string().optional(),
  duration_hours: z.coerce.number().min(1).optional(),
  price: z.coerce.number().min(0, 'Preco invalido').optional(),
  max_students: z.coerce.number().min(1).optional(),
  status: z.enum(['active', 'inactive']).default('active'),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
})
