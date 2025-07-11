import React from 'react'
import SeekerHeader from '../../components/seeker/SeekerHeader'
import Footer from '../../components/common/Footer'
import SeekerHero from '../../components/seeker/SeekerHero'
import BookingList from '../../components/seeker/BookingList'

function Dashboard() {
  return (
    <main>
      <SeekerHeader/>
      <SeekerHero/>
      <BookingList/>
      <Footer/>
    </main>
  )
}

export default Dashboard