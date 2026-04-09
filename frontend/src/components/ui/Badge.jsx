import { cn } from '@/utils/cn';

/**
 * Badge component — compact label for status indicators and tags.
 *
 * @param {'success'|'warning'|'danger'|'info'|'neutral'} [props.variant='neutral'] - Color scheme.
 * @param {'sm'|'md'} [props.size='md'] - Size preset.
 * @param {boolean}  [props.pulse=false] - Adds pulsing animation for urgent alerts.
 * @param {React.ReactNode} props.children - Badge content.
 */
export function Badge({ variant = 'neutral', size = 'md', pulse = false, children }) {
  const variantClasses = {
    success:
      'bg-green-100 text-green-800 ring-1 ring-green-200 dark:bg-green-900/30 dark:text-green-400 dark:ring-green-800',
    warning:
      'bg-amber-100 text-amber-800 ring-1 ring-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:ring-amber-800',
    danger:
      'bg-red-100 text-red-800 ring-1 ring-red-200 dark:bg-red-900/30 dark:text-red-400 dark:ring-red-800',
    info: 'bg-blue-100 text-blue-800 ring-1 ring-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:ring-blue-800',
    neutral:
      'bg-slate-100 text-slate-700 ring-1 ring-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700',
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 font-medium rounded-full',
        variantClasses[variant] ?? variantClasses.neutral,
        sizeClasses[size] ?? sizeClasses.md,
        pulse && 'animate-pulse'
      )}
    >
      {children}
    </span>
  );
}
