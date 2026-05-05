import { useEffect, useMemo, useState } from 'react'

export type ThemeName = 'day' | 'night'

const STORAGE_KEY = 'clima-theme-override'

function themeByTime(date = new Date()): ThemeName {
  const hour = date.getHours()
  return hour >= 5 && hour < 18 ? 'day' : 'night'
}

function storedTheme(): ThemeName | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value === 'day' || value === 'night' ? value : null
  } catch {
    return null
  }
}

function saveTheme(theme: ThemeName | null) {
  try {
    if (theme) {
      localStorage.setItem(STORAGE_KEY, theme)
      return
    }

    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Browser storage can be unavailable in private contexts.
  }
}

export function useTheme() {
  const [autoTheme, setAutoTheme] = useState<ThemeName>(() => themeByTime())
  const [manualTheme, setManualTheme] = useState<ThemeName | null>(() => storedTheme())

  useEffect(() => {
    const timer = window.setInterval(() => setAutoTheme(themeByTime()), 60_000)
    return () => window.clearInterval(timer)
  }, [])

  const activeTheme = manualTheme ?? autoTheme

  return useMemo(
    () => ({
      activeTheme,
      isManual: manualTheme !== null,
      resetAutoTheme: () => {
        setManualTheme(null)
        saveTheme(null)
      },
      toggleTheme: () => {
        const nextTheme = activeTheme === 'day' ? 'night' : 'day'
        setManualTheme(nextTheme)
        saveTheme(nextTheme)
      },
    }),
    [activeTheme, manualTheme],
  )
}
