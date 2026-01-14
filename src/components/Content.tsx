import type { Page } from '../types'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'

const CAREER_START_YEAR = 2018

interface Project {
  title: string
  description: string
  tags: string[]
  github?: string
  demo?: string
  image?: string
}

const projects: Project[] = [
  {
    title: 'Samurai Kirby',
    image: '/img/kirby-samurai.gif',
    description: 'Web recreation of the Samurai Kirby minigame from Kirby Super Star Ultra.',
    github: 'https://github.com/Leith42/samurai-kirby',
    demo: 'https://samurai-kirby.leith.sh',
    tags: ['TypeScript', 'React', 'Websocket'],
  },
  {
    title: "Conway's Game of Life",
    image: '/img/gol.gif',
    description: "A Conway's Game of Life implementation built with PyGame.",
    github: 'https://github.com/Leith42/Game-of-Life',
    tags: [ 'Python', 'PyGame', 'Cellular automaton'],
  },
  {
    title: 'DGSE - Recruitment Program',
    image: '/img/dgse.gif',
    description:
      'Multiplayer cognitive challenge game inspired by the Försvarsmakten recruitment game from the early 2010s.',
    tags: ['TypeScript', 'React', 'Websocket', 'Next.js', 'Pixi.js', 'Howler.js'],
  },
]

interface ContentProps {
  activePage: Page
  onReachOutClick?: () => void
  onNavigate?: (page: Page) => void
}

export function Content({ activePage, onReachOutClick, onNavigate }: ContentProps) {
  const yearsOfExperience = new Date().getFullYear() - CAREER_START_YEAR

  if (activePage === 'home') {
    return (
      <div className="content">
        <h2>
          Hey there! <span className="waving-hand">👋</span>
        </h2>
        <p>
          I'm <span className="highlight">Amine</span>, a Software Engineer with{' '}
          <span className="highlight">{yearsOfExperience}+ years</span> of professional experience,
          currently working as <span className="highlight">Lead Developer</span> for a Parisian
          startup called{' '}
          <a
            href="https://www.e-novate.fr/"
            target="_blank"
            rel="noopener noreferrer"
            className="highlight"
          >
            E-novate
          </a>
          .
        </p>
        <p>
          I enjoy experimenting and building random projects in my free time, you can check some of
          them{' '}
          <button
            type="button"
            onClick={() => onNavigate?.('projects')}
            className="highlight inline-btn"
          >
            here
          </button>
          .
        </p>
        <p>
          If you're up for building something cool together, feel free to{' '}
          <button type="button" onClick={onReachOutClick} className="highlight inline-btn">
            reach out
          </button>
          {'. '}
          🙂
        </p>
      </div>
    )
  }

  if (activePage === 'projects') {
    return (
      <div className="content">
        {/*<h2>Projects</h2>*/}
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.title} className="project-card">
              <h3>{project.title}</h3>
              {project.image && (
                <img
                  src={project.image}
                  alt={`${project.title} preview`}
                  className="project-image"
                />
              )}
              <p>{project.description}</p>
              <div className="project-footer">
                <div className="project-links">
                  {project.github ? (
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <FaGithub /> Code
                    </a>
                  ) : (
                    <span className="project-link-disabled">
                      <FaGithub /> Code
                    </span>
                  )}
                  {project.demo ? (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <FaExternalLinkAlt /> Demo
                    </a>
                  ) : (
                    <span className="project-link-disabled">
                      <FaExternalLinkAlt /> Demo
                    </span>
                  )}
                </div>
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="projects-note">
          * Some code and demos are temporarily unavailable, they’ll be updated soon! 😁
        </p>
      </div>
    )
  }

  return null
}
