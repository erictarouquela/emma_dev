# Sidebar Component

## Descrição
Barra de navegação lateral fixa com ícones Lucide e indicador de rota ativa.

## Props
| Prop | Tipo | Descrição |
|---|---|---|
| `currentPath` | string | Rota atual para highlight |

## Itens de Navegação
| Label | Ícone (Lucide) | Rota |
|---|---|---|
| Dashboard | `LayoutDashboard` | `/dashboard` |
| Marcações | `Calendar` | `/appointments` |
| Clientes | `Users` | `/students` |
| Cursos | `GraduationCap` | `/courses` |
| Pagamentos | `CreditCard` | `/payments` |
| Configurações | `Settings` | `/settings` |

## Design
- **Light:** `bg-emerald-800` com ícones e texto `white`
- **Dark:** `dark:bg-slate-900` com bordas `dark:border-slate-800`
- Item ativo: fundo com opacidade `bg-white/10`
- Hover: transição suave `hover:bg-white/5`
- Logo EMMA no topo
- Botão de logout no fundo

## Implementação Base
```jsx
import { LayoutDashboard, Calendar, Users, GraduationCap, CreditCard, Settings, LogOut } from 'lucide-react'
import { useLocation, Link } from 'react-router-dom'

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { label: 'Marcações', icon: Calendar, path: '/appointments' },
  { label: 'Clientes', icon: Users, path: '/students' },
  { label: 'Cursos', icon: GraduationCap, path: '/courses' },
  { label: 'Pagamentos', icon: CreditCard, path: '/payments' },
  { label: 'Configurações', icon: Settings, path: '/settings' },
]

export function Sidebar() {
  const { pathname } = useLocation()

  return (
    <aside className="w-64 h-screen bg-emerald-800 dark:bg-slate-900 text-white flex flex-col">
      <div className="p-6 text-xl font-bold">EMMA</div>
      <nav className="flex-1 space-y-1 px-3">
        {navItems.map(({ label, icon: Icon, path }) => (
          <Link
            key={path}
            to={path}
            className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-colors
              ${pathname === path ? 'bg-white/10' : 'hover:bg-white/5'}`}
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
      <button className="flex items-center gap-3 px-6 py-4 hover:bg-white/5 transition-colors">
        <LogOut className="w-5 h-5" />
        <span>Sair</span>
      </button>
    </aside>
  )
}
```
