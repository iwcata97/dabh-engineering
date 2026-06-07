import { SpeedInsights } from '@vercel/speed-insights/react'
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

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Process />
        <Values />
        <Sectors />
        <CTA />
        <Contact />
      </main>
      <Footer />
      <CookieConsent />
      <SpeedInsights />
    </>
  )
}

export default App
