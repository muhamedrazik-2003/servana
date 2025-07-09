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
          <div>
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
              <p className="mb-2"><strong>Email:</strong> support@servana.in</p>
              <p className="mb-4 text-gray-400 cursor-not-allowed"><strong>Chat:</strong> Live chat (9am–6pm IST) <span className='text-xs text-accent'>- Coming Soon</span></p>
              <p className="text-xs text-gray-500">We respond within one business day.</p>
            </div>
            <div className="border p-6 rounded-lg hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">Sales & Partnerships</h3>
              <p className="text-gray-600 mb-4">Want to grow your business with Servana?</p>
              <p className="mb-2"><strong>Email:</strong> sales&partnership@servana.in</p>
              <p className="mb-2"><strong>Phone:</strong> +91 98765 43210</p>
              <p className="mb-4">
                <a href="#request-demo" className="text-indigo-600 hover:underline">Request a demo</a>
              </p>
            </div>
          </div>
        </div>

        <div className='flex gap-6 pb-[40px]'>
          <div>
            <h3 className='text-lg font-semibold mb-6 '>Customer Support & Feedback</h3>
            <form className="space-y-5 mb-12">
              <input type="text" placeholder="Name" className="w-full p-3 border rounded-2xl" required />
              <input type="email" placeholder="Email" className="w-full p-3 border rounded-2xl" required />
              <select className="w-full p-3 border rounded-2xl">
                <option value="support">Support</option>
                {/* <option value="sales">Sales / Partnerships</option> */}
                <option value="feedback">Feedback</option>
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
                <option value="support">Support</option>
                {/* <option value="sales">Sales / Partnerships</option> */}
                <option value="feedback">Feedback</option>
              </select>
              <textarea rows="4" placeholder="Message" className="w-full p-3 border rounded-2xl" required />
              <Button size={'lg'} className={'text-base'}>Send Message</Button>
              <p className="text-xs text-gray-500">We typically reply within 24 hours.</p>
            </form>
          </div>
        </div>

        {/* faqs section */}
        <FAQ customerFaq={true} />
        <FAQ providerFaq={true} />

        {/* <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">FAQs</h2>
          {[
            'How do I become a provider?',
            'What if I don’t get matched?',
            'How do I cancel a booking?',
            'How can I give feedback?'
          ].map(q => (
            <details key={q} className="mb-3 bg-gray-50 rounded-lg p-4">
              <summary className="cursor-pointer font-medium">{q}</summary>
              <p className="mt-2 text-gray-600">Sample answer for {q.toLowerCase()}…</p>
            </details>
          ))}
        </div> */}
      </section>
      <Footer />
    </main>
  )
}

export default Contact