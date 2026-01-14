import { FaSun, FaMoon } from 'react-icons/fa6'
import { Cat } from './Cat'
import type { Theme } from '../types'

interface HeaderProps {
  theme: Theme
  spinning: boolean
  onToggleTheme: () => void
}

export function Header({ theme, spinning, onToggleTheme }: HeaderProps) {
  return (
    <header>
      <Cat />
      <div className="header-text">
        <h1>leith</h1>
        <p>Coffee-driven life form.</p>
      </div>
      <button
        className={`theme-toggle${spinning ? ' spin' : ''}`}
        onClick={onToggleTheme}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      >
        {theme === 'dark' ? <FaSun aria-hidden="true" /> : <FaMoon aria-hidden="true" />}
      </button>
    </header>
  )
}
