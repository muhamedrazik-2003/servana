import React from 'react'
import SeekerHeader from '../../components/seeker/SeekerHeader'
import Footer from '../../components/common/Footer'
import SeekerHero from '../../components/seeker/SeekerHero'
import BookingList from '../../components/seeker/BookingList'
import ServiceCategory from '../../components/common/landing/ServiceCategory'
import RecommendedSection from '../../components/seeker/RecommendedSection'
import TopProviderSection from '../../components/seeker/TopProviderSection'
import {
  ShieldCheck,
  Star,
  Lock,
  Headset
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import NewServices from '../../components/seeker/NewServices'

function Dashboard() {
  const trustPoints = [
    {
      title: "Verified Professionals",
      icon: <ShieldCheck className="w-6 h-6 text-accent" />,
      description: "All service providers are background-checked and approved."
    },
    {
      title: "Rated by Real Users",
      icon: <Star className="w-6 h-6 text-secondary" />,
      description: "Only verified customers can leave reviews and feedback."
    },
    {
      title: "Secure Bookings",
      icon: <Lock className="w-6 h-6 text-yellow-500" />,
      description: "Your personal data and payments are protected end-to-end."
    },
    {
      title: "Support Guarantee",
      icon: <Headset className="w-6 h-6 text-primary" />,
      description: "Our team is ready 24/7 to resolve any issue you face."
    }
  ]
  return (
    <main>
      <SeekerHeader />
      <SeekerHero />
      <BookingList />
      <ServiceCategory format={'seeker'} />
      <RecommendedSection />
      <NewServices/>
      <TopProviderSection />
      {/* trust section */}
      <section className="mt-12 space-y-6 px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-6">
          <h2>
            Your Trust, Our Priority
          </h2>
          <p>
            We verify every provider and protect your bookings with secure processes.
          </p>
        </div>

        {/* Trust Points */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {trustPoints.map((item, index) => (
            <Card key={index} className="p-4 flex items-start gap-4">
              <div className="flex-shrink-0">
                {item.icon}
              </div>
              <CardContent className="p-0">
                <h3 className="text-sm font-medium text-gray-800">{item.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  )
}

export default Dashboard