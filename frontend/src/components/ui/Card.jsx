/**
 * Card — surface container with consistent border, background, and padding options.
 */
import { cn } from '@/utils/cn';

const paddings = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export function Card({ children, className, padding = 'md', ...props }) {
  return (
    <div
      className={cn(
        'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl',
        paddings[padding],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
