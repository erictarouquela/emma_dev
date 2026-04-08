EMMA (Escola e Clínica de Saúde e Bem-Estar), aqui está uma estrutura de **Product Requirements Document (PRD)** detalhando o escopo, os sistemas, as automações e as funcionalidades previstas::

### **1. Escopo do Projeto**
O objetivo central do projeto é a **integração e automação dos processos administrativos, de agendamento, comunicação e faturação** da EMMA. O escopo abrange a transição de processos manuais (atualmente baseados em Excel, GesVou e Google Calendar) para um ecossistema integrado que utiliza inteligência artificial para otimizar a eficiência operacional e garantir conformidade legal com o RGPD e o AI Act.

O projeto está dividido em **5 módulos fundamentais** que podem ser implementados de forma faseada ao longo de alguns meses.

---

### **2. Principais Sistemas e Integrações**
Para que a solução funcione de forma coesa, os seguintes sistemas serão utilizados ou integrados:
*   **Go High Level (GHL):** Centralizador para automação de captação e fluxos de inscrição.
*   **Google Calendar:** Para gestão de disponibilidade e marcações.
*   **TOC Online:** Sistema central para faturação e controle financeiro.
*   **Agentes de IA:** Integrados via WhatsApp, E-mail e sistemas de voz (assistente telefónico). Criados via Dify.
*   **Canais de Comunicação:** WhatsApp, E-mail e Web.

---

### **3. Automacões Previstas**
As automações visam eliminar tarefas repetitivas e erros humanos identificados no diagnóstico inicial. As principais são:
*   **Validação de Documentos:** Automação do processo de triagem e validação de documentos, especialmente para candidaturas internacionais.
*   **Fluxos para Embaixadas:** Envio automatizado de informações e documentação para embaixadas.
*   **Sincronização Bidirecional:** Atualização em tempo real entre as agendas do Google Calendar e o sistema TOC Online.
*   **Atendimento Inteligente:** Respostas automáticas em múltiplos canais e triagem inicial de clientes/alunos através de IA.
*   **Ciclo de Faturação:** Validação automática de pagamentos, geração de faturas e fluxos SEPA.

---

### **4. Funcionalidades do Sistema (Por Módulo)**

#### **Módulo 1: Captação e Inscrição**
*   **Triagem Automatizada:** Sistema de recepção de candidaturas com validação técnica de requisitos.
*   **Integração GHL:** Fluxos de nutrição e acompanhamento de leads integrados na plataforma Go High Level.
*   **Gestão Documental:** Repositório automatizado para documentos de alunos estrangeiros.

#### **Módulo 2: Gestão de Agendas**
*   **Agendamento em Tempo Real:** Interface para marcação de consultas com disponibilidade atualizada.
*   **Sincronização via API:** Comunicação técnica direta entre o calendário e o software de gestão financeira (TOC Online).

#### **Módulo 3: Comunicação com IA**
*   **Assistente Telefónico IA:** Atendimento de chamadas com capacidade de processamento de linguagem natural.
*   **Chatbots Multicanal:** Agentes treinados para responder dúvidas frequentes no WhatsApp e Web.

#### **Módulo 4: Pagamentos e Faturação**
*   **Gestão de Pagamentos de Terapeutas:** Sistema transparente para que terapeutas acompanhem seus recebimentos em tempo real.
*   **Emissão de Faturas Automática:** Geração de documentos fiscais após validação de pagamento.
*   **Configuração SEPA:** Automação de débitos diretos e transferências padronizadas.

#### **Módulo 5: Conformidade e Segurança**
*   **Camadas de Segurança de Dados:** Proteção técnica de informações sensíveis de alunos e pacientes.
*   **Gestão de Consentimento:** Ferramentas para garantir que o uso de dados esteja alinhado ao RGPD.
*   **Logs de Auditoria:** Registros para garantir a rastreabilidade das interações de IA e automações.

Este PRD estabelece a base para uma operação escalável, reduzindo a carga administrativa manual e modernizando o atendimento da EMMA.