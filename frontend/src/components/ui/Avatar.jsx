/**
 * Avatar — displays a user photo or generated initials fallback.
 */
import { useState } from 'react';
import { cn } from '@/utils/cn';

const sizes = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
};

function getInitials(name) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((n) => n[0] ?? '')
    .join('')
    .toUpperCase();
}

export function Avatar({ name = '', src, size = 'md', className }) {
  const [imgError, setImgError] = useState(false);
  const sizeClasses = sizes[size];

  if (src && !imgError) {
    return (
      <img
        src={src}
        alt={name}
        onError={() => setImgError(true)}
        className={cn('rounded-full object-cover', sizeClasses, className)}
      />
    );
  }

  return (
    <div
      className={cn(
        'inline-flex items-center justify-center rounded-full font-medium',
        'bg-emerald-800 text-white dark:bg-emerald-700',
        sizeClasses,
        className,
      )}
      aria-label={name}
    >
      {getInitials(name)}
    </div>
  );
}
