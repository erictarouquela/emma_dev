import { z } from 'zod'

export const studentSchema = z.object({
  first_name: z.string().min(1, 'Nome obrigatorio'),
  last_name: z.string().min(1, 'Apelido obrigatorio'),
  email: z.string().email('Email invalido').optional().or(z.literal('')),
  phone_number: z.string().optional(),
  birth_date: z.string().optional(),
  gender: z.enum(['male', 'female', 'not_specified']).optional(),
  address_line1: z.string().optional(),
  city: z.string().optional(),
  state_province: z.string().optional(),
  postal_code: z.string().optional(),
  country_id: z.number().optional(),
  nationality_country_id: z.number().optional(),
  tax_id_number: z.string().optional(),
  status: z.enum(['active', 'inactive']).default('active'),
  no_publicidade: z.boolean().default(false),
})
