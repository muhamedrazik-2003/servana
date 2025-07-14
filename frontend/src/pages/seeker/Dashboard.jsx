import React from 'react'
import SeekerHeader from '../../components/seeker/SeekerHeader'
import Footer from '../../components/common/Footer'
import SeekerHero from '../../components/seeker/SeekerHero'
import BookingList from '../../components/seeker/BookingList'
import ServiceCategory from '../../components/common/landing/ServiceCategory'
import RecommendedSection from '../../components/seeker/RecommendedSection'

function Dashboard() {
  return (
    <main>
      <SeekerHeader />
      <SeekerHero />
      <BookingList />
      <ServiceCategory format={'seeker'} />
      <RecommendedSection/>
      <Footer />
    </main>
  )
}

export default Dashboard