import React from 'react'
import SeekerHeader from '../../components/seeker/SeekerHeader'
import Footer from '../../components/common/Footer'
import SeekerHero from '../../components/seeker/SeekerHero'

function Dashboard() {
  return (
    <main>
      <SeekerHeader/>
      <SeekerHero/>
      <Footer/>
    </main>
  )
}

export default Dashboard