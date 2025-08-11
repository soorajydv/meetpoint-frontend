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
      className="p-2 rounded-md hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors"
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </span>
  )
}
