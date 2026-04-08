# Fluxo de Gestão de Alunos/Clientes — EMMA

## Visão Geral
CRUD completo de clientes e alunos com gestão documental para candidatos internacionais.

## Fluxo de Criação de Cliente
```
1. Admin clica "Novo Cliente" na lista
2. Modal/página de criação abre
3. Preenche dados obrigatórios (nome, email, telemóvel)
4. Preenche dados opcionais (morada, NIF, género, etc.)
5. Define preferência de publicidade (RGPD)
6. Validação local (Zod)
7. POST /api/students
8. Sucesso → redirect para ficha do cliente ou lista
```

## Fluxo de Upload de Documentos
```
1. Na ficha do cliente → tab "Documentos"
2. Clica "Adicionar Documento"
3. Seleciona tipo (BI, Passaporte, Visa, Certificado)
4. Preenche número e validade
5. Upload do ficheiro
6. POST /api/student-documents
7. Backend valida e armazena
8. Documento aparece na lista
```

## Regras de Negócio
- **RGPD**: Checkbox `cliente_nopub` para opt-out de publicidade
- **Candidatos Internacionais**: Necessitam documentos adicionais (visa, passaporte)
- **NIF**: Obrigatório para faturação
- **Data Nascimento**: Permite automações de aniversário
- **Status**: `active` (cliente validado) ou `inactive` (lead/incompleto)
