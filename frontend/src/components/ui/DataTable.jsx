import { cn } from '@/utils/cn'

/**
 * DataTable — responsive table with loading skeletons, empty state, and optional row click.
 *
 * @param {Array<{key: string, header: string, render?: (row) => React.ReactNode}>} props.columns
 * @param {Array<object>}  props.data
 * @param {boolean}        [props.loading=false]
 * @param {string}         [props.emptyMessage]
 * @param {Function}       [props.onRowClick]   - Called with the row object on click.
 * @param {string|Function} [props.rowKey='id'] - Field name or (row) => key function for stable row keys.
 *   Falls back to array index if the resolved key is nullish — a documented last resort.
 */
export function DataTable({
  columns = [],
  data = [],
  loading = false,
  emptyMessage = 'Nenhum resultado encontrado.',
  onRowClick,
  rowKey = 'id',
}) {
  function getRowKey(row, index) {
    if (typeof rowKey === 'function') return rowKey(row) ?? index
    return row[rowKey] ?? index
  }

  const renderBody = () => {
    if (loading) {
      return Array.from({ length: 5 }).map((_, i) => (
        <tr key={`skeleton-${i}`}>
          {columns.map((col) => (
            <td key={col.key} className="px-4 py-3">
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse" />
            </td>
          ))}
        </tr>
      ))
    }

    if (data.length === 0) {
      return (
        <tr>
          <td colSpan={columns.length}>
            <div className="text-center py-12 text-slate-400 dark:text-slate-500">
              {emptyMessage}
            </div>
          </td>
        </tr>
      )
    }

    return data.map((row, index) => (
      <tr
        key={getRowKey(row, index)}
        className={cn(
          'hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors',
          onRowClick && 'cursor-pointer',
        )}
        onClick={() => onRowClick?.(row)}
      >
        {columns.map((col) => (
          <td key={col.key} className="px-4 py-3 text-slate-700 dark:text-slate-300">
            {col.render ? col.render(row) : row[col.key]}
          </td>
        ))}
      </tr>
    ))
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">{renderBody()}</tbody>
      </table>
    </div>
  )
}
