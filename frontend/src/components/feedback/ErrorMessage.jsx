import { AlertCircle, RefreshCw } from 'lucide-react'

/**
 * Inline error display for API failures.
 * Shows a message and optional retry button.
 */
export function ErrorMessage({ message = 'Ocorreu um erro inesperado.', onRetry }) {
  return (
    <div
      role="alert"
      className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-800"
    >
      <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
      <div className="flex-1 min-w-0">
        <p className="text-sm text-red-700 dark:text-red-300">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200 transition-colors"
          >
            <RefreshCw className="w-3 h-3" aria-hidden="true" />
            Tentar novamente
          </button>
        )}
      </div>
    </div>
  )
}
