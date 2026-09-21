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
import { ProductsTeaser } from './components/ProductsTeaser'
import { ProductsCatalogModal } from './components/ProductsCatalogModal'

function App() {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [isCatalogOpen, setIsCatalogOpen] = useState(false)

  return (
    <>
      <Header
        onOpenGallery={() => setIsGalleryOpen(true)}
        onOpenCatalog={() => setIsCatalogOpen(true)}
      />
      <main>
        <Hero />
        <Services />
        <Process />
        <ProjectsTeaser onOpenGallery={() => setIsGalleryOpen(true)} />
        <ProductsTeaser onOpenCatalog={() => setIsCatalogOpen(true)} />
        <Values />
        <Sectors />
        <CTA />
        <Contact />
      </main>
      <Footer
        onOpenGallery={() => setIsGalleryOpen(true)}
        onOpenCatalog={() => setIsCatalogOpen(true)}
      />
      <CookieConsent />
      <ProjectsGalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
      />
      <ProductsCatalogModal
        isOpen={isCatalogOpen}
        onClose={() => setIsCatalogOpen(false)}
      />
    </>
  )
}

export default App
