# AGENT.md — EMMA Frontend

## Foco de Desenvolvimento
Estamos a desenvolver **apenas o frontend**. O backend (Laravel 13) ja esta deployado e funcional.
Nao criar, modificar ou assumir responsabilidade por codigo backend.

## Regras Obrigatorias

### 1. Zero Logica de Negocio
O frontend NAO processa dados. Apenas:
- Envia formularios validados (Zod) para a API
- Exibe dados retornados pela API
- Mostra erros da API ao utilizador

### 2. Dark Mode em TODOS os Componentes
Cada componente DEVE ter classes `dark:` do Tailwind.
- Light: `bg-slate-50`, `bg-white`, `text-slate-900`, `border-slate-200`
- Dark: `bg-slate-950`, `bg-slate-900`, `text-slate-50`, `border-slate-800`
- Primary light: `emerald-800` | Primary dark: `emerald-400` / `emerald-600`

### 3. Padrao de Componente
```jsx
// Um componente por ficheiro, PascalCase
// Props desestruturadas com defaults
// forwardRef quando necessario para React Hook Form
export function NomeComponente({ prop1, prop2 = 'default', ...props }) {
  return (...)
}
```

### 4. Padrao de Formulario
```jsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { schema } from '@/schemas/...'

const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(schema),
})
```

### 5. Padrao de Service API
```jsx
import { api } from '@/services/axios'

export const resourceApi = {
  getAll: (params) => api.get('/resource', { params }),
  create: (data) => api.post('/resource', data),
}
```

### 6. Padrao de Hook
```jsx
import { useState, useEffect } from 'react'

export function useResource() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  // fetch, return { data, loading, error, refetch }
}
```

### 7. Imports
Sempre usar alias `@/` para imports de `src/`:
```jsx
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/hooks/useAuth'
```

### 8. Responsividade
Mobile-first com breakpoints Tailwind (`sm:`, `md:`, `lg:`, `xl:`).

### 9. Stack Fixa
NAO adicionar bibliotecas fora da stack documentada:
- React 19, Vite 5, Tailwind 3.4, Axios, React Hook Form, @hookform/resolvers, Zod, React Router DOM, Lucide React

### 10. Documentacao
- Documentar decisoes em `.obsidian/`
- Consultar `.obsidian/02-Screens/` para specs de telas
- Consultar `.obsidian/04-Components/` para specs de componentes
- Consultar `.obsidian/05-Workflows/` para fluxos de utilizador
- Consultar `.obsidian/06-Prompts/` para tarefas detalhadas
