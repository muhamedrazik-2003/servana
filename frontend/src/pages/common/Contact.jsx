import React from 'react'
import Header from '../../components/common/Header'
import Footer from '../../components/common/Footer'
import { Button } from '../../components/ui/button'
import FAQ from '../../components/common/landing/FAQ'

function Contact() {
  return (
    <main>
      <Header />
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className='grid grid-cols-1 lg:grid-cols-2'>
          <div className='mb-10 lg:mb-0'>
            <h1 className="text-6xl text-start font-bold mb-6">Reach Out.<br /> Get Answers.</h1>
            <p className="text-gray-600 mb-16 text-lg">
              Contact our team directly for questions, support, feedback, or partnership inquiries.
            </p>
            <div className='space-y-5'>
              <a href="#customer-faq" className='block'>
                <Button variant={'seeker'} size={'lg'} className={'w-[70%]'}>Customer FAQs</Button>
              </a>
              <a href="#provider-faq" className='block'>
                <Button variant={'provider'} size={'lg'} className={'w-[70%]'}>Provider FAQs</Button>
              </a>
            </div>
          </div>

          <div className=" space-y-4 mb-12">
            <div className="border p-6 rounded-lg hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">Support</h3>
              <p className="text-gray-600 mb-4">Need help with a booking or issue?</p>
              <p className="mb-2"><strong>Email:</strong><a href="mailto:support@servana.in"> support@servana.in</a></p>
              <p className="mb-4 text-gray-400 cursor-not-allowed"><strong>Chat:</strong> Live chat (9am–6pm IST) <span className='text-xs text-accent'>- Coming Soon</span></p>
              <p className="text-xs text-gray-500">We respond within one business day.</p>
            </div>

            <div className="border p-6 rounded-lg hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">Sales & Partnerships</h3>
              <p className="text-gray-600 mb-4">Want to grow your business with Servana?</p>
              <p className="mb-2"><strong>Email:</strong><a href="mailto:sales&partnership@servana.in"> sales&partnership@servana.in</a></p>
              <p className="mb-2"><strong>Phone:</strong><a href="tel:+91 98765 43210"> +91 98765 43210</a></p>
              <p className="mb-4">
                <p className="text-xs text-gray-500">We respond within one business day.</p>
              </p>
            </div>
          </div>
        </div>

        <div className='flex flex-col lg:flex-row gap-6 pb-[40px]'>
          <div>
            <h3 className='text-lg font-semibold mb-6 '>Customer Support & Feedback</h3>
            <form className="space-y-5 mb-12">
              <input type="text" placeholder="Name" className="w-full p-3 border rounded-2xl" required />
              <input type="email" placeholder="Email" className="w-full p-3 border rounded-2xl" required />
              <select className="w-full p-3 border rounded-2xl">
                <option value="support">Help and Support</option>
                <option value="platformReview">Review Servana</option>
              </select>
              <textarea rows="4" placeholder="Message" className="w-full p-3 border rounded-2xl" required />
              <Button size={'lg'} className={'text-base'}>Send Message</Button>
              <p className="text-xs text-gray-500">We typically reply within 24 hours.</p>
            </form>
          </div>
        
          <div>
            <h3 className='text-lg font-semibold mb-6 '>Provider Support & Feedback</h3>
            <form className="space-y-5 mb-12">
              <input type="text" placeholder="Name" className="w-full p-3 border rounded-2xl" required />
              <input type="email" placeholder="Email" className="w-full p-3 border rounded-2xl" required />
              <select className="w-full p-3 border rounded-2xl">
                <option value="support">Help and Support</option>
                <option value="platformReview">Review Servana</option>
              </select>
              <textarea rows="4" placeholder="Message" className="w-full p-3 border rounded-2xl" required />
              <Button size={'lg'} className={'text-base'}>Send Message</Button>
              <p className="text-xs text-gray-500">We typically reply within 24 hours.</p>
            </form>
          </div>
        </div>

        <FAQ customerFaq={true} />
        <FAQ providerFaq={true} />
      </section>
      <Footer />
    </main>
  )
}

export default Contact