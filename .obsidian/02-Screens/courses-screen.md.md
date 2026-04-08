# Tela de Cursos (Courses) — Módulo Escola

## Objetivo
Gestão de cursos oferecidos pela escola da EMMA — criar, listar, editar cursos e gerir inscrições (enrollments).

## APIs — Cursos
```
GET  /api/courses       — listar cursos
POST /api/courses       — criar novo curso
```

### Campos do Curso
| Campo | Tipo | API Field | Obrigatório | Validação |
|---|---|---|---|---|
| Título | text | `title` | Sim | Max 200 chars |
| Slug | text | `slug` | Sim | Max 200 chars, URL-safe |
| Descrição | textarea | `description` | Não | Texto livre |
| Preço | number | `price` | Sim | Mínimo 0 |
| Moeda | select | `currency` | Não | 3 chars (EUR) |
| Duração (horas) | number | `duration_hours` | Não | Mínimo 1 |
| Ativo | toggle | `is_active` | Não | boolean |

## APIs — Inscrições (Enrollments)
```
GET  /api/enrollments    — listar inscrições
POST /api/enrollments    — criar inscrição
```

### Campos da Inscrição
| Campo | Tipo | API Field | Obrigatório | Validação |
|---|---|---|---|---|
| Aluno | searchable select | `student_id` | Sim | ID válido |
| Curso | select | `course_id` | Sim | ID válido |
| Data Inscrição | datetime | `enrollment_date` | Sim | Formato ISO |
| Estado | select | `status` | Sim | `active`, `completed`, `cancelled` |
| Estado Pagamento | select | `payment_status` | Sim | `pending`, `paid`, `refunded` |

## Layout
### Lista de Cursos
- Grid de cards (2-3 colunas desktop, 1 coluna mobile)
- Cada card: título, preço, duração, badge ativo/inativo, nº inscritos
- Botão "Novo Curso" no topo

### Detalhe do Curso
- Info do curso no topo
- Tab "Inscrições" — tabela de alunos inscritos neste curso
- Botão "Inscrever Aluno" → modal com formulário

## Componentes
- `CourseCard` — card de curso com info resumida
- `CourseForm` — formulário de criação/edição
- `EnrollmentTable` — tabela de inscrições
- `EnrollmentForm` — formulário de inscrição (student + course)
- `StatusBadge` — badges para estado e pagamento
- `PriceTag` — exibição formatada do preço

## Design
- Cards com `rounded-xl`, sombra suave
- Badge verde para cursos ativos, cinza para inativos
- Preço em destaque com tipografia maior
