# ThemeToggle Component

## Descrição
Botão de alternância entre Light e Dark mode no header. Usa ícones Sun/Moon do Lucide.

## Props
Nenhuma — usa ThemeContext internamente.

## Implementação Base
```jsx
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
    >
      {theme === 'dark'
        ? <Sun className="w-5 h-5 text-amber-400" />
        : <Moon className="w-5 h-5 text-slate-600" />
      }
    </button>
  )
}
```

## ThemeContext
```jsx
// contexts/ThemeContext.jsx
import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light')

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
```
