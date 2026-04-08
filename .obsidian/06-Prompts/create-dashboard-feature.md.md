# Prompt: Criar Dashboard — EMMA

## Contexto
Estás a criar o dashboard principal da EMMA após o login. Segue a documentação em `.obsidian/02-Screens/dashboard-screen.md.md`.

## Prompt para o Agente

> Cria o dashboard principal da EMMA com sidebar e área de conteúdo.
>
> **Arquivos a criar:**
> 1. `src/components/layout/Sidebar.jsx` — navegação com ícones Lucide (Dashboard, Calendar, Users, GraduationCap, CreditCard, Settings) em bg-emerald-800
> 2. `src/components/layout/Header.jsx` — barra superior com nome do user, ThemeToggle (Sun/Moon) e avatar
> 3. `src/components/layout/PageContainer.jsx` — wrapper com sidebar + header + children
> 4. `src/components/ui/StatsCard.jsx` — card de métricas (ícone, valor, label)
> 5. `src/components/ui/StatusBadge.jsx` — badge colorido por estado
> 6. `src/pages/dashboard/DashboardPage.jsx` — página com:
>    - 4 StatsCards no topo (Marcações Hoje, Vouchers Ativos, Pagamentos Pendentes, Alunos Inscritos)
>    - Tabela de marcações do dia com status badges
>    - Alertas visuais (vouchers expirando, taxa desmarcação)
> 7. `src/contexts/ThemeContext.jsx` — context para dark/light mode com persistência localStorage
>
> **APIs a consumir:**
> - `GET /api/appointments` — marcações do dia
> - `GET /api/payments` — pagamentos pendentes
> - `GET /api/enrollments` — inscrições ativas
>
> **Design:** Modern Clinical / Deep Wellness (dark mode)
> - Light: slate-50 bg, white cards, emerald-800 sidebar
> - Dark: slate-950 bg, slate-900 cards, emerald-400 destaques
> - rounded-xl, sombras mínimas, glassmorphism em modais (dark)
> - Ícones Lucide para toda a navegação

## Checklist de Validação
- [ ] Sidebar com navegação e highlight da rota ativa
- [ ] Header com ThemeToggle funcional e dados do user
- [ ] 4 StatsCards com dados das APIs
- [ ] Tabela de marcações do dia
- [ ] Dark mode completo (todas as classes dark:)
- [ ] Layout responsivo (sidebar colapsável em mobile)
- [ ] Loading states durante fetch de dados
- [ ] Alertas visuais das regras de negócio
