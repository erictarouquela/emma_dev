Com base no esquema de base de dados e na interface visual da **Ficha de Cliente** apresentados no documento `shema_bd_forms.pdf`, aqui está um conjunto de instruções estruturadas para o preenchimento correto e padronizado dos dados:

### **Instruções para Preenchimento da Ficha de Cliente**

O preenchimento deve seguir a lógica da base de dados `bd_clientes` para garantir a integridade dos dados e a eficácia das automações de marketing e faturação.

#### **1. Identificação e Contexto Inicial**
*   **Nº de Cliente:** Campo geralmente auto-incrementado pelo sistema (`cliente_id`). Não deve ser alterado manualmente, a menos que seja uma migração de dados.
*   **EMMA:** Selecionar a unidade/localização correspondente (ex: Lisboa), garantindo a associação correta à tabela `lst_emmas`.
*   **Estado:** Definir o status atual do registo (ex: "Incompleto" para novos leads ou "Ativo" para clientes validados).
*   **Origem:** Indicar como o cliente chegou à EMMA (ex: Goodlife, Odisseias, Direto), selecionando uma das opções da tabela `lst_tiposorigem`.

#### **2. Dados Pessoais e Fiscais**
*   **Nome:** Inserir o nome completo do cliente conforme consta no documento de identificação.
*   **Data Nascimento:** Preencher no formato DD/MM/AAAA para permitir automações de mensagens de aniversário e segmentação por faixa etária (`cliente_dtnas`).
*   **NIF:** Introduzir o Número de Identificação Fiscal para garantir a emissão correta de faturas via TOC Online.

#### **3. Informações de Contacto**
*   **Tel Contacto:** Inserir o número de telemóvel preferencial. Este campo é crítico para os agentes de IA de WhatsApp e assistência telefónica.
*   **Email:** Registar um endereço eletrónico válido. Este campo alimenta o fluxo de envio de vouchers e faturação.
*   **Bounce:** Campo técnico para sinalizar emails que retornaram erro. Geralmente gerido pelo sistema, mas deve ser observado se houver falhas de comunicação.

#### **4. Localização (Morada)**
*   **Morada:** Inserir o logradouro completo.
*   **Código Postal:** Preencher obrigatoriamente para fins estatísticos e de envio de correspondência, se necessário.
*   **Localidade:** Indicar a cidade ou região de residência.

#### **5. Preferências e Observações**
*   **Publicidade (Checkbox):** Marcar "Não pretende receber publicidade" caso o cliente opte pelo *opt-out* de comunicações de marketing, garantindo conformidade com o RGPD (`cliente_nopub`).
*   **Obs (Observações):** Espaço para notas relevantes, como restrições médicas, alergias ou preferências específicas para tratamentos.

#### **6. Controlo Interno (Campos de Sistema)**
*   **Nº Recibo:** Referência ao último documento financeiro emitido.
*   **Terapeuta:** Possibilidade de associar um terapeuta preferencial ou responsável pelo acompanhamento (`cliente_terapeuta`).
*   **Datas de Atualização:** Os campos `cliente_dtins` (inserção) e `cliente_dtupdt` (última atualização) são preenchidos automaticamente pelo sistema para rastreabilidade.

---
**Nota de Colaboração:** Estas instruções garantem que, ao preencher a ficha, os dados fluam corretamente para as tabelas relacionadas de **Vouchers** e **Marcações**, que aparecem listadas no rodapé da ficha de cliente na interface do sistema.