# Tela de Dashboard

## Objetivo
Painel central com visão geral da operação da EMMA — marcações do dia, vouchers ativos, alertas e métricas rápidas.

## Layout
Sidebar fixa à esquerda + área de conteúdo principal à direita.

### Sidebar (Navegação)
| Item | Ícone (Lucide) | Rota |
|---|---|---|
| Dashboard | `LayoutDashboard` | `/dashboard` |
| Marcações | `Calendar` | `/appointments` |
| Clientes/Alunos | `Users` | `/students` |
| Vouchers | `Ticket` | `/vouchers` |
| Cursos (Escola) | `GraduationCap` | `/courses` |
| Pagamentos | `CreditCard` | `/payments` |
| Configurações | `Settings` | `/settings` |

### Cards de Estatísticas (Topo)
| Card | Dados | API |
|---|---|---|
| Marcações Hoje | Contagem de appointments do dia | `GET /api/appointments` |
| Vouchers Ativos | Total de vouchers válidos | *(via dados de appointments)* |
| Pagamentos Pendentes | Pagamentos com status "pending" | `GET /api/payments` |
| Alunos Inscritos | Total de enrollments ativos | `GET /api/enrollments` |

### Lista de Marcações do Dia
Tabela com as marcações de hoje:
| Coluna | Campo API |
|---|---|
| Hora | `starts_at` |
| Cliente | `student_id` → nome do student |
| Terapeuta | `therapist_user_id` → nome do user |
| Tipo | *(associado ao appointment)* |
| Status | `status` (confirmed, pending, completed, cancelled) |

### Cores de Status
| Status | Badge Color |
|---|---|
| `pending` | `amber-500` |
| `confirmed` | `emerald-500` |
| `completed` | `slate-400` |
| `cancelled` | `red-500` |

### Alertas Visuais (Regras de Negócio)
- **Vouchers expirando** (< 30 dias): Badge `amber-500` pulsante no card
- **Desmarcações < 24h**: Alerta de taxa de 5€
- **Atrasos de cliente**: Nota sobre redução do tempo de massagem

## Componentes Necessários
- `Sidebar` — navegação lateral com ícones Lucide
- `StatsCard` — card de métrica (ícone + valor + label)
- `AppointmentTable` — tabela de marcações com status badges
- `AlertBanner` — barra de alertas para regras de negócio
- `ThemeToggle` — botão Sun/Moon no header para dark mode

## APIs Consumidas
- `GET /api/appointments` — marcações do dia
- `GET /api/payments` — pagamentos pendentes
- `GET /api/enrollments` — inscrições ativas
- `GET /api/students` — dados dos clientes

## Design
- Background: `slate-50` / `dark:slate-950`
- Cards: `white` border `slate-200` / `dark:slate-900` border `slate-800`
- Sidebar: `emerald-800` com ícones `white` / `dark:slate-900`
- Bordas `rounded-xl`, sombras mínimas
