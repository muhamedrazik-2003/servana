import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Star, StarOff } from 'lucide-react';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllFeedbacks } from "../../../redux/slices/feedbackSlice";


function Testimonial() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllFeedbacks());
  },[])
  const {feedbacks} = useSelector(state => state.feedbackSlice);
  const testimonials = [
    // Customers
    {
      name: "Aswathi Nair",
      role: "customer",
      rating: 5,
      comment: "Booked an electrician from Servana and the work was done the same day. Very reliable!",
      location: "Nadakkavu",
      jobType: "Electrical Repair",
      date: "2025-03-18"
    },
    {
      name: "Haris Muhammed",
      role: "customer",
      rating: 4,
      comment: "Found a great tutor for my daughter. The whole process was super smooth.",
      location: "Thondayad",
      jobType: "Home Tutoring",
      date: "2025-04-02"
    },
    {
      name: "Nimisha Das",
      role: "customer",
      rating: 5,
      comment: "I scheduled a beauty service at home—very professional and clean!",
      location: "Malaparamba",
      jobType: "Beauty & Wellness",
      date: "2025-04-14"
    },
    {
      name: "Fayiz Rahman",
      role: "customer",
      rating: 4,
      comment: "The delivery assistant helped my elderly parents with groceries. Thanks Servana!",
      location: "Beypore",
      jobType: "Errand Services",
      date: "2025-04-27"
    },
    {
      name: "Sreeja Menon",
      role: "customer",
      rating: 5,
      comment: "My leaking tap was fixed within 2 hours of booking. Excellent service!",
      location: "Chevayur",
      jobType: "Plumbing",
      date: "2025-05-04"
    },

    // Providers
    {
      name: "Rahul Vellari",
      role: "provider",
      rating: 5,
      comment: "With Servana, I get steady jobs from nearby areas. No downtime at all!",
      location: "Pantheerankavu",
      jobType: "AC Technician",
      date: "2025-03-30"
    },
    {
      name: "Jaseela Thottathil",
      role: "provider",
      rating: 4,
      comment: "Weekly payouts and a clear dashboard make it easy to manage clients.",
      location: "Kallayi",
      jobType: "Beautician",
      date: "2025-04-10"
    },
    {
      name: "Abdul Hakkim",
      role: "provider",
      rating: 5,
      comment: "I work full time now as a delivery partner thanks to Servana’s regular leads.",
      location: "Kunnamangalam",
      jobType: "Delivery",
      date: "2025-04-19"
    },
    {
      name: "Merlin Joseph",
      role: "provider",
      rating: 5,
      comment: "I teach part-time and this app gave me instant students from my area.",
      location: "Medical College",
      jobType: "Tutor",
      date: "2025-04-23"
    },
    {
      name: "Firoz K.",
      role: "provider",
      rating: 4,
      comment: "Flexible scheduling lets me work even after my day job. Really helpful app.",
      location: "Vellimadukunnu",
      jobType: "Home Repairs",
      date: "2025-05-01"
    }
  ];
  function handleRating(rating) {
    const fullStars = rating;
    const emptyStars = 5 - fullStars;

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star className="text-yellow-400 size-4" fill="currentColor" />);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<StarOff className="text-gray-300 size-4" />);
    }

    return <div className="flex gap-0.5">{stars}</div>;
  }


  return (
    <section className='mx-0 pl-[32px] lg:pl-[100px]'>
      <h2 className='max-w-[600px]'>Made for Local Service. Built for Trust.</h2>
      <p className='mb-[72px]'>We remove the friction so customers and providers can focus on what truly matters—results and relationships.</p>
      <h5 className="py-1.5 px-4 rounded-4xl mb-4 bg-secondary inline-block text-sm">Customer's Comment</h5>
      <div className='scroll-smooth overflow-x-auto scrollbar-none lg:ml-[-100px]  scrolllbar-hidden'>
        <div className='flex gap-5'>
          {
            testimonials.map((testimonial, index) => {
              // const Icon = Icons[feature.titleIcon]
              if (testimonial.role === "customer") {
                return (
                  <Card key={index} className='w-[300px] shrink-0 p-4 rounded-2xl'>
                    <div className='flex gap-0.5 mb-2 text-yellow-500'>
                      {handleRating(testimonial.rating)}
                    </div>
                    <p className='text-sm text-foreground mb-3 leading-relaxed'>
                      “{testimonial.comment}”
                    </p>
                    <div className='font-semibold text-primary'>{testimonial.name}</div>
                    <div className='text-sm text-muted-foreground'>
                      📍 {testimonial.location} • {testimonial.jobType}
                    </div>
                  </Card>

                )
              }
            })
          }
        </div>
      </div>
      <div className="text-right pr-[32px] lg:pr-[120px]">
        <h5 className="py-1.5 px-4 rounded-4xl my-4 bg-accent inline-block text-sm">Provider's Comment</h5>
      </div>
      <div className='scroll-smooth overflow-x-auto scrollbar-none lg:ml-[-100px] scrolllbar-hidden'>
        <div className='flex gap-5'>
          {
            testimonials.map((testimonial, index) => {
              // const Icon = Icons[feature.titleIcon]
              if (testimonial.role === "provider") {
                return (
                  <Card key={index} className='w-[300px] shrink-0 p-4 rounded-2xl'>
                    <div className='flex gap-0.5 mb-2 text-yellow-500'>
                      {handleRating(testimonial.rating)}
                    </div>
                    <p className='text-sm text-foreground mb-3 leading-relaxed'>
                      “{testimonial.comment}”
                    </p>
                    <div className='font-semibold text-primary'>{testimonial.name}</div>
                    <div className='text-sm text-muted-foreground'>
                      📍 {testimonial.location} • {testimonial.jobType}
                    </div>
                  </Card>

                )
              }
            })
          }
        </div>
      </div>
    </section>
  )
}

export default Testimonial