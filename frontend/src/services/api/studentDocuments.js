import { api } from '@/services/axios'

export const studentDocumentsApi = {
  getAll: (params) => api.get('/student-documents', { params }),
  /**
   * Upload a student document — uses multipart/form-data.
   * @param {FormData} formData
   */
  upload: (formData) =>
    api.post('/student-documents', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
}
