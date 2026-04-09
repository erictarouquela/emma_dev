import { useEffect, useRef, useState } from 'react'
import { Search, X } from 'lucide-react'
import { cn } from '@/utils/cn'

/**
 * SearchBar — controlled search input with debounced onChange and a clear button.
 *
 * @param {string}   props.value            - Controlled external value.
 * @param {Function} props.onChange         - Called with the debounced value after user stops typing.
 * @param {string}   [props.placeholder]
 * @param {number}   [props.debounceMs=300]
 * @param {string}   [props.className]
 * @param {string}   [props.aria-label]     - Accessible label (defaults to placeholder).
 */
export function SearchBar({
  value,
  onChange,
  placeholder = 'Pesquisar...',
  debounceMs = 300,
  className,
  'aria-label': ariaLabel,
}) {
  const [inputValue, setInputValue] = useState(value ?? '')
  // Track whether the last inputValue change was externally driven (skip debounce loop)
  const externalUpdate = useRef(false)

  // Sync internal state when the controlled value changes externally (e.g. parent clears)
  useEffect(() => {
    externalUpdate.current = true
    setInputValue(value ?? '')
  }, [value])

  // Debounce: only call onChange after the user stops typing.
  // `onChange` is intentionally excluded from deps — including it would restart the timer
  // on every parent re-render. The ref below gives us the latest version without triggering effects.
  const onChangeRef = useRef(onChange)
  useEffect(() => { onChangeRef.current = onChange })

  useEffect(() => {
    if (externalUpdate.current) {
      externalUpdate.current = false
      return // Skip debounce when the change was driven externally
    }
    const timer = setTimeout(() => {
      onChangeRef.current(inputValue)
    }, debounceMs)
    return () => clearTimeout(timer)
  }, [inputValue, debounceMs])

  function handleClear() {
    setInputValue('')
    onChange('')
  }

  return (
    <div className={cn('relative', className)}>
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
        aria-hidden="true"
      />
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel ?? placeholder}
        className="w-full pl-10 pr-10 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-50 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:focus:border-emerald-400 transition-colors"
      />
      {inputValue && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Limpar pesquisa"
          className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>
      )}
    </div>
  )
}
