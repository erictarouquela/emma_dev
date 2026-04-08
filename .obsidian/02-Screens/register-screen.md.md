# Tela de Registo (Register)

## Objetivo
Registar uma nova organização (unidade EMMA) e o utilizador admin inicial.

## API Endpoint
```
POST /api/auth/register
```

### Request Body
```json
{
  "organization": {
    "name": "EMMA Lisboa",
    "type": "clinic",
    "timezone": "Europe/Lisbon"
  },
  "user": {
    "name": "Admin",
    "email": "admin@emma.pt",
    "password": "password123"
  }
}
```

## Campos do Formulário

### Seção 1: Organização
| Campo | Tipo | API Field | Obrigatório | Validação |
|---|---|---|---|---|
| Nome da Organização | text | `organization.name` | Sim | Max 200 chars |
| Tipo | select | `organization.type` | Sim | `clinic`, `school`, `both` |
| Fuso Horário | select | `organization.timezone` | Sim | Timezone IANA |

### Seção 2: Administrador
| Campo | Tipo | API Field | Obrigatório | Validação |
|---|---|---|---|---|
| Nome | text | `user.name` | Sim | Max 200 chars |
| Email | email | `user.email` | Sim | Formato email |
| Senha | password | `user.password` | Sim | Mínimo 8 chars |
| Confirmar Senha | password | — | Sim | Igual à senha |

## Estados
| Estado | Descrição |
|---|---|
| `idle` | Formulário pronto |
| `loading` | Enviando dados |
| `error` | Erro de validação ou servidor |
| `success` | Redirect para login com mensagem de sucesso |

## Fluxo
1. Preencher dados da organização
2. Preencher dados do admin
3. Validação local (Zod)
4. `POST /api/auth/register`
5. Sucesso → redirect `/login` com toast "Conta criada com sucesso"
6. Erro → exibir mensagens de erro nos campos

## Componentes
- `Input` — campo de texto
- `PasswordInput` — campo de senha com toggle
- `Select` — dropdown nativo estilizado
- `Button` — botão primário com loading
- `StepForm` — formulário multi-step (organização → admin)
- `ErrorMessage` — feedback de erro por campo

## Schema Zod
```js
import { z } from 'zod'

export const registerSchema = z.object({
  organization: z.object({
    name: z.string().min(1, 'Nome obrigatório').max(200),
    type: z.string().min(1, 'Tipo obrigatório'),
    timezone: z.string().min(1, 'Fuso horário obrigatório'),
  }),
  user: z.object({
    name: z.string().min(1, 'Nome obrigatório').max(200),
    email: z.string().email('Email inválido'),
    password: z.string().min(8, 'Mínimo 8 caracteres'),
  }),
})
```

## Design
- Layout centrado estilo login, mas com mais campos
- Pode ser multi-step (passo 1: org, passo 2: admin) ou formulário único
- Link "Já tem conta? Entrar" no rodapé
