# Fluxo de Pagamento — EMMA

## Visão Geral
Registo e acompanhamento de pagamentos de sessões e cursos.  
Integra com **Stripe** (pagamentos online) e **TOC Online** (faturação).

## Fluxo de Pagamento Manual (Presencial)
```
1. Admin clica "Registar Pagamento" na lista de pagamentos
2. Modal abre com formulário
3. Seleciona cliente, método (card/transfer/cash), valor
4. Associa a marcação ou inscrição
5. POST /api/payments
6. Backend processa e regista
7. Opcionalmente: POST /api/billing/documents para emitir fatura
8. Sucesso → badge "Pago" na marcação/inscrição
```

## Fluxo de Pagamento Stripe (Online)
```
1. Sistema identifica pagamento pendente
2. Frontend chama POST /api/payments/stripe/intents
3. Backend cria PaymentIntent no Stripe
4. Frontend recebe client_secret
5. Exibe Stripe Elements (formulário de cartão)
6. Cliente completa pagamento
7. Stripe envia webhook → POST /api/payments/stripe/webhook
8. Backend atualiza status do pagamento
9. Frontend atualiza via polling ou websocket
```

## Fluxo de Emissão de Fatura
```
1. Admin seleciona pagamento → "Emitir Fatura"
2. Modal com tipo (fatura/recibo), itens pré-preenchidos
3. Edita itens se necessário (descrição, quantidade, preço)
4. POST /api/billing/documents
5. Backend processa e envia ao TOC Online
6. Documento disponível para download/envio
```

## Estados de Pagamento
| Estado | Cor | Ação Disponível |
|---|---|---|
| `pending` | amber | Registar pagamento |
| `completed` | emerald | Emitir fatura |
| `failed` | red | Repetir pagamento |
| `refunded` | purple | — (apenas visualizar) |
