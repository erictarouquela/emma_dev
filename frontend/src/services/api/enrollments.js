import { api } from '@/services/axios'

export const enrollmentsApi = {
  getAll: (params) => api.get('/enrollments', { params }),
  create: (data) => api.post('/enrollments', data),
}
