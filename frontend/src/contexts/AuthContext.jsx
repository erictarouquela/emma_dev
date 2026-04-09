import { createContext, useContext, useEffect, useState } from 'react'
import { api } from '@/services/axios'
import { authApi } from '@/services/api/auth'

const AuthContext = createContext(null)

// ⚠️ DEV MODE: Mock auth bypass - remover quando terminar testes visuais
const MOCK_AUTH_ENABLED = import.meta.env.VITE_MOCK_AUTH === 'true'
const MOCK_USER = {
  id: 999,
  name: 'Utilizador Teste',
  email: 'teste@emma.local',
  role: 'admin',
}

/**
 * Provides authentication state and actions across the app.
 * Token is persisted in localStorage and injected into every Axios request.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem('token'))
  const [loading, setLoading] = useState(true)

  // Validate token on app init
  useEffect(() => {
    // ⚠️ DEV MODE: Simulate login bypass for visual testing
    if (MOCK_AUTH_ENABLED) {
      setUser(MOCK_USER)
      setLoading(false)
      return
    }

    if (!token) {
      setLoading(false)
      return
    }
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    authApi.getUser()
      .then((res) => setUser(res.data))
      .catch(() => {
        // Token invalid/expired — clear auth state
        localStorage.removeItem('token')
        setToken(null)
        delete api.defaults.headers.common['Authorization']
      })
      .finally(() => setLoading(false))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  async function login(email, password) {
    const res = await authApi.login(email, password)
    const { token: newToken, user: newUser } = res.data
    localStorage.setItem('token', newToken)
    api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
    setToken(newToken)
    setUser(newUser)
  }

  async function register(data) {
    await authApi.register(data)
  }

  function logout() {
    authApi.logout().catch(() => {})
    localStorage.removeItem('token')
    delete api.defaults.headers.common['Authorization']
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
