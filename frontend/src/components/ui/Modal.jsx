import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { cn } from '@/utils/cn'

/**
 * Modal component — renders a dialog portal over the page.
 * Traps focus inside while open and restores it on close.
 *
 * @param {boolean}  props.isOpen   - Controls visibility.
 * @param {Function} props.onClose  - Callback to close.
 * @param {string}   props.title    - Title in modal header.
 * @param {'sm'|'md'|'lg'|'xl'} [props.size='md'] - Max-width preset.
 * @param {React.ReactNode} props.children
 */
export function Modal({ isOpen, onClose, title, size = 'md', children }) {
  const panelRef = useRef(null)
  const previousFocusRef = useRef(null)

  // Focus trap + Escape close
  useEffect(() => {
    if (!isOpen) return

    // Remember the element that was focused before the modal opened
    previousFocusRef.current = document.activeElement

    // Move focus into the modal panel
    const raf = requestAnimationFrame(() => {
      panelRef.current?.focus()
    })

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      // Trap Tab/Shift+Tab inside the modal
      if (e.key !== 'Tab') return
      const focusable = panelRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
      if (!focusable || focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus() }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('keydown', handleKeyDown)
      // Restore focus on close
      previousFocusRef.current?.focus()
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    // xl maps to max-w-2xl (672px) — intentionally larger than Tailwind's max-w-xl (576px)
    xl: 'max-w-2xl',
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={cn(
          'relative w-full bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 focus:outline-none',
          sizeClasses[size] ?? sizeClasses.md,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800">
          <h2 id="modal-title" className="text-lg font-semibold text-slate-900 dark:text-slate-50">
            {title}
          </h2>
          <button
            onClick={onClose}
            aria-label="Fechar modal"
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:text-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">{children}</div>
      </div>
    </div>,
    document.body,
  )
}
