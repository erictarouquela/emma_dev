import { z } from 'zod'

export const billingSchema = z.object({
  student_id: z.coerce.number().min(1, 'Cliente obrigatorio'),
  document_type: z.enum(['invoice', 'receipt', 'invoice_receipt']).default('receipt'),
  items: z
    .array(
      z.object({
        description: z.string().min(1, 'Descricao obrigatoria'),
        quantity: z.coerce.number().min(1, 'Quantidade minima e 1'),
        unit_price: z.coerce.number().min(0, 'Preco invalido'),
      })
    )
    .min(1, 'Pelo menos um item obrigatorio'),
  notes: z.string().optional(),
})
