# Tela de Marcações (Appointments)

## Objetivo
Gestão de marcações de tratamentos — agendar, visualizar, confirmar, cancelar e reagendar sessões.  
Sincroniza com Google Calendar e TOC Online via backend.

## APIs
```
GET  /api/appointments    — listar marcações
POST /api/appointments    — criar nova marcação
```

## Campos do Formulário (Criar/Editar Marcação)
| Campo | Tipo | API Field | Obrigatório | Validação |
|---|---|---|---|---|
| Cliente | searchable select | `student_id` | Sim | ID do student |
| Terapeuta | select | `therapist_user_id` | Sim | ID do user terapeuta |
| Início | datetime | `starts_at` | Sim | Futuro, formato ISO |
| Fim | datetime | `ends_at` | Sim | Após `starts_at` |
| Status | select | `status` | Sim | `pending`, `confirmed`, `completed`, `cancelled` |
| Notas | textarea | `notes` | Não | Observações livres |

## Vistas de Calendário
| Vista | Descrição |
|---|---|
| Dia | Timeline vertical por hora, colunas por gabinete/terapeuta |
| Semana | Grid semanal com slots de tempo |
| Lista | Tabela ordenada por data |

## Cores de Status
| Status | Cor | Badge |
|---|---|---|
| `pending` | `amber-500` | Amarelo — aguarda confirmação |
| `confirmed` | `emerald-500` | Verde — confirmado |
| `completed` | `slate-400` | Cinza — concluído |
| `cancelled` | `red-500` | Vermelho — cancelado |

## Alertas e Regras de Negócio (Exibição)
1. **Atraso do cliente**: Nota visual de que o tempo de massagem será reduzido
2. **Cancelamento < 24h**: Alerta de taxa adicional de 5€ (backend processa, frontend exibe)
3. **Remarcação < 48h**: Aviso de que a remarcação pode não ser permitida
4. **Conflito de horário**: Indicação visual de sobreposição de marcações

## Layout
- Header com seletor de vista (Dia/Semana/Lista) e navegação de datas
- Filtros: por terapeuta, por gabinete, por status
- Botão "Nova Marcação" → abre modal com formulário
- Click em slot vazio → preenche automaticamente data/hora

## Componentes
- `CalendarView` — componente de calendário com vistas
- `AppointmentCard` — card dentro do calendário com detalhes
- `AppointmentForm` — formulário modal (React Hook Form + Zod)
- `TimeSlot` — slot de tempo clicável
- `TherapistFilter` — filtro por terapeuta
- `StatusBadge` — badge colorido para status
- `ConflictAlert` — alerta de conflito de horário

## Schema Zod
```js
import { z } from 'zod'

export const appointmentSchema = z.object({
  student_id: z.number().positive('Selecione um cliente'),
  therapist_user_id: z.number().positive('Selecione um terapeuta'),
  starts_at: z.string().datetime('Data/hora inválida'),
  ends_at: z.string().datetime('Data/hora inválida'),
  status: z.enum(['pending', 'confirmed', 'completed', 'cancelled']),
  notes: z.string().optional(),
})
```

## Design
- Calendário ocupa toda a área de conteúdo
- Cards de marcação com bordas coloridas por status
- Drag-and-drop para reagendamento (futuro)
- Responsivo: lista em mobile, calendário em desktop
