/**
 * Spinner — animated loading indicator in three sizes.
 */
import { cn } from '@/utils/cn';

const sizes = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
};

export function Spinner({ size = 'md', label = 'Loading...', className }) {
  return (
    <div
      role="status"
      aria-label={label}
      className={cn(
        'border-2 border-slate-200 border-t-emerald-600 rounded-full animate-spin',
        'dark:border-slate-700 dark:border-t-emerald-400',
        sizes[size],
        className,
      )}
    />
  );
}
