import { createContext, useCallback, useContext, useState } from 'react'
import { createPortal } from 'react-dom'
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react'
import { cn } from '@/utils/cn'

const ToastContext = createContext(null)

const icons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
}

const variants = {
  success: 'bg-green-50 border-green-200 dark:bg-green-900/30 dark:border-green-800 text-green-800 dark:text-green-200',
  error: 'bg-red-50 border-red-200 dark:bg-red-900/30 dark:border-red-800 text-red-800 dark:text-red-200',
  warning: 'bg-amber-50 border-amber-200 dark:bg-amber-900/30 dark:border-amber-800 text-amber-800 dark:text-amber-200',
  info: 'bg-blue-50 border-blue-200 dark:bg-blue-900/30 dark:border-blue-800 text-blue-800 dark:text-blue-200',
}

const iconColors = {
  success: 'text-green-500 dark:text-green-400',
  error: 'text-red-500 dark:text-red-400',
  warning: 'text-amber-500 dark:text-amber-400',
  info: 'text-blue-500 dark:text-blue-400',
}

function ToastItem({ toast, onRemove }) {
  const Icon = icons[toast.type] ?? Info

  return (
    <div
      role="alert"
      aria-live="polite"
      className={cn(
        'flex items-start gap-3 px-4 py-3 rounded-xl border shadow-lg max-w-sm w-full text-sm',
        variants[toast.type] ?? variants.info,
      )}
    >
      <Icon
        className={cn('w-4 h-4 flex-shrink-0 mt-0.5', iconColors[toast.type] ?? iconColors.info)}
        aria-hidden="true"
      />
      <p className="flex-1">{toast.message}</p>
      <button
        onClick={() => onRemove(toast.id)}
        aria-label="Fechar notificacao"
        className="flex-shrink-0 p-0.5 rounded opacity-60 hover:opacity-100 transition-opacity"
      >
        <X className="w-3.5 h-3.5" aria-hidden="true" />
      </button>
    </div>
  )
}

/**
 * Toast notification provider. Wrap your app with <ToastProvider>.
 * Use the useToast() hook to trigger notifications.
 */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, type = 'info', duration = 5000) => {
    const id = crypto.randomUUID()
    setToasts((prev) => [...prev, { id, message, type }])
    if (duration > 0) {
      setTimeout(() => removeToast(id), duration)
    }
  }, [])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {createPortal(
        <div
          aria-label="Notificacoes"
          className="fixed top-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none"
        >
          {toasts.map((toast) => (
            <div key={toast.id} className="pointer-events-auto">
              <ToastItem toast={toast} onRemove={removeToast} />
            </div>
          ))}
        </div>,
        document.body,
      )}
    </ToastContext.Provider>
  )
}

/**
 * Hook to trigger toast notifications.
 * @returns {{ addToast: (message: string, type?: 'success'|'error'|'warning'|'info', duration?: number) => void }}
 */
export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used inside ToastProvider')
  return ctx
}
