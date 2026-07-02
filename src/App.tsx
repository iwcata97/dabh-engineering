import { useState } from 'react'
import { Contact } from './components/Contact'
import { CTA } from './components/CTA'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Process } from './components/Process'
import { Sectors } from './components/Sectors'
import { Services } from './components/Services'
import { Values } from './components/Values'
import { CookieConsent } from './components/CookieConsent'
import { ProjectsGalleryModal } from './components/ProjectsGalleryModal'
import { ProjectsTeaser } from './components/ProjectsTeaser'

function App() {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)

  return (
    <>
      <Header onOpenGallery={() => setIsGalleryOpen(true)} />
      <main>
        <Hero />
        <Services />
        <Process />
        <ProjectsTeaser onOpenGallery={() => setIsGalleryOpen(true)} />
        <Values />
        <Sectors />
        <CTA />
        <Contact />
      </main>
      <Footer onOpenGallery={() => setIsGalleryOpen(true)} />
      <CookieConsent />
      <ProjectsGalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
      />
    </>
  )
}

export default App

