import { useEffect, useState } from 'react'
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
  const [initialProductId, setInitialProductId] = useState<string | undefined>()

  // Read URL params on mount for deep linking
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('catalog') === 'true' || params.has('product')) {
      setIsCatalogOpen(true)
      if (params.has('product')) {
        setInitialProductId(params.get('product') || undefined)
      }
    }
  }, [])

  // Sync state to URL
  useEffect(() => {
    const url = new URL(window.location.href)
    
    // When catalog opens/closes, update URL without reloading
    if (isCatalogOpen) {
      url.searchParams.set('catalog', 'true')
    } else {
      url.searchParams.delete('catalog')
      url.searchParams.delete('product')
    }
    
    // Only replace state if it actually changed to avoid spamming history
    if (url.toString() !== window.location.href) {
      window.history.replaceState({}, '', url)
    }
  }, [isCatalogOpen])

  return (
    <>
      <Header
        onOpenGallery={() => setIsGalleryOpen(true)}
        onOpenCatalog={() => setIsCatalogOpen(true)}
      />
      <main>
        <Hero onOpenCatalog={() => setIsCatalogOpen(true)} />
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
        onClose={() => {
          setIsCatalogOpen(false)
          setInitialProductId(undefined) // reset for next open
        }}
        initialProductId={initialProductId}
      />
    </>
  )
}

export default App
