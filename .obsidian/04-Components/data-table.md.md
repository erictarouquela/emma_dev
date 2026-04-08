# DataTable Component

## Descrição
Tabela reutilizável com paginação, ordenação e pesquisa. Usada em listas de clientes, marcações, pagamentos, etc.

## Props
| Prop | Tipo | Descrição |
|---|---|---|
| `columns` | Column[] | Definição das colunas |
| `data` | any[] | Array de dados |
| `loading` | boolean | Exibe skeleton/spinner |
| `emptyMessage` | string | Mensagem quando não há dados |
| `searchable` | boolean | Ativa barra de pesquisa |
| `onRowClick` | function | Handler ao clicar na linha |

## Column Definition
```js
{
  key: 'first_name',    // chave do objeto
  label: 'Nome',        // header da coluna
  sortable: true,       // permite ordenar
  render: (value, row) => <StatusBadge status={value} />,  // renderer customizado
}
```

## Exemplo
```jsx
<DataTable
  columns={[
    { key: 'first_name', label: 'Nome', sortable: true },
    { key: 'email', label: 'Email' },
    { key: 'status', label: 'Estado', render: (v) => <StatusBadge status={v} /> },
  ]}
  data={students}
  loading={isLoading}
  searchable
/>
```

## Design
- Header: `slate-50` / `dark:slate-800` com texto `slate-600`
- Rows: alternância de cores suave
- Hover: `slate-50` / `dark:slate-800/50`
- Paginação no rodapé
- Skeleton loading quando `loading=true`
