import { AlertTriangle, Info, CheckCircle, XCircle, X } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/utils/cn'

const variants = {
  info: {
    container: 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800',
    icon: 'text-blue-500 dark:text-blue-400',
    text: 'text-blue-800 dark:text-blue-200',
    Icon: Info,
  },
  warning: {
    container: 'bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800',
    icon: 'text-amber-500 dark:text-amber-400',
    text: 'text-amber-800 dark:text-amber-200',
    Icon: AlertTriangle,
  },
  success: {
    container: 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800',
    icon: 'text-green-500 dark:text-green-400',
    text: 'text-green-800 dark:text-green-200',
    Icon: CheckCircle,
  },
  danger: {
    container: 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800',
    icon: 'text-red-500 dark:text-red-400',
    text: 'text-red-800 dark:text-red-200',
    Icon: XCircle,
  },
}

/**
 * Persistent banner for business rule warnings (voucher expiry, cancellation fees, etc.).
 * Data driving these banners always comes from the API — frontend only displays.
 */
export function AlertBanner({ type = 'info', message, dismissible = false, className }) {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  const v = variants[type] ?? variants.info

  return (
    <div
      role="alert"
      className={cn(
        'flex items-start gap-3 px-4 py-3 rounded-xl border text-sm',
        v.container,
        className,
      )}
    >
      <v.Icon className={cn('w-4 h-4 flex-shrink-0 mt-0.5', v.icon)} aria-hidden="true" />
      <p className={cn('flex-1', v.text)}>{message}</p>
      {dismissible && (
        <button
          onClick={() => setDismissed(true)}
          aria-label="Fechar alerta"
          className={cn('flex-shrink-0 p-0.5 rounded hover:opacity-70 transition-opacity', v.icon)}
        >
          <X className="w-3.5 h-3.5" aria-hidden="true" />
        </button>
      )}
    </div>
  )
}
