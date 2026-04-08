# Prompt: Criar Feature de Login — EMMA

## Contexto
Estás a criar a feature de login para o dashboard da EMMA (Clínica de Saúde e Bem-Estar). O projeto usa React 19, Vite, Tailwind CSS, React Hook Form, Zod, Axios e Lucide React.

## Prompt para o Agente

> Cria a feature de login completa para a EMMA. O frontend é 100% desacoplado — NÃO processa nenhuma lógica de negócio, apenas envia e exibe dados.
>
> **Arquivos a criar:**
> 1. `src/services/axios.js` — instância Axios com baseURL `http://localhost:8000/api`, headers JSON e interceptor 401
> 2. `src/services/api/auth.js` — funções `login(email, password)` e `logout()`
> 3. `src/contexts/AuthContext.jsx` — context com user, token, login, logout, isAuthenticated
> 4. `src/schemas/login.js` — schema Zod: email (obrigatório, email válido), password (mín. 8 chars)
> 5. `src/pages/auth/LoginPage.jsx` — página de login com:
>    - Logo EMMA centralizado
>    - Card branco centrado sobre bg-slate-50
>    - Input de email e PasswordInput (com toggle show/hide)
>    - Botão primário `bg-emerald-800` com loading state
>    - Mensagem de erro
>    - Link para /register
>    - Suporte dark mode (dark:bg-slate-950, card dark:bg-slate-900)
> 6. `src/components/ui/Input.jsx` — input reutilizável com label e error
> 7. `src/components/ui/Button.jsx` — botão com variants (primary/secondary/danger), loading, disabled
>
> **API:**
> - `POST /api/auth/login` → `{ email, password }` → `{ token, user }`
> - Salvar token no localStorage e AuthContext
> - Configurar Axios Authorization header
> - Redirect para /dashboard após sucesso
>
> **Design:** Modern Clinical — cores emerald-800, slate-50, rounded-xl, font Inter
> **Ícones:** Lucide React (Eye, EyeOff, Loader2, Mail, Lock)

## Checklist de Validação
- [ ] Formulário valida com Zod antes de enviar
- [ ] Loading state no botão durante request
- [ ] Erro exibido abaixo do formulário se 422
- [ ] Token salvo no localStorage
- [ ] Axios header atualizado após login
- [ ] Redirect para /dashboard após sucesso
- [ ] Dark mode funcional
- [ ] Layout responsivo
- [ ] Nenhuma lógica de negócio no frontend
