# Tela de Gestão de Clientes/Alunos (Students)

## Objetivo
Listar, pesquisar, criar e editar fichas de clientes/alunos da EMMA.  
Corresponde à **Ficha de Cliente** do sistema legado (migração do Excel).

## APIs
```
GET  /api/students     — listar todos os clientes/alunos
POST /api/students     — criar novo cliente/aluno
```

## Campos do Formulário (Criação/Edição)
| Campo | Tipo | API Field | Obrigatório | Validação |
|---|---|---|---|---|
| Nome | text | `first_name` | Sim | Max 200 chars |
| Apelido | text | `last_name` | Sim | Max 200 chars |
| Email | email | `email` | Sim | Formato email |
| Telemóvel | tel | `phone_number` | Sim | Max 16 chars |
| Data Nascimento | date | `birth_date` | Não | Formato ISO |
| Género | select | `gender` | Não | `male`, `female`, `not_specified` |
| Morada | text | `address_line1` | Não | — |
| Cidade | text | `city` | Não | — |
| Distrito | text | `state_province` | Não | — |
| Código Postal | text | `postal_code` | Não | Max 16 chars |
| País | select | `country_id` | Não | ID numérico |
| Nacionalidade | select | `nationality_country_id` | Não | ID numérico |
| NIF | text | `tax_id_number` | Não | NIF válido |
| Estado | select | `status` | Sim | `active`, `inactive` |

## Gestão de Documentos do Aluno
```
GET  /api/student-documents   — listar documentos
POST /api/student-documents   — upload de documento
```
### Campos de Documento
| Campo | API Field | Tipo |
|---|---|---|
| Tipo | `document_type` | `id_card`, `passport`, `visa`, etc. |
| Número | `document_number` | string |
| Validade | `expiry_date` | datetime |
| Ficheiro | `file_path` | upload |

## Layout da Lista
- Tabela paginada com colunas: Nome, Email, Telemóvel, Estado, Ações
- Barra de pesquisa por nome/email
- Filtros por estado (Ativo/Inativo)
- Botão "Novo Cliente" → abre modal ou página de criação
- Cada linha tem ações: Ver, Editar, Documentos

## Estados
| Estado | Descrição |
|---|---|
| `loading` | Spinner enquanto busca dados |
| `empty` | Mensagem "Nenhum cliente encontrado" com ilustração |
| `list` | Tabela com dados |
| `creating` | Modal de criação aberto |
| `editing` | Modal de edição com dados preenchidos |

## Componentes
- `DataTable` — tabela com paginação e ordenação
- `SearchBar` — input de pesquisa com ícone Search
- `FilterSelect` — dropdown de filtro por estado
- `StudentForm` — formulário de criação/edição (React Hook Form + Zod)
- `Modal` — overlay para formulários
- `StatusBadge` — badge colorido para estado do cliente
- `DocumentUpload` — componente de upload de documentos

## Regras de Negócio (Exibição Visual)
- Campo `cliente_nopub` → checkbox "Não receber publicidade" (RGPD)
- Observações médicas/restrições em campo de texto livre
- Controlo de datas de inserção e atualização (exibir, não editar)

## Design
- Layout full-width com tabela responsiva
- Cards para vista mobile
- Filtros no topo, tabela abaixo
- Estilo "Modern Clinical" com `rounded-xl`
