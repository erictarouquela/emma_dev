# Prompt: Criar Gestão de Marcações — EMMA

## Contexto
Criar gestão de marcações com vista de calendário. Segue `.obsidian/02-Screens/appointments-screen.md.md`.

## Prompt para o Agente

> Cria a feature de gestão de marcações da EMMA.
>
> **Arquivos a criar:**
> 1. `src/services/api/appointments.js` — getAll, create (POST/GET /api/appointments)
> 2. `src/schemas/appointment.js` — schema Zod: student_id, therapist_user_id, starts_at, ends_at, status, notes
> 3. `src/hooks/useAppointments.js` — buscar marcações + filtros
> 4. `src/pages/appointments/AppointmentsPage.jsx` — com:
>    - Seletor de vista (Dia/Semana/Lista)
>    - Filtros por terapeuta e status
>    - Botão "Nova Marcação"
>    - Alertas de regras de negócio
> 5. `src/pages/appointments/AppointmentForm.jsx` — formulário modal
> 6. `src/components/calendar/CalendarView.jsx` — componente de calendário
> 7. `src/components/calendar/AppointmentCard.jsx` — card de marcação no calendário
>
> **APIs:**
> - `GET /api/appointments` — com filtros
> - `POST /api/appointments` — body conforme schema
> - `GET /api/students` — para dropdown de cliente
>
> **Alertas Visuais (dados do backend, frontend apenas exibe):**
> - Voucher expirando (< 30 dias) → badge amber pulsante
> - Cancelamento < 24h → alerta de taxa 5€
> - Atraso de cliente → nota de redução tempo
> - Conflito de horário → border vermelha

## Checklist
- [ ] Vista de calendário dia/semana + vista lista
- [ ] Criação de marcação via modal
- [ ] Status badges coloridos (pending/confirmed/completed/cancelled)
- [ ] Alertas de regras de negócio
- [ ] Filtros por terapeuta e status
- [ ] Dark mode nas cores dos cards e badges
- [ ] Responsivo (lista em mobile)
