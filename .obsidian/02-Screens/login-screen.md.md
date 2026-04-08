# Tela de Login

## Objetivo
Autenticar o utilizador (admin/recepcionista/terapeuta) e redirecionar para o dashboard.  
A autenticação é via **Laravel Sanctum** (SPA token-based).

## Campos do Formulário
| Campo | Tipo | Validação |
|---|---|---|
| `email` | email input | Obrigatório, formato email válido |
| `password` | password input | Obrigatório, mínimo 8 caracteres |

## API Endpoint
```
POST /api/auth/login
```
### Request Body
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```
### Response 200
```json
{
  "token": "jwt_or_sanctum_token",
  "user": {
    "id": 1,
    "name": "João",
    "email": "user@example.com"
  }
}
```
### Response 422
```json
{
  "message": "Credenciais inválidas"
}
```

## Estados da Tela
| Estado | Descrição | Visual |
|---|---|---|
| `idle` | Formulário pronto para input | Botão "Entrar" ativo |
| `loading` | Requisição em andamento | Botão com spinner, inputs disabled |
| `error` | Credenciais inválidas ou erro de rede | Mensagem de erro vermelha |
| `success` | Login bem-sucedido | Redirect para `/dashboard` |

## Fluxo
1. Utilizador preenche email e senha
2. Validação local com Zod (formato email, min 8 chars password)
3. `POST /api/auth/login` via Axios
4. Sucesso → salvar token no AuthContext → redirect `/dashboard`
5. Erro → exibir mensagem de erro abaixo do formulário

## Componentes Necessários
- `Input` — campo de texto com label e error state
- `PasswordInput` — campo de senha com toggle show/hide
- `Button` — botão primário com loading state
- `ErrorMessage` — mensagem de erro do formulário
- `Logo` — logo EMMA centralizado no topo

## Design
- Layout centrado com card branco sobre `slate-50`
- Logo EMMA no topo
- Suporte a dark mode (`dark:bg-slate-950`, card `dark:bg-slate-900`)
- Bordas `rounded-xl`, estilo "Modern Clinical"

## Schema Zod
```js
import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Mínimo 8 caracteres'),
})
```
