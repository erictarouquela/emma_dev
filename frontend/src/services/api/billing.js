import { api } from '@/services/axios'

export const billingApi = {
  createDocument: (data) => api.post('/billing/documents', data),
}
