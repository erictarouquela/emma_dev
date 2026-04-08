# Prompt: Criar Gestão de Cursos e Inscrições — EMMA

## Contexto
Módulo Escola — gestão de cursos e inscrições de alunos. Segue `.obsidian/02-Screens/courses-screen.md.md`.

## Prompt para o Agente

> Cria a feature de gestão de cursos e inscrições da EMMA (módulo Escola).
>
> **Arquivos a criar:**
> 1. `src/services/api/courses.js` — getAll, create (POST/GET /api/courses)
> 2. `src/services/api/enrollments.js` — getAll, create (POST/GET /api/enrollments)
> 3. `src/schemas/course.js` — schema Zod: title, slug, description, price, currency, duration_hours, is_active
> 4. `src/schemas/enrollment.js` — schema Zod: student_id, course_id, enrollment_date, status, payment_status
> 5. `src/pages/courses/CoursesPage.jsx` — grid de cards com cursos
> 6. `src/pages/courses/CourseForm.jsx` — formulário de criação/edição
> 7. `src/pages/courses/CourseDetailPage.jsx` — detalhe com tab de inscrições
> 8. `src/pages/courses/EnrollmentForm.jsx` — modal de inscrição de aluno
> 9. `src/components/ui/CourseCard.jsx` — card de curso com preço e badge ativo/inativo
>
> **APIs:**
> - `GET /api/courses` — listar cursos
> - `POST /api/courses` — criar curso
> - `GET /api/enrollments` — listar inscrições
> - `POST /api/enrollments` — inscrever aluno
>
> **Layout:** Grid de cards (2-3 colunas desktop, 1 mobile)
> **Preço:** Formatado em EUR com CurrencyDisplay
> **Status Inscrição:** active/completed/cancelled + payment_status pending/paid/refunded

## Checklist
- [ ] Grid responsivo de CourseCards
- [ ] Formulário de criação de curso
- [ ] Página de detalhe com inscrições
- [ ] Modal de inscrição de aluno
- [ ] Badges para estado e pagamento
- [ ] Toggle ativo/inativo
- [ ] Dark mode completo
