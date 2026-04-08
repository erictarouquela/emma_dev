# Padrões de Componentes — EMMA Frontend

## Convenções Gerais
- Um componente por arquivo, nomeado em **PascalCase**
- Props desestructuradas com valores default quando aplicável
- Separar UI (componente) e lógica (hook)
- Preferir composição sobre props condicionais complexas
- Validação de formulários com **React Hook Form + Zod**
- Ícones exclusivamente via **Lucide React**
- Estilização via **Tailwind CSS** com classes `dark:` para dark mode

## Design System — Paleta EMMA

### Light Mode (Modern Clinical)
| Token | Tailwind Class | Uso |
|---|---|---|
| Primary | `emerald-800` | Botões CTA, ícones ativos, sidebar |
| Background | `slate-50` | Fundo geral |
| Surface | `white` + border `slate-200` | Cards, painéis |
| Text Primary | `slate-900` | Títulos, headers |
| Text Secondary | `slate-600` | Descrições, corpo |
| Success | `green-500` | Marcações confirmadas, pagamentos OK |
| Warning | `amber-500` | Vouchers expirando, alertas |
| Error | `red-500` | Erros, cancelamentos |

### Dark Mode (Deep Wellness)
| Token | Tailwind Class | Uso |
|---|---|---|
| Primary | `emerald-400` / `emerald-600` (botões) | Destaques e CTAs |
| Background | `slate-950` | Fundo geral |
| Surface | `slate-900` + border `slate-800` | Cards, sidebar |
| Text Primary | `slate-50` | Títulos |
| Text Secondary | `slate-400` | Descrições |

### Tipografia
- Font family: **Inter** ou **Geist** (sans-serif moderna)
- Bordas arredondadas: `rounded-xl` (amigável e confortável)

## Padrão de Componente UI Base
```jsx
// components/ui/Button.jsx
import { Loader2 } from 'lucide-react'

const variants = {
  primary: 'bg-emerald-800 text-white hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500',
  secondary: 'bg-slate-200 text-slate-800 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200',
  danger: 'bg-red-600 text-white hover:bg-red-500',
}

export function Button({ children, variant = 'primary', loading = false, disabled = false, onClick, ...props }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`px-4 py-2 rounded-xl font-medium transition-colors disabled:opacity-50 ${variants[variant]}`}
      {...props}
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : children}
    </button>
  )
}
```

## Padrão de Hook com API
```jsx
// hooks/useStudents.js
import { useState, useEffect } from 'react'
import { studentsApi } from '../services/api/students'

export function useStudents() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    studentsApi.getAll()
      .then(res => setStudents(res.data))
      .catch(err => setError(err))
      .finally(() => setLoading(false))
  }, [])

  return { students, loading, error }
}
```

## Padrão de Service (API Layer)
```jsx
// services/api/students.js
import { api } from '../axios'

export const studentsApi = {
  getAll: () => api.get('/students'),
  create: (data) => api.post('/students', data),
}
```

## Padrão de Formulário (React Hook Form + Zod)
```jsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { studentSchema } from '../../schemas/student'

export function StudentForm({ onSubmit }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(studentSchema),
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('first_name')} />
      {errors.first_name && <span>{errors.first_name.message}</span>}
      {/* ... mais campos */}
    </form>
  )
}
```

## Regras de Negócio para UI (vem do backend, exibidas no frontend)
- **Vouchers**: Validade de 6 meses — alerta visual `amber-500` pulsante quando < 30 dias
- **Desmarcações**: Aviso da taxa de 5€ para cancelamentos < 24h
- **Atrasos**: Informar que atraso do cliente reduz tempo de massagem
- **Remarcações**: Devem ocorrer com mínimo 48h de antecedência
