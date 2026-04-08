# Prompt: Criar Gestão de Pagamentos e Faturação — EMMA

## Contexto
Criar gestão de pagamentos com integração Stripe e emissão de documentos fiscais. Segue `.obsidian/02-Screens/payments-screen.md.md`.

## Prompt para o Agente

> Cria a feature de pagamentos e faturação da EMMA. NENHUMA lógica de cálculo é no frontend.
>
> **Arquivos a criar:**
> 1. `src/services/api/payments.js` — getAll, create (POST/GET /api/payments)
> 2. `src/services/api/billing.js` — createDocument (POST /api/billing/documents)
> 3. `src/services/api/stripe.js` — createIntent (POST /api/payments/stripe/intents)
> 4. `src/schemas/payment.js` — schema Zod para pagamento
> 5. `src/schemas/billing.js` — schema Zod para documento fiscal
> 6. `src/pages/payments/PaymentsPage.jsx` — lista com filtros por estado/método/período
> 7. `src/pages/payments/PaymentForm.jsx` — formulário de registo de pagamento
> 8. `src/pages/payments/BillingDocumentForm.jsx` — modal de emissão de fatura com tabela de itens dinâmica
> 9. `src/components/ui/CurrencyDisplay.jsx` — formatação de valores monetários (€)
>
> **APIs:**
> - `GET /api/payments` — listar
> - `POST /api/payments` — registar pagamento manual
> - `POST /api/billing/documents` — emitir fatura/recibo
> - `POST /api/payments/stripe/intents` — pagamento online
>
> **Métodos de pagamento:** card, transfer, cash, sepa
> **Tipos de documento:** invoice, receipt, invoice_receipt
> **Importante:** Totais e cálculos vêm do backend. Frontend apenas exibe.

## Checklist
- [ ] Tabela de pagamentos com filtros
- [ ] Formulário de registo de pagamento
- [ ] Modal de emissão de fatura com itens dinâmicos
- [ ] Status badges (pending/completed/failed/refunded)
- [ ] Valores monetários formatados (€)
- [ ] Integração Stripe Elements (futuro)
- [ ] Dark mode completo
