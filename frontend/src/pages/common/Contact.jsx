import React, { useState } from 'react'
import Header from '../../components/common/Header'
import Footer from '../../components/common/Footer'
import { Button } from '../../components/ui/button'
import FAQ from '../../components/common/landing/FAQ'
import { useDispatch, useSelector } from 'react-redux'
import { Loader2, Star } from 'lucide-react'
import { addNewFeedback } from '../../redux/slices/feedbackSlice'
import { toast } from 'sonner'

function Contact() {
  const dispatch = useDispatch();
  const [seekerRating, setSeekerRating] = useState(0)
  const [hoverSeekerRating, setHoverSeekerRating] = useState(0)
  const [providerRating, setProviderRating] = useState(0)
  const [hoverProviderRating, setHoverProviderRating] = useState(0)
  const [feedbackData, setFeedBackData] = useState({
    name: '',
    email: '',
    seekerMessageType: 'platformReview',
    providerMessageType: 'platformReview',
    message: ''
  })
  let isSeeker = false
  const {isfeedbackAdding} = useSelector(state => state.feedbackSlice);
  const handleSubmit = async (role) => {
    try {
      const { name, email, message, seekerMessageType, providerMessageType } = feedbackData
      let newFeedback = {}
      if (role === "seeker") {
        newFeedback = {
          name,
          email,
          message,
          messageType: seekerMessageType,
          role: role,
          rating: seekerRating
        }
        isSeeker = true
      } else {
        newFeedback = {
          name,
          email,
          message,
          messageType: providerMessageType,
          role: role,
          rating: providerRating
        }
        isSeeker = false
      }
      console.log("Final feedback to send:", newFeedback);

      if (newFeedback.messageType === "platformReview" && newFeedback.rating === 0) {
        return toast.warning("please Add Rating for Review submission")
      }
      const response = await dispatch(addNewFeedback(newFeedback))
      if (addNewFeedback.fulfilled.match(response)) {
        toast.success("Form Submitted Successfully!")
        setHoverProviderRating(0)
        setHoverSeekerRating(0)
        setSeekerRating(0)
        setProviderRating(0)
        setFeedBackData({
          name: '',
          email: '',
          role: '',
          seekerMessageType: 'platformReview',
          providerMessageType: 'platformReview',
          message: ''
        })
        const inputs = document.querySelectorAll('.clearable');
        inputs.forEach(input => input.value = '');
        return;
      } else if (addNewFeedback.rejected.match(response)) {
        return toast.error(response.payload?.message || "Something went wrong while submitting Your Form");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("An unexpected error occurred");
    }
    // console.log({ rating, comment })

  }


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
              <p className="text-xs text-gray-500">We respond within one business day.</p>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 pb-[40px]'>
          <div>
            <h3 className='text-lg font-semibold mb-6 '>Customer Support & Feedback</h3>
            <div className="space-y-5 mb-12">
              <input onChange={(e) => setFeedBackData({ ...feedbackData, name: e.target.value })} type="text" placeholder="Name" className="w-full p-3 border rounded-2xl clearable" required />
              <input onChange={(e) => setFeedBackData({ ...feedbackData, email: e.target.value })} type="email" placeholder="Email" className="w-full p-3 border rounded-2xl clearable" required />
              <select defaultValue={feedbackData.seekerMessageType} onChange={(e) => setFeedBackData({ ...feedbackData, seekerMessageType: e.target.value })} className="w-full p-3 border rounded-2xl">
                <option value="support">Help and Support</option>
                <option value="platformReview">Review Servana</option>
              </select>
              {feedbackData?.seekerMessageType === "platformReview"
                && <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className="p-1 rounded-sm hover:bg-gray-100 transition-colors"
                      onMouseEnter={() => setHoverSeekerRating(star)}
                      onMouseLeave={() => setHoverSeekerRating(0)}
                      onClick={() => setSeekerRating(star)}
                    >
                      <Star
                        className={`h-6 w-6 transition-colors ${hoverSeekerRating >= star || seekerRating >= star ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    </button>
                  ))}
                </div>
              }
              <textarea onChange={(e) => setFeedBackData({ ...feedbackData, message: e.target.value })} rows="4" placeholder="Message" className="w-full p-3 border rounded-2xl clearable" required />

              <Button onClick={() => {
                handleSubmit("seeker")
              }} size={'lg'} className={'text-base'}>{isfeedbackAdding && isSeeker ? <><Loader2 className='animate-spin size-5'/> Sending Message</> : "Send Message"}</Button>
              <p className="text-xs text-gray-500">We typically reply within 24 hours.</p>
            </div>
          </div>

          <div>
            <h3 className='text-lg font-semibold mb-6 '>Provider Support & Feedback</h3>
            <div className="space-y-5 mb-12">
              <input onChange={(e) => setFeedBackData({ ...feedbackData, name: e.target.value })} type="text" placeholder="Name" className="w-full p-3 border rounded-2xl clearable" required />
              <input onChange={(e) => setFeedBackData({ ...feedbackData, email: e.target.value })} type="email" placeholder="Email" className="w-full p-3 border rounded-2xl clearable" required />
              <select defaultValue={feedbackData.providerMessageType} onChange={(e) => setFeedBackData({ ...feedbackData, providerMessageType: e.target.value })} className="w-full p-3 border rounded-2xl">
                <option value="support">Help and Support</option>
                <option value="platformReview">Review Servana</option>
              </select>
              {feedbackData?.providerMessageType === "platformReview"
                && <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className="p-1 rounded-sm hover:bg-gray-100 transition-colors"
                      onMouseEnter={() => setHoverProviderRating(star)}
                      onMouseLeave={() => setHoverProviderRating(0)}
                      onClick={() => setProviderRating(star)}
                    >
                      <Star
                        className={`h-6 w-6 transition-colors ${hoverProviderRating >= star || providerRating >= star ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    </button>
                  ))}
                </div>
              }
              <textarea onChange={(e) => setFeedBackData({ ...feedbackData, message: e.target.value })} rows="4" placeholder="Message" className="w-full p-3 border rounded-2xl clearable" required />

              <Button
                onClick={() => {
                  handleSubmit("provider")
                }}
                size={'lg'} className={'text-base'}>{isfeedbackAdding && !isSeeker ? <><Loader2 className='animate-spin size-5'/> Sending Message</> : "Send Message"}</Button>
              <p className="text-xs text-gray-500">We typically reply within 24 hours.</p>
            </div>
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