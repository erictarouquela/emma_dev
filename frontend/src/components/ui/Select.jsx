/**
 * Select — dropdown field with label, error message, and custom chevron indicator.
 */
import { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/utils/cn';

export const Select = forwardRef(function Select(
  { label, error, helperText, options = [], placeholder, disabled, className, ...props },
  ref,
) {
  const selectId =
    props.id ??
    label?.toLowerCase().replace(/\s+/g, '-') ??
    Math.random().toString(36).slice(2);

  return (
    <div className="space-y-1">
      {label && (
        <label
          htmlFor={selectId}
          className="block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? `${selectId}-error` : undefined}
          className={cn(
            'w-full py-2.5 pl-3 pr-10 text-sm text-slate-900 dark:text-slate-50',
            'bg-white dark:bg-slate-800 border rounded-xl appearance-none outline-none transition-colors',
            error
              ? 'border-red-400 dark:border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
              : 'border-slate-200 dark:border-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:focus:border-emerald-400',
            disabled && 'opacity-50 cursor-not-allowed',
            className,
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
          <ChevronDown className="w-4 h-4" />
        </span>
      </div>

      {error && (
        <p id={`${selectId}-error`} className="text-sm text-red-500 dark:text-red-400">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-sm text-slate-500 dark:text-slate-400">{helperText}</p>
      )}
    </div>
  );
});
