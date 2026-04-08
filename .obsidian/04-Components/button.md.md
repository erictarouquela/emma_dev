# Button Component

## Descrição
Botão reutilizável do design system EMMA com variantes, estados de loading e suporte a dark mode.

## Props
| Prop | Tipo | Default | Descrição |
|---|---|---|---|
| `children` | ReactNode | — | Conteúdo do botão |
| `variant` | `'primary' \| 'secondary' \| 'danger' \| 'ghost'` | `'primary'` | Estilo visual |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamanho |
| `loading` | boolean | `false` | Exibe spinner e desativa |
| `disabled` | boolean | `false` | Desativa o botão |
| `onClick` | function | — | Handler de click |
| `type` | `'button' \| 'submit'` | `'button'` | Tipo HTML |
| `fullWidth` | boolean | `false` | Ocupa 100% da largura |

## Variantes e Cores
| Variante | Light Mode | Dark Mode |
|---|---|---|
| `primary` | `bg-emerald-800 text-white` | `dark:bg-emerald-600` |
| `secondary` | `bg-slate-200 text-slate-800` | `dark:bg-slate-700 dark:text-slate-200` |
| `danger` | `bg-red-600 text-white` | `dark:bg-red-500` |
| `ghost` | `text-slate-600 hover:bg-slate-100` | `dark:text-slate-400 dark:hover:bg-slate-800` |

## Estados
| Estado | Visual |
|---|---|
| `default` | Cor normal, cursor pointer |
| `hover` | Cor mais clara, transição suave |
| `loading` | Spinner `Loader2` animado, pointer-events none |
| `disabled` | Opacidade 50%, cursor not-allowed |

## Exemplo de Uso
```jsx
import { Button } from '@/components/ui/Button'

// Primário
<Button onClick={handleSave}>Guardar</Button>

// Com loading
<Button loading={isSubmitting} type="submit">Enviar</Button>

// Danger
<Button variant="danger" onClick={handleDelete}>Eliminar</Button>

// Full width
<Button fullWidth>Entrar</Button>
```

## Implementação Base
```jsx
import { Loader2 } from 'lucide-react'

const variants = {
  primary: 'bg-emerald-800 text-white hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500',
  secondary: 'bg-slate-200 text-slate-800 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200',
  danger: 'bg-red-600 text-white hover:bg-red-500 dark:bg-red-500',
  ghost: 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
}

export function Button({ children, variant = 'primary', size = 'md', loading, disabled, fullWidth, ...props }) {
  return (
    <button
      disabled={disabled || loading}
      className={`rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''}`}
      {...props}
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : children}
    </button>
  )
}
```
