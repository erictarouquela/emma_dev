# Estrutura do Projeto — EMMA Frontend

## Visão Geral
Dashboard administrativo para a **EMMA** (Escola e Clínica de Saúde e Bem-Estar).  
O frontend é **100% desacoplado** — consome a API REST do backend Laravel 13 e **não processa nenhuma lógica de negócio**. Todo o processamento é delegado ao backend.

## Stack Tecnológica
| Tecnologia | Versão | Propósito |
|---|---|---|
| React | 19+ | Biblioteca UI |
| Vite | 5.x | Build tool + dev server |
| Tailwind CSS | 3.4 | Estilização utility-first |
| Axios | 1.7 | Cliente HTTP (chamadas à API) |
| React Hook Form | 7.51 | Gestão de formulários |
| Zod | 3.22 | Validação de schema no frontend |
| Lucide React | 0.408 | Ícones SVG |

## Estrutura de Pastas
```text
src/
├── components/          # Componentes reutilizáveis (Button, Input, Card, Modal, etc.)
│   ├── ui/              # Componentes base do design system
│   ├── layout/          # Sidebar, Header, Footer, PageContainer
│   └── feedback/        # Alertas, Toasts, Loading, ErrorMessage
├── pages/               # Telas completas (uma por rota)
│   ├── auth/            # Login, Register
│   ├── dashboard/       # Dashboard principal
│   ├── students/        # Gestão de alunos/clientes
│   ├── appointments/    # Gestão de marcações
│   ├── vouchers/        # Controlo de vouchers
│   ├── courses/         # Gestão de cursos (Escola)
│   ├── payments/        # Pagamentos e faturação
│   └── settings/        # Configurações e perfil
├── hooks/               # Custom hooks (useAuth, useApi, useTheme, etc.)
├── services/            # Camada de comunicação com a API (axios instances)
│   └── api/             # Um arquivo por recurso (auth.js, students.js, etc.)
├── schemas/             # Schemas Zod para validação de formulários
├── contexts/            # React Context (AuthContext, ThemeContext)
├── utils/               # Funções utilitárias puras (formatDate, currency, etc.)
├── constants/           # Constantes da aplicação (rotas, enums, config)
├── styles/              # Estilos globais e extensões Tailwind
├── App.jsx              # Componente raiz com router
├── main.jsx             # Entry point
└── index.css            # Tailwind directives + global styles
```

## API Base URL
- **Desenvolvimento:** `http://localhost:8000/api`
- **Produção:** `https://beautiful-teal-horse.185-118-115-20.cpanel.site/api`

## Princípios Fundamentais
1. **Zero lógica de negócio no frontend** — apenas apresentação e validação de UX
2. **Componentes funcionais** — sem class components
3. **Composição sobre herança** — componentes pequenos e compostos
4. **Um componente por arquivo** — nomeação PascalCase
5. **Separação UI/lógica** — hooks para lógica, componentes para apresentação
6. **Dark Mode nativo** — usando classes `dark:` do Tailwind
7. **Responsivo por padrão** — mobile-first com breakpoints Tailwind

