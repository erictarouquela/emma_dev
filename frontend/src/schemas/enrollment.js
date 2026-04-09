import { z } from 'zod'

export const enrollmentSchema = z.object({
  student_id: z.coerce.number().min(1, 'Cliente obrigatorio'),
  course_id: z.coerce.number().min(1, 'Curso obrigatorio'),
  status: z.enum(['active', 'completed', 'cancelled']).default('active'),
  payment_status: z.enum(['pending', 'paid', 'refunded']).default('pending'),
  enrollment_date: z.string().optional(),
  notes: z.string().optional(),
})
