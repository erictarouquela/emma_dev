import { cn } from '@/utils/cn'

export function PageContainer({ children, title, actions, className }) {
  return (
    <main className="flex-1 overflow-auto">
      <div className={cn('p-6 max-w-7xl mx-auto', className)}>
        {(title || actions) && (
          <div className="flex items-center justify-between mb-6">
            {title && (
              <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
                {title}
              </h1>
            )}
            {actions && (
              <div className="flex items-center gap-3">{actions}</div>
            )}
          </div>
        )}
        {children}
      </div>
    </main>
  )
}
