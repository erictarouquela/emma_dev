import { api } from '@/services/axios'

export const stripeApi = {
  /** Create a Stripe payment intent — backend processes, frontend only initiates. */
  createIntent: (data) => api.post('/payments/stripe/intents', data),
}
