import React from 'react'
import Sidebar from "../../components/provider/Sidebar"
import ProviderHeader from '../../components/provider/ProviderHeader'

function ProviderDashboard() {
  return (
    <>
    <ProviderHeader/>
      <main>
        <Sidebar />
        <section>
          <h1>main COntent</h1>
        </section>
      </main>
    </>

  )
}

export default ProviderDashboard