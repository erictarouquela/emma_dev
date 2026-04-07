# 🏥 Plataforma de Gestão - Clínica de Massagens & Escola

Sistema integrado para gestão de marcações em tempo real, inscrições de alunos com validação de documentos via IA e faturação automatizada.

## 🛠 Stack Tecnológica

- **Backend:** [Laravel 13](https://laravel.com/) (PHP 8.3)
- **Frontend:** [React](https://reactjs.org/) via [Inertia.js](https://inertiajs.com/)
- **Base de Dados:** MySQL 8.0
- **Cache/Queue:** Redis
- **Estilização:** Tailwind CSS
- **Infraestrutura:** Docker (Laravel Sail)

---

## 🚀 Configuração do Ambiente de Desenvolvimento (Docker)

Este projeto utiliza o **Laravel Sail**, uma interface de linha de comando leve para interagir com a configuração Docker pré-definida do Laravel.

### 1. Pré-requisitos
Certifica-te de que tens instalado:
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- Git

### 2. Instalação Passo a Passo

1. **Clonar o repositório:**
   ```bash
   git clone <url-do-repositorio>
   cd nome-do-projeto


   ### Notas de Arquitetura para a Equipa:

**Para o Dev de Backend:**
- Lembra-te de que o Laravel 13 mudou a forma como os Middlewares são registados (agora no `bootstrap/app.php`). Garante que o middleware de CORS está ativo para o domínio do React.

**Para o Dev de Frontend:**
- Como o sistema é desacoplado, vais precisar de gerir o estado de autenticação (ex: usando `Context API` ou `Zustand`) para saber se o utilizador está logado em todos os componentes.

**Para Ambos (O Contrato):**
- Recomendo que utilizem o **Postman** ou o **Insomnia** para partilharem a coleção de endpoints. Assim que o Backend criar uma rota, exporta para o Frontend saber exatamente que campos JSON deve enviar.