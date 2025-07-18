import React from 'react'
import Header from "../../components/common/Header"
import Footer from "../../components/common/Footer"

function NotFound() {
  return (
    <main>
        <Header/>
        <section className='flex flex-col items-center justify-center min-h-[90vh] p-0'>
            <h1 className='text-8xl m-0'>404</h1>
            <h2 className='text-4xl'>Not Found</h2>
        </section>
        <Footer/>
    </main>
  )
}

export default NotFound