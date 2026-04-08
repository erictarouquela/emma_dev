# Tela de Perfil do Utilizador

## Objetivo
Exibir e permitir edição dos dados do utilizador logado (admin, recepcionista ou terapeuta).

## API Endpoint
```
GET /api/user — obter dados do utilizador autenticado
```
### Response 200
```json
{
  "id": 1,
  "name": "Maria Silva",
  "email": "maria@emma.pt"
}
```

## Seções da Tela

### Informações Pessoais
| Campo | Tipo | Editável |
|---|---|---|
| Nome | text | Sim |
| Email | email | Sim |
| Avatar | imagem | Sim |

### Segurança
| Campo | Tipo | Descrição |
|---|---|---|
| Senha atual | password | Necessário para validar alteração |
| Nova senha | password | Mínimo 8 caracteres |
| Confirmar senha | password | Deve coincidir com nova senha |

### Preferências
| Opção | Tipo | Descrição |
|---|---|---|
| Tema | toggle | Light / Dark mode |
| Notificações | toggle | Ativar/desativar alertas |

## Estados
| Estado | Descrição |
|---|---|
| `loading` | Buscando dados do utilizador |
| `idle` | Dados exibidos, editáveis |
| `saving` | Enviando alterações ao backend |
| `success` | Toast "Perfil atualizado" |
| `error` | Mensagem de erro |

## Componentes
- `Avatar` — foto circular do utilizador
- `Input` — campos de texto editáveis
- `PasswordInput` — campos de senha com validação
- `Button` — "Guardar Alterações"
- `Toast` — feedback de sucesso/erro
- `ThemeToggle` — alternância Sun/Moon

## Design
- Layout em card centrado com seções separadas por dividers
- Avatar grande no topo
- Estilo consistente com o dashboard (Modern Clinical)
