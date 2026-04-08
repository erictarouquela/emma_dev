Com base no esquema da base de dados e na interface da **Ficha de Marcações** apresentada nos documentos, aqui estão as instruções estruturadas para o preenchimento correto deste formulário:

### **Instruções para Preenchimento da Ficha de Marcações**

O preenchimento desta ficha é essencial para a organização operacional da clínica e para a correta faturação e pagamento aos terapeutas.

#### **1. Identificação e Estado da Marcação**
*   **Nº de Marcação:** Atribuído automaticamente pelo sistema (`marcacao_id`).
*   **EMMA:** Selecionar a unidade onde o serviço será prestado (ex: Lisboa), garantindo a associação à tabela `lst_emmas`.
*   **Estado:** Definir o status atual (ex: "Pendente", "Confirmado" ou "Concluído"). Este campo está ligado à tabela `lst_estados`.

#### **2. Vinculação de Cliente e Voucher**
*   **Cliente:** Associar obrigatoriamente a ficha ao cliente registado na base de dados (`bd_clientes`).
*   **Voucher:** Introduzir o número do voucher correspondente. O sistema deve validar se o voucher está dentro do **prazo de validade de 6 meses** e se não foi previamente anulado por não comparência.

#### **3. Agendamento de Data, Hora e Recurso**
*   **Dia/Hora:** Selecionar a data e o horário da sessão. É importante registar a hora exata, pois **atrasos do cliente podem reduzir o tempo da massagem** para não afetar agendamentos seguintes.
*   **Gabinete (G):** Selecionar a sala disponível (ex: G2), conforme a lista de gabinetes (`lst_gabinetes`).

#### **4. Detalhes do Serviço e Profissional**
*   **Tipo:** Indicar a modalidade de tratamento (ex: Massagem Casal, Terapia Sacro-Craniana). Este campo deve corresponder às opções da tabela `lst_tiposmassagem`.
*   **Terapeuta:** Selecionar o profissional responsável. Este registo é fundamental para que o sistema de pagamentos aos terapeutas seja transparente e processado em tempo real.

#### **5. Observações e Regras de Gestão**
*   **Obs (Observações):** Espaço para notas relevantes sobre o atendimento ou condições específicas do cliente.
*   **Gestão de Alterações:** Caso o cliente solicite desmarcar ou remarcar, as alterações devem ser feitas com **48h de antecedência**. Se o aviso ocorrer com menos de 24h, deve ser registada a aplicação da **taxa adicional de 5€**.
*   **Controlo de Inserção:** Os campos `marcacao_ins` e `marcacao_updt` registam automaticamente a data de criação e as modificações feitas na ficha para auditoria.

**Dica Operacional:** O sistema prevê a sincronização destas marcações em tempo real com o **Google Calendar** e o software **TOC Online**, garantindo que a disponibilidade e a faturação estejam sempre atualizadas.