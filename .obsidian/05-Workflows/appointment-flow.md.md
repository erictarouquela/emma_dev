# Fluxo de Marcação (Appointment) — EMMA

## Visão Geral
Processo completo de criação, confirmação e gestão de marcações de tratamentos.  
**Todo o processamento é do backend** — o frontend apenas exibe e envia dados.

## Fluxo de Nova Marcação
```
1. Admin/Recepcionista clica "Nova Marcação"
2. Modal de criação abre
3. Seleciona cliente (searchable dropdown → GET /api/students)
4. Seleciona terapeuta (dropdown → lista de users terapeutas)
5. Define data/hora início e fim
6. Adiciona notas (opcional)
7. Validação local (Zod)
8. POST /api/appointments
9. Backend:
   - Valida disponibilidade do terapeuta
   - Verifica conflitos de gabinete
   - Cria marcação no BD
   - Sincroniza com Google Calendar
10. Response sucesso → fecha modal, atualiza lista
11. Response erro → exibe mensagem de conflito/validação
```

## Fluxo de Cancelamento
```
1. Admin seleciona marcação → clica "Cancelar"
2. Frontend exibe confirmação:
   - Se < 24h: aviso de taxa de 5€
   - Se > 24h < 48h: aviso de política de remarcação
3. Confirma → PATCH/POST atualiza status para "cancelled"
4. Backend processa:
   - Atualiza Google Calendar
   - Regista taxa se aplicável
   - Notifica cliente (WhatsApp/email)
5. Frontend atualiza lista de marcações
```

## Fluxo de Reagendamento
```
1. Admin seleciona marcação → clica "Reagendar"
2. Modal com data/hora atual pré-preenchida
3. Seleciona nova data/hora
4. Aviso se < 48h da marcação original
5. Submete alteração
6. Backend processa sincronização
```

## Regras de Negócio (Exibição Visual)
| Regra | Origem | Frontend |
|---|---|---|
| Taxa 5€ desmarcação < 24h | Backend calcula | Exibir alerta amber antes de confirmar |
| Redução tempo por atraso | Backend gere | Nota visual na marcação |
| Remarcação mínimo 48h | Backend valida | Aviso antes de submeter |
| Voucher válido 6 meses | Backend valida | Badge de expiração no card |
| Conflito de horário | Backend valida | Mensagem de erro no formulário |

## Sincronizações (Backend)
- **Google Calendar** — marcações sincronizadas bidirecionalmente
- **TOC Online** — faturação automática após conclusão
- **Notificações** — WhatsApp/email para confirmação e lembretes
