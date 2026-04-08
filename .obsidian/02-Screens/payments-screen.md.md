# Tela de Pagamentos e Faturação

## Objetivo
Visualizar pagamentos, criar registos de pagamento, emitir documentos de faturação e integrar com Stripe.  
**Nenhuma lógica de cálculo é feita no frontend** — tudo é processado pelo backend.

## APIs — Pagamentos
```
GET  /api/payments        — listar pagamentos
POST /api/payments        — registar pagamento
```

### Campos de Pagamento
| Campo | Tipo | API Field | Obrigatório | Validação |
|---|---|---|---|---|
| Valor | number | `amount` | Sim | Positivo |
| Moeda | select | `currency` | Sim | 3 chars (EUR) |
| Método | select | `method` | Sim | `card`, `transfer`, `cash`, `sepa` |
| Estado | select | `status` | Sim | `pending`, `completed`, `failed`, `refunded` |
| Data Pagamento | datetime | `paid_at` | Não | Formato ISO |
| Cliente | select | `student_id` | Sim | ID válido |
| Inscrição | select | `enrollment_id` | Não | ID (se pagamento de curso) |
| Marcação | select | `appointment_id` | Não | ID (se pagamento de sessão) |

## APIs — Documentos de Faturação
```
POST /api/billing/documents    — emitir documento fiscal
```

### Campos do Documento
| Campo | Tipo | API Field | Obrigatório |
|---|---|---|---|
| Tipo | select | `type` | Sim — `invoice`, `receipt`, `invoice_receipt` |
| Moeda | select | `currency` | Sim — 3 chars |
| Cliente | select | `student_id` | Sim |
| Inscrição | select | `enrollment_id` | Não |
| Marcação | select | `appointment_id` | Não |
| Itens | array | `items[]` | Sim — mínimo 1 item |

### Campos de cada Item
| Campo | API Field | Tipo |
|---|---|---|
| Descrição | `items[].description` | string |
| Quantidade | `items[].quantity` | integer |
| Preço Unitário | `items[].unit_price` | number |

## APIs — Stripe (Pagamentos Online)
```
POST /api/payments/stripe/intents    — criar intenção de pagamento Stripe
POST /api/payments/stripe/webhook    — webhook (backend only)
```

### Campos do Stripe Intent
| Campo | API Field | Obrigatório |
|---|---|---|
| Valor | `amount` | Sim |
| Moeda | `currency` | Sim |
| Cliente | `student_id` | Sim |
| Inscrição | `enrollment_id` | Não |
| Marcação | `appointment_id` | Não |

## Layout
### Lista de Pagamentos
- Tabela com colunas: Data, Cliente, Valor, Método, Estado, Ações
- Filtros: por estado, por método, por período
- Pesquisa por nome do cliente
- Totais no rodapé (exibidos, calculados pelo backend)

### Modal de Emissão de Fatura
- Formulário com seleção de tipo, cliente e itens
- Tabela dinâmica de itens (adicionar/remover linhas)
- Total calculado visualmente (backend valida)

### Cores de Estado
| Estado | Cor |
|---|---|
| `pending` | `amber-500` |
| `completed` | `emerald-500` |
| `failed` | `red-500` |
| `refunded` | `purple-500` |

## Componentes
- `PaymentTable` — tabela paginada de pagamentos
- `PaymentForm` — formulário de registo de pagamento
- `BillingDocumentForm` — formulário de emissão de fatura
- `InvoiceItemRow` — linha da tabela de itens dinâmica
- `StripePaymentButton` — botão de pagamento com Stripe
- `StatusBadge` — badge de estado
- `CurrencyDisplay` — formatação de valores monetários (€)

## Regras de Negócio (Exibição)
- Taxa de desmarcação de 5€ para cancelamentos < 24h
- Pagamentos de terapeutas — vista separada para transparência
- Integração com TOC Online para faturação (backend processa, frontend exibe estado)

## Design
- Tabela limpa com `rounded-xl`
- Valores monetários alinhados à direita
- Badge colorido para cada estado
- Modal de fatura com design tipo documento fiscal
