import { FaHouse, FaCode } from 'react-icons/fa6'
import type { Page } from '../types'

interface MainNavProps {
  activePage: Page
  onNavigate: (page: Page) => void
}

export function MainNav({ activePage, onNavigate }: MainNavProps) {
  const handleClick = (page: Page) => (e: React.MouseEvent) => {
    e.preventDefault()
    onNavigate(page)
  }

  return (
    <nav className="main-nav" aria-label="Main navigation">
      <a
        href="#home"
        className={activePage === 'home' ? 'active' : ''}
        onClick={handleClick('home')}
        aria-current={activePage === 'home' ? 'page' : undefined}
      >
        <FaHouse aria-hidden="true" /> About
      </a>
      <span className="separator" aria-hidden="true">
        |
      </span>
      <a
        href="#projects"
        className={activePage === 'projects' ? 'active' : ''}
        onClick={handleClick('projects')}
        aria-current={activePage === 'projects' ? 'page' : undefined}
      >
        <FaCode aria-hidden="true" /> Projects
      </a>
    </nav>
  )
}
