# StatusBadge Component

## Descrição
Badge colorido para exibir estados de marcações, pagamentos, alunos, etc.

## Props
| Prop | Tipo | Descrição |
|---|---|---|
| `status` | string | Valor do estado |
| `pulse` | boolean | Ativa animação pulsante (alertas) |

## Mapeamento de Cores
| Status | Label PT | Cor |
|---|---|---|
| `active` | Ativo | `emerald-500` |
| `inactive` | Inativo | `slate-400` |
| `pending` | Pendente | `amber-500` |
| `confirmed` | Confirmado | `emerald-500` |
| `completed` | Concluído | `slate-400` |
| `cancelled` | Cancelado | `red-500` |
| `paid` | Pago | `emerald-500` |
| `refunded` | Reembolsado | `purple-500` |
| `failed` | Falhado | `red-500` |

## Design
- Pill shape: `rounded-full px-2 py-0.5 text-xs font-medium`
- Background é a cor com opacidade (ex: `bg-emerald-100 text-emerald-700`)
- Dark mode: cores ajustadas para contraste
- Se `pulse=true`: classe `animate-pulse`
