'use client'

import { useLenis } from '@/hooks/useLenis'
import Navbar from '@/components/Navbar'
import HeroScroll from '@/components/HeroScroll'
import HeroCta from '@/components/HeroCta'
import IntroSection from '@/components/IntroSection'
import FleetSection from '@/components/FleetSection'
import ExperienceSection from '@/components/ExperienceSection'
import DestinationsSection from '@/components/DestinationsSection'
import AmenitiesSection from '@/components/AmenitiesSection'
import QuoteSection from '@/components/QuoteSection'
import BookingSection from '@/components/BookingSection'
import Footer from '@/components/Footer'

export default function Home() {
  useLenis()

  return (
    <main>
      <Navbar />
      <HeroScroll />
      <HeroCta />
      <IntroSection />
      <FleetSection />
      <ExperienceSection />
      <DestinationsSection />
      <AmenitiesSection />
      <QuoteSection />
      <BookingSection />
      <Footer />
    </main>
  )
}
