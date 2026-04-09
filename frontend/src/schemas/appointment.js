import { z } from 'zod'

export const appointmentSchema = z.object({
  student_id: z.coerce.number({ required_error: 'Cliente obrigatorio' }).min(1, 'Cliente obrigatorio'),
  appointment_date: z.string().min(1, 'Data obrigatoria'),
  start_time: z.string().min(1, 'Hora obrigatoria'),
  end_time: z.string().optional(),
  service_type: z.string().optional(),
  therapist_name: z.string().optional(),
  status: z.enum(['pending', 'confirmed', 'completed', 'cancelled']).default('pending'),
  notes: z.string().optional(),
  price: z.coerce.number().min(0).optional(),
})
