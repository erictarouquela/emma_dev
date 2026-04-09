/**
 * Input — text/email/password field with label, icon, error, helper text, and password toggle.
 */
import { forwardRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/utils/cn';

const baseClasses =
  'w-full py-2.5 pr-3 text-sm text-slate-900 dark:text-slate-50 bg-white dark:bg-slate-800 border rounded-xl outline-none transition-colors placeholder:text-slate-400';

const normalBorder =
  'border-slate-200 dark:border-slate-700 focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20';

const errorBorder =
  'border-red-400 dark:border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20';

export const Input = forwardRef(function Input(
  { label, error, helperText, icon: Icon, type = 'text', className, ...props },
  ref,
) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';
  const resolvedType = isPassword ? (showPassword ? 'text' : 'password') : type;

  const inputId =
    props.id ??
    label?.toLowerCase().replace(/\s+/g, '-') ??
    Math.random().toString(36).slice(2);

  return (
    <div className="space-y-1">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          {label}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <Icon className="w-4 h-4" />
          </span>
        )}

        <input
          ref={ref}
          id={inputId}
          type={resolvedType}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={cn(
            baseClasses,
            Icon ? 'pl-10' : 'pl-3',
            isPassword && 'pr-10',
            error ? errorBorder : normalBorder,
            className,
          )}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            tabIndex={-1}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        )}
      </div>

      {error && (
        <p id={`${inputId}-error`} className="text-sm text-red-500 dark:text-red-400">{error}</p>
      )}
      {helperText && !error && (
        <p className="text-sm text-slate-500 dark:text-slate-400">{helperText}</p>
      )}
    </div>
  );
});
