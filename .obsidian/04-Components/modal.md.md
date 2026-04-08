# Modal Component

## Descrição
Overlay modal para formulários e confirmações. Fecha com ESC ou click no backdrop.

## Props
| Prop | Tipo | Descrição |
|---|---|---|
| `isOpen` | boolean | Controla visibilidade |
| `onClose` | function | Handler de fechar |
| `title` | string | Título do modal |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | Largura do modal |
| `children` | ReactNode | Conteúdo |

## Design
- Backdrop: `bg-black/50` com `backdrop-blur-sm`
- Conteúdo: `white` / `dark:slate-900` com `rounded-xl`
- Header com título e botão X (ícone `X` do Lucide)
- Animação de entrada fade + scale
- Focus trap para acessibilidade
