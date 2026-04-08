# Input Component

## Descrição
Campo de texto reutilizável com label, error state e suporte a dark mode. Integra com React Hook Form.

## Props
| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `label` | string | — | Label acima do input |
| `name` | string | — | Nome do campo (para register do RHF) |
| `type` | string | `'text'` | Tipo do input (text, email, tel, date, number) |
| `placeholder` | string | — | Placeholder text |
| `error` | string | — | Mensagem de erro (vem do formState.errors) |
| `disabled` | boolean | `false` | Desativa o campo |
| `register` | function | — | Função register do React Hook Form |

## Exemplo de Uso
```jsx
<Input
  label="Email"
  type="email"
  placeholder="nome@example.com"
  error={errors.email?.message}
  {...register('email')}
/>
```

## Implementação Base
```jsx
import { forwardRef } from 'react'

export const Input = forwardRef(({ label, error, ...props }, ref) => (
  <div className="space-y-1">
    {label && <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label>}
    <input
      ref={ref}
      className={`w-full px-3 py-2 rounded-xl border transition-colors
        bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50
        ${error
          ? 'border-red-500 focus:ring-red-500'
          : 'border-slate-200 dark:border-slate-700 focus:ring-emerald-500'
        } focus:outline-none focus:ring-2`}
      {...props}
    />
    {error && <p className="text-sm text-red-500">{error}</p>}
  </div>
))
```
