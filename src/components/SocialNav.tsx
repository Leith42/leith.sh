import { Fragment } from 'react'
import { FaGithub, FaLinkedin, FaEnvelope, FaXTwitter } from 'react-icons/fa6'

const socialLinks = [
  { href: 'https://github.com/Leith42', icon: FaGithub, label: 'Github' },
  { href: 'https://www.linkedin.com/in/amine-azri/', icon: FaLinkedin, label: 'Linkedin' },
  { href: 'https://x.com/leith42', icon: FaXTwitter, label: 'Twitter' },
  { href: 'mailto:contact@leith.sh', icon: FaEnvelope, label: 'Email' },
] as const

interface SocialNavProps {
  emailShaking?: boolean
}

export function SocialNav({ emailShaking }: SocialNavProps) {
  return (
    <nav className="social-nav" aria-label="Social links">
      {socialLinks.map((link, index) => (
        <Fragment key={link.href}>
          <a
            href={link.href}
            target={link.href.startsWith('mailto:') ? undefined : '_blank'}
            rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
            aria-label={`${link.label} profile`}
            className={link.label === 'Email' && emailShaking ? 'shake' : undefined}
          >
            <link.icon aria-hidden="true" /> {link.label}
          </a>
          {index < socialLinks.length - 1 && (
            <span className="separator" aria-hidden="true">
              |
            </span>
          )}
        </Fragment>
      ))}
    </nav>
  )
}
