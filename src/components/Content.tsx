import { useState } from 'react'
import type { FocusEvent, MouseEvent } from 'react'
import type { Page } from '../types'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'

const CAREER_START_YEAR = 2018
const PREVIEW_CURSOR_OFFSET = 18

interface Project {
  title: string
  description: string
  tags: string[]
  github?: string
  demo?: string
  image?: string
  imagePosition?: string
}

const projects: Project[] = [
  {
    title: 'Corewar',
    image: '/img/corewar.gif',
    imagePosition: 'center 0%',
    description:
      'A Corewar arena and visualizer where tiny assembly champions fight for memory, with custom parsers, cycle inspection, and match replay tools.',
    github: "https://github.com/Leith42/Corewar",
    tags: ['C', 'ASM', 'VM', 'Parser'],
  },
  {
    title: "Queen's Pit",
    image: '/img/ant.gif',
    imagePosition: 'center 50%',
    description:
      'A competitive ant colony game where multiple pathfinding and resource-allocation algorithms battle on the same map to see which hive survives longest.',
    tags: ['C++', 'Algorithms', 'AI', 'Simulation'],
  },
  {
    title: 'DGSE - Recruitment Program',
    image: '/img/dgse.gif',
    imagePosition: 'center 50%',
    description:
      'Multiplayer cognitive challenge game inspired by the Försvarsmakten recruitment game from the early 2010s.',
    tags: ['TypeScript', 'React', 'WebSocket', 'Next.js', 'Pixi.js', 'Howler.js'],
  },
  {
    title: 'Zik',
    image: '/img/zik.gif',
    imagePosition: 'center 89%',
    description:
      'A CLI audio player packed with playlist queues, live spectrum views, keyboard macros, visual presets, radio streams, and way too many flags.',
    tags: ['C', 'CLI', 'Termbox2', 'FFmpeg'],
  },
  {
    title: 'Samurai Kirby',
    image: '/img/kirby-samurai.gif',
    imagePosition: 'center',
    description: 'Web recreation of the Samurai Kirby minigame from Kirby Super Star Ultra.',
    github: 'https://github.com/Leith42/samurai-kirby',
    demo: 'https://samurai-kirby.leith.sh',
    tags: ['TypeScript', 'React', 'WebSocket'],
  },
  {
    title: "Conway's Game of Life",
    imagePosition: 'center 55%',
    image: '/img/gol.gif',
    description: "A Conway's Game of Life implementation built with PyGame.",
    github: 'https://github.com/Leith42/Game-of-Life',
    tags: ['Python', 'PyGame', 'Cellular Automaton'],
  },
]

interface ContentProps {
  activePage: Page
  onReachOutClick?: () => void
  onNavigate?: (page: Page) => void
}

interface PreviewState {
  project: Project
  x: number
  y: number
}

export function Content({ activePage, onReachOutClick, onNavigate }: ContentProps) {
  const yearsOfExperience = new Date().getFullYear() - CAREER_START_YEAR
  const [previewedProject, setPreviewedProject] = useState<PreviewState | null>(null)

  const showPreview = (project: Project, x: number, y: number) => {
    setPreviewedProject({ project, x, y })
  }

  const updatePreviewPosition = (x: number, y: number) => {
    setPreviewedProject((current) => (current ? { ...current, x, y } : current))
  }

  const getPointerPosition = (event: MouseEvent<HTMLElement>) => ({
    x: event.clientX + PREVIEW_CURSOR_OFFSET,
    y: event.clientY + PREVIEW_CURSOR_OFFSET,
  })

  const getFocusPreviewPosition = (event: FocusEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()

    return {
      x: rect.right + PREVIEW_CURSOR_OFFSET,
      y: rect.top + PREVIEW_CURSOR_OFFSET,
    }
  }

  const closePreview = (title?: string) => {
    if (!title || previewedProject?.project.title === title) {
      setPreviewedProject(null)
    }
  }

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
      <div className="content content-projects">
        {/*<h2>Projects</h2>*/}
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.title} className="project-card">
              <h3>{project.title}</h3>
              {project.image && (
                <button
                  type="button"
                  className="project-image-button"
                  onMouseEnter={(event) => {
                    const { x, y } = getPointerPosition(event)
                    showPreview(project, x, y)
                  }}
                  onMouseMove={(event) => {
                    const { x, y } = getPointerPosition(event)
                    updatePreviewPosition(x, y)
                  }}
                  onMouseLeave={() => closePreview(project.title)}
                  onFocus={(event) => {
                    const { x, y } = getFocusPreviewPosition(event)
                    showPreview(project, x, y)
                  }}
                  onBlur={() => closePreview(project.title)}
                  aria-label={`Preview ${project.title}`}
                >
                  <img
                    src={project.image}
                    alt={`${project.title} preview`}
                    className="project-image"
                    style={project.imagePosition ? { objectPosition: project.imagePosition } : undefined}
                  />
                </button>
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
        {previewedProject?.project.image && (
          <div
            className="project-preview"
            aria-live="polite"
            style={{ left: `${previewedProject.x}px`, top: `${previewedProject.y}px` }}
          >
            <div className="project-preview-panel">
              <span className="project-preview-label">Previewing {previewedProject.project.title}</span>
              <img
                src={previewedProject.project.image}
                alt={`${previewedProject.project.title} enlarged preview`}
                className="project-preview-image"
                style={
                  previewedProject.project.imagePosition
                    ? { objectPosition: previewedProject.project.imagePosition }
                    : undefined
                }
              />
            </div>
          </div>
        )}
        <p className="projects-note">* Some projects are still private, so code and demos may show up later.</p>
      </div>
    )
  }

  return null
}
