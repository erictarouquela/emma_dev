# Contrato de API — EMMA Backend

**Base URL:** `https://beautiful-teal-horse.185-118-115-20.cpanel.site/api`  
**Docs:** `https://beautiful-teal-horse.185-118-115-20.cpanel.site/docs`  
**Auth:** Laravel Sanctum (Bearer Token)  
**Content-Type:** `application/json`

---

## Autenticação

### POST /api/auth/register
Registar nova organização + utilizador admin.
```json
// Request
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

### POST /api/auth/login
Autenticação do utilizador.
```json
// Request
{
  "email": "user@example.com",
  "password": "password123"
}
// Response 200
{
  "token": "sanctum_token",
  "user": { "id": 1, "name": "João", "email": "user@email.com" }
}
// Response 422
{ "message": "Credenciais inválidas" }
```

### POST /api/auth/logout 🔒
Terminar sessão. Requer token.

### GET /api/user 🔒
Obter dados do utilizador autenticado.
```json
// Response 200
{ "id": 1, "name": "João", "email": "user@email.com" }
// Response 401
{ "message": "Unauthenticated." }
```

---

## Organizações 🔒

### GET /api/organizations
Listar organizações (unidades EMMA).

### POST /api/organizations
Criar nova organização.
```json
{
  "name": "EMMA Porto",
  "type": "clinic",
  "timezone": "Europe/Lisbon"
}
```

---

## Clientes/Alunos (Students) 🔒

### GET /api/students
Listar todos os clientes/alunos.

### POST /api/students
Criar novo cliente/aluno.
```json
{
  "first_name": "Maria",
  "last_name": "Silva",
  "email": "maria@example.com",
  "phone_number": "+351912345678",
  "birth_date": "1990-05-15T00:00:00",
  "gender": "female",           // male | female | not_specified
  "address_line1": "Rua das Flores, 123",
  "city": "Lisboa",
  "state_province": "Lisboa",
  "postal_code": "1000-001",
  "country_id": 1,
  "nationality_country_id": 1,
  "tax_id_number": "123456789",
  "status": "active"            // active | inactive
}
```

---

## Documentos de Aluno 🔒

### GET /api/student-documents
Listar documentos de alunos.

### POST /api/student-documents
Upload de documento de aluno.
```json
{
  "student_id": 1,
  "document_type": "id_card",   // id_card | passport | visa | certificate
  "document_number": "12345678",
  "expiry_date": "2030-12-31T00:00:00",
  "file_path": "/uploads/doc.pdf"
}
```

---

## Marcações (Appointments) 🔒

### GET /api/appointments
Listar marcações. Filtrar por data, terapeuta, status.

### POST /api/appointments
Criar nova marcação.
```json
{
  "student_id": 1,
  "therapist_user_id": 2,
  "starts_at": "2026-04-10T10:00:00",
  "ends_at": "2026-04-10T11:00:00",
  "status": "pending",          // pending | confirmed | completed | cancelled
  "notes": "Primeira sessão"
}
```

---

## Pagamentos 🔒

### GET /api/payments
Listar pagamentos.

### POST /api/payments
Registar pagamento.
```json
{
  "amount": 50.00,
  "currency": "EUR",
  "method": "card",             // card | transfer | cash | sepa
  "status": "pending",          // pending | completed | failed | refunded
  "paid_at": "2026-04-10T10:00:00",
  "student_id": 1,
  "enrollment_id": null,        // se pagamento de curso
  "appointment_id": 1           // se pagamento de sessão
}
```

---

## Documentos de Faturação 🔒

### POST /api/billing/documents
Emitir documento fiscal (fatura/recibo). Integra com TOC Online no backend.
```json
{
  "type": "invoice_receipt",    // invoice | receipt | invoice_receipt
  "currency": "EUR",
  "student_id": 1,
  "enrollment_id": null,
  "appointment_id": 1,
  "items": [
    {
      "description": "Massagem Relax 60min",
      "quantity": 1,
      "unit_price": 50.00
    }
  ]
}
```

---

## Stripe (Pagamentos Online) 🔒

### POST /api/payments/stripe/intents
Criar intenção de pagamento Stripe.
```json
{
  "amount": 50.00,
  "currency": "EUR",
  "student_id": 1,
  "enrollment_id": null,
  "appointment_id": 1
}
```

### POST /api/payments/stripe/webhook
Webhook do Stripe (apenas backend, o frontend não chama diretamente).

---

## Cursos (Courses) 🔒

### GET /api/courses
Listar cursos da escola.

### POST /api/courses
Criar novo curso.
```json
{
  "title": "Curso de Massagem Terapêutica",
  "slug": "curso-massagem-terapeutica",
  "description": "Formação completa em técnicas de massagem",
  "price": 500.00,
  "currency": "EUR",
  "duration_hours": 40,
  "is_active": true
}
```

---

## Inscrições (Enrollments) 🔒

### GET /api/enrollments
Listar inscrições em cursos.

### POST /api/enrollments
Criar inscrição.
```json
{
  "student_id": 1,
  "course_id": 1,
  "enrollment_date": "2026-04-10T00:00:00",
  "status": "active",           // active | completed | cancelled
  "payment_status": "paid"      // pending | paid | refunded
}
```

---

## Integrações (Backend Only)

Estes endpoints são geridos pelo backend — o frontend não os chama diretamente.

| Endpoint | Descrição |
|---|---|
| `GET /api/integrations/google/connect` | Conectar Google Calendar |
| `GET /api/integrations/google/callback` | Callback OAuth Google |
| `POST /api/integrations/google/webhook` | Webhook Google Calendar |
| `GET /api/integrations/toc-online/connect` | Conectar TOC Online |
| `GET /api/integrations/toc-online/callback` | Callback OAuth TOC Online |

---

## Notas para o Frontend
- 🔒 = Requer header `Authorization: Bearer {token}`
- Todos os endpoints retornam `401 Unauthenticated` se não houver token válido
- Erros de validação retornam `422` com detalhes por campo
- O frontend **nunca** processa lógica de negócio — apenas exibe, envia e valida formato
- Usar Axios interceptors para injetar o token e tratar erros globalmente

