import React from 'react'
import Sidebar from "../../components/provider/ProviderSidebar"
import ProviderHeader from '../../components/provider/ProviderHeader'

function ProviderDashboard() {
  return (
    <>
      <ProviderHeader />
      <main className="flex p-4 pt-0">
        {/* Sidebar */}
        <div className="">
          <Sidebar />
        </div>

        {/* Main Content */}
        <section className="flex-1 pl-6">
          <div className="h-[200vh]">
            <h1>Main Content</h1>
          </div>
        </section>
      </main>
    </>
  );
}


export default ProviderDashboard