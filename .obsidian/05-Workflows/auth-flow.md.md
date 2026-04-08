# Fluxo de Autenticação — EMMA

## Visão Geral
Autenticação via **Laravel Sanctum** (token-based SPA).  
O frontend gere o token e o estado de auth via React Context.

## Fluxo de Login
```
1. Utilizador acede /login
2. Preenche email + senha
3. Validação local (Zod: email válido, senha ≥ 8 chars)
4. POST /api/auth/login { email, password }
5. Backend valida credenciais
6. Response 200 → { token, user }
7. Salvar token no AuthContext + localStorage
8. Configurar Axios header: Authorization: Bearer {token}
9. Redirect → /dashboard
```

## Fluxo de Registo
```
1. Utilizador acede /register
2. Preenche dados da organização + dados do admin
3. Validação local (Zod)
4. POST /api/auth/register { organization: {...}, user: {...} }
5. Response sucesso → redirect /login com toast "Conta criada"
6. Response erro → exibir mensagens de validação
```

## Fluxo de Logout
```
1. Utilizador clica "Sair" na sidebar
2. POST /api/auth/logout (com token)
3. Limpar token do AuthContext + localStorage
4. Remover header Authorization do Axios
5. Redirect → /login
```

## Verificação de Sessão (App Init)
```
1. App inicia
2. Verificar se existe token no localStorage
3. Se SIM → GET /api/user para validar token
   3a. Response 200 → utilizador autenticado, carregar app
   3b. Response 401 → token expirado, limpar e redirect /login
4. Se NÃO → redirect /login
```

## AuthContext
```jsx
// contexts/AuthContext.jsx
const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [loading, setLoading] = useState(true)

  // Verificar token ao iniciar
  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      api.get('/user')
        .then(res => setUser(res.data))
        .catch(() => logout())
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password })
    setToken(res.data.token)
    setUser(res.data.user)
    localStorage.setItem('token', res.data.token)
    api.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`
  }

  const logout = () => {
    api.post('/auth/logout').catch(() => {})
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
    delete api.defaults.headers.common['Authorization']
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}
```

## Rotas Protegidas
```jsx
function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()
  if (loading) return <LoadingScreen />
  return isAuthenticated ? children : <Navigate to="/login" />
}
```

## Tratamento de Erros
| Erro | Causa | Ação Frontend |
|---|---|---|
| 401 | Token inválido/expirado | Limpar auth, redirect /login |
| 422 | Credenciais inválidas | Exibir mensagem no formulário |
| 500 | Erro do servidor | Toast "Erro interno, tente novamente" |
| Network Error | Sem conexão | Toast "Verifique a sua ligação" |

## Axios Interceptor Global
```jsx
// services/axios.js
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)
```
