import { api } from '@/services/axios'

/**
 * Authentication API service.
 * All calls return the full Axios response — components use .data.
 */
export const authApi = {
  /** POST /api/auth/login → { token, user } */
  login: (email, password) => api.post('/auth/login', { email, password }),

  /** POST /api/auth/register → { message } */
  register: (data) => api.post('/auth/register', data),

  /** POST /api/auth/logout (requires Bearer token) */
  logout: () => api.post('/auth/logout'),

  /** GET /api/user → { id, name, email } */
  getUser: () => api.get('/user'),
}
