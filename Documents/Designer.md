Com base nos elementos visuais descritos nos conteúdos da EMMA e nas melhores práticas para interfaces de saúde e bem-estar, aqui está a proposta de design para o seu dashboard, seguida do prompt de sistema para desenvolvimento.

### **Descrição do Design: Estética EMMA Wellness**

O estilo visual da EMMA é focado em **equilíbrio, clareza e acolhimento**. Para um dashboard funcional, utilizaremos uma abordagem **"Modern Clinical"**, que prioriza cores sólidas e espaços em branco para reduzir o "ruído" cognitivo, refletindo o ambiente relaxante da clínica.

**Paleta de Cores (Sólidas):**
*   **Cor Primária (Deep Emerald/Teal):** Representa saúde, renovação e a natureza profissional da clínica. 
    *   *Uso:* Botões de ação principal (CTA), ícones ativos e barras laterais.
*   **Cor de Fundo (Slate Gray Ultra Light):** Um cinza quase branco que evita o cansaço visual do branco puro.
    *   *Uso:* Fundo geral do dashboard.
*   **Cores de Texto (Slate 900/600):** Cinzas muito escuros para legibilidade máxima em títulos e descrições.
*   **Cores de Estado:**
    *   *Sucesso (Verde Sólido):* Para marcações confirmadas ou pagamentos validados.
    *   *Aviso (Âmbar/Laranja):* Para vouchers próximos da expiração (limite de 6 meses).

**Estilo de Componentes:**
*   **Bordas:** Arredondamento suave (`rounded-xl`) para transmitir amigabilidade e conforto.
*   **Cards:** Elevações mínimas ou bordas sólidas finas para separar tratamentos (Massagens, Fisioterapia, etc.).
*   **Tipografia:** Sans-serif moderna (Inter ou Geist) para uma aparência técnica, mas acessível.

---

### **System Prompt para Desenvolvimento (React + Tailwind + Lucide)**

Copie e utilize o prompt abaixo para orientar a criação do código do seu dashboard:

> "Você é um Engenheiro de Frontend sênior especializado em React, Tailwind CSS e Lucide Icons. Seu objetivo é criar um dashboard administrativo para a EMMA (Clínica de Saúde e Bem-Estar). 
>
> **Diretrizes de Design:**
> 1. **Estética:** Limpa, minimalista e profissional. O layout deve evocar 'equilíbrio e organização'.
> 2. **Paleta de Cores Tailwind:**
>    - Primary: `emerald-800` (Ações principais).
>    - Background: `slate-50`.
>    - Surface/Cards: `white` com bordas `slate-200`.
>    - Text: `slate-900` para headers e `slate-600` para corpo.
> 3. **Componentes:** Use Lucide Icons para navegação. Crie componentes para:
>    - **Sidebar:** Navegação para Clínica, Escola, Vouchers e Agenda.
>    - **Estatísticas:** Cards exibindo 'Vouchers Ativos', 'Marcações Hoje' e 'Taxas de Cancelamento'.
>    - **Lista de Marcações:** Tabela sólida com status coloridos (Pendente, Confirmado, Concluído).
> 4. **Funcionalidades no UI:** Inclua alertas visuais para regras de negócio específicas, como vouchers expirando em 6 meses ou marcações com menos de 48h de aviso para remarcação.
> 5. **Código:** Gere componentes funcionais React, utilize `lucide-react` para ícones e garanta que o layout seja totalmente responsivo usando a grade e o flexbox do Tailwind."

### **Sugestão de Estrutura de UI**
Para o dashboard, você deve focar nos módulos identificados nas fontes:
1.  **Módulo de Vouchers:** Controle da validade de 6 meses e estado (pessoal/oferta).
2.  **Módulo de Agenda:** Visualização por gabinete e terapeuta, com sinalização de atrasos (redução de tempo de massagem).
3.  **Módulo Financeiro:** Integração de taxas de desmarcação (5€ para avisos < 24h).