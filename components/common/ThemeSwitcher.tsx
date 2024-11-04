'use client'
import { Switch } from '@nextui-org/switch'
import { useTheme } from 'next-themes'

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  return (
    <Switch
      defaultSelected={theme === 'light'}
      onValueChange={(value) => setTheme(value ? 'light' : 'dark')}
      className="text-zinc-800"
      color="secondary"
      thumbIcon={({ isSelected }) => (isSelected ? <SunIcon /> : <MoonIcon />)}
    ></Switch>
  )
}

// иконки спизжены с https://lucide.dev/icons
const SunIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-sun-medium text-zinc-800"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 3v1" />
    <path d="M12 20v1" />
    <path d="M3 12h1" />
    <path d="M20 12h1" />
    <path d="m18.364 5.636-.707.707" />
    <path d="m6.343 17.657-.707.707" />
    <path d="m5.636 5.636.707.707" />
    <path d="m17.657 17.657.707.707" />
  </svg>
)

const MoonIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-moon text-zinc-800"
  >
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
)
