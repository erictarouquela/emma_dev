# 🛡️ Clínica & Escola API - Backend

Este é o motor da plataforma, construído em **Laravel 13** focado em fornecer uma API REST robusta, segura e escalável.

## 🚀 Tecnologias
- **PHP 8.3+**
- **Laravel 13** (API Mode)
- **Docker (Laravel Sail)**
- **MySQL 8** (Base de dados)
- **Redis** (Filas e Cache)
- **Laravel Sanctum** (Autenticação SPA)
- **Gemini AI API** (Processamento de documentos)

## 🛠 Configuração Inicial (WSL2 / Docker)

1. **Entrar na pasta:** `cd backend`
2. **Instalar dependências (via Docker):**
   ```bash
   docker run --rm -u "$(id -u):$(id -g)" -v "$(pwd):/var/www/html" -w /var/www/html laravelsail/php8.3-composer:latest composer install --ignore-platform-reqs