# Prompt: Criar Gestão de Clientes/Alunos — EMMA

## Contexto
Criar CRUD completo de clientes/alunos com upload de documentos. Segue `.obsidian/02-Screens/users-screen.md.md`.

## Prompt para o Agente

> Cria a feature de gestão de clientes/alunos da EMMA.
>
> **Arquivos a criar:**
> 1. `src/services/api/students.js` — CRUD: getAll, create (POST/GET /api/students)
> 2. `src/services/api/studentDocuments.js` — getAll, upload (POST/GET /api/student-documents)
> 3. `src/schemas/student.js` — schema Zod com campos: first_name, last_name, email, phone_number, birth_date, gender, address_line1, city, state_province, postal_code, country_id, nationality_country_id, tax_id_number, status
> 4. `src/hooks/useStudents.js` — buscar lista + loading + error
> 5. `src/pages/students/StudentsPage.jsx` — lista com:
>    - DataTable paginada (Nome, Email, Tel, Estado, Ações)
>    - Barra de pesquisa por nome/email
>    - Filtro por estado (Ativo/Inativo)
>    - Botão "Novo Cliente" → abre modal
> 6. `src/pages/students/StudentForm.jsx` — formulário com React Hook Form + Zod
> 7. `src/components/ui/DataTable.jsx` — tabela reutilizável com paginação
> 8. `src/components/ui/Modal.jsx` — modal overlay reutilizável
> 9. `src/components/ui/SearchBar.jsx` — input de pesquisa com ícone
>
> **APIs:**
> - `GET /api/students`
> - `POST /api/students` — body conforme schema
> - `GET /api/student-documents`
> - `POST /api/student-documents`
>
> **RGPD:** Checkbox "Não receber publicidade" nos formulários
> **Documentos:** Tab com upload de BI, Passaporte, Visa (para alunos internacionais)

## Checklist
- [ ] Tabela paginada com pesquisa e filtros
- [ ] Criação de cliente via modal com formulário validado (Zod)
- [ ] StatusBadge para Ativo/Inativo
- [ ] Upload de documentos por tipo
- [ ] Dark mode completo
- [ ] Layout responsivo (cards em mobile)
- [ ] Mensagem empty state quando sem dados
