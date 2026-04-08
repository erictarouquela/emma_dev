Para complementar a identidade da EMMA, o Modo Dark Moderno deve focar em uma estética de "luxo relaxante", utilizando tons profundos que remetam ao descanso e ao desconectar do mundo, conforme sugerido nos valores da clínica
. Em vez de usar um preto puro, utilizaremos cinzas azulados e esmeraldas profundos para manter a sofisticação.
Descrição do Design: Modo Dark "Deep Wellness"
Este estilo foca em contraste suave e legibilidade, ideal para ambientes de gestão clínica que exigem foco prolongado.
Cores de Fundo: Utilização de slate-950 para o fundo principal e slate-900 para os cards e superfícies, criando uma hierarquia visual clara.
Cor de Destaque (Vibrant Emerald): O verde esmeralda (Primary) deve subir de tom (ex: emerald-400 ou emerald-500) para garantir acessibilidade e brilho contra o fundo escuro.
Tipografia: Texto principal em slate-50 e textos secundários em slate-400 para evitar o brilho excessivo que causa fadiga ocular.
Efeito Moderno: Uso de bordas sutis em slate-800 e efeitos de "glassmorphism" (transparência com desfoque) em modais de agendamento.

--------------------------------------------------------------------------------
System Prompt Atualizado (React + Tailwind + Lucide + Dark Mode)
Este prompt agora inclui a lógica de alternância para o modo escuro moderno:
"Você é um Engenheiro de Frontend sênior. Crie um dashboard para a EMMA que suporte Light e Dark Mode usando as classes dark: do Tailwind CSS.
Diretrizes de Design Dark Mode:
Fundo: Use dark:bg-slate-950.
Cards e Sidebar: Use dark:bg-slate-900 com bordas dark:border-slate-800.
Cores de Texto: Títulos em dark:text-slate-50 e descrições em dark:text-slate-400.
Acentos: O Emerald deve ser dark:text-emerald-400 e botões dark:bg-emerald-600.
Componentes Específicos com Regras de Negócio das Fontes:
Card de Voucher: Deve destacar visualmente o prazo de 6 meses de validade
. Se faltar menos de 30 dias, use um alerta amber-500 pulsante.
Painel de Marcações: Liste tratamentos como Terapia Sacro-Craniana e Massagem Relax-Mix
.
Sistema de Alertas: Exiba avisos sobre a taxa de 5€ para desmarcações com menos de 24h e a regra de redução do tempo de massagem em caso de atraso do cliente
,
.
Navegação: Use ícones da Lucide (Calendar, User, Ticket, Settings) com estados hover suaves.
Requisito Técnico: Utilize lucide-react para ícones e garanta que o componente de alternância de tema (Sun/Moon) esteja visível no Header."
Sugestão de Funcionalidade no Dashboard
Para o modo dark, você pode adicionar um "Modo Foco" na agenda. Como a EMMA enfatiza o "redescobrir o equilíbrio" e "desconectar-se do mundo", o dashboard pode ter uma visualização simplificada das marcações do dia para que o terapeuta ou recepcionista veja apenas o essencial, reduzindo o stress visual