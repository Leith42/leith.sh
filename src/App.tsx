import { useState, useEffect } from 'react'
import './App.css'
import { useTheme } from './hooks/useTheme'
import { Header, MainNav, Content, SocialNav } from './components'
import type { Page } from './types'

const PROJECT_IMAGES = ['/img/kirby-samurai.gif', '/img/gol.gif', '/img/dgse.gif']

function App() {
  const { theme, spinning, toggleTheme } = useTheme()
  const [activePage, setActivePage] = useState<Page>('home')

  useEffect(() => {
    PROJECT_IMAGES.forEach((src) => {
      const img = new Image()
      img.src = src
    })
  }, [])
  const [emailShaking, setEmailShaking] = useState(false)

  const handleReachOutClick = () => {
    setEmailShaking(true)
    setTimeout(() => setEmailShaking(false), 500)
  }

  return (
    <div className="container">
      <Header theme={theme} spinning={spinning} onToggleTheme={toggleTheme} />
      <hr />
      <MainNav activePage={activePage} onNavigate={setActivePage} />
      <hr />
      <Content
        activePage={activePage}
        onReachOutClick={handleReachOutClick}
        onNavigate={setActivePage}
      />
      <hr />
      <SocialNav emailShaking={emailShaking} />
      <hr />
    </div>
  )
}

export default App
