# StatsCard Component

## Descrição
Card de métrica para o dashboard — exibe ícone, valor numérico e label descritivo.

## Props
| Prop | Tipo | Descrição |
|---|---|---|
| `icon` | LucideIcon | Ícone do card |
| `label` | string | Descrição da métrica |
| `value` | string/number | Valor principal |
| `trend` | `'up' \| 'down' \| 'neutral'` | Indicador de tendência (opcional) |
| `alert` | boolean | Ativa estilo de alerta pulsante |

## Exemplo
```jsx
<StatsCard icon={Calendar} label="Marcações Hoje" value={12} />
<StatsCard icon={Ticket} label="Vouchers Expirando" value={3} alert />
```

## Design
- Background: `white` / `dark:slate-900`
- Border: `slate-200` / `dark:slate-800`
- `rounded-xl` com padding interno
- Ícone em `emerald-800` / `dark:emerald-400`
- Valor em tipografia grande e bold
- Se `alert=true`: borda `amber-500` pulsante
