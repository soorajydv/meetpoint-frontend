'use client'

import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

export default function ThemeToggleIcon() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  const isDark = (theme === 'dark') || (theme === 'system' && resolvedTheme === 'dark')

  return (
    <span
      role="button"
      tabIndex={0}
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      onKeyDown={(e) => { if (e.key === 'Enter') setTheme(isDark ? 'light' : 'dark') }}
      className="relative p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors duration-200 cursor-pointer"
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </span>
  )
}
