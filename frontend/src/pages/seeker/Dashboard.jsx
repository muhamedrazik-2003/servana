import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Footer from "../../components/common/Footer"
import { Card, CardContent } from "@/components/ui/card"


function Dashboard() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 150)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const categories = [
    { name: "Plumber", description: "Fix leaks & fittings", image: "https://plus.unsplash.com/premium_photo-1663045495725-89f23b57cfc5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGx1bWJlcnxlbnwwfDB8MHx8fDA%3D" },
    { name: "Electrician", description: "Wiring, switches & more", image: "https://media.istockphoto.com/id/2135856689/photo/electrician-working-in-switchboard-with-electrical-connection-cable-copy-space.webp?a=1&b=1&s=612x612&w=0&k=20&c=2EsGB4bv8YSjIxOvfPJwYvYxlnou2pJCArVKYkvxDMA=" },
    { name: "Cleaner", description: "Home & office cleaning", image: "https://images.unsplash.com/photo-1603712725038-e9334ae8f39f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2xlYW5lcnxlbnwwfDB8MHx8fDA%3D" },
    { name: "Home Care", description: "Appliance & furniture help", image: "https://images.unsplash.com/photo-1642505172378-a6f5e5b15580?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2xlYW5lcnxlbnwwfDB8MHx8fDA%3D" },
  ]
  return (
    <main>
      <header className={`fixed top-0 left-0 right-0 z-5 transition-all duration-300 bg-background ${scrolled ? "py-2 shadow" : "py-4"}`}>
        <div className="flex items-center justify-between px-4 md:px-10">
          <img src="/logo.png" className="h-8" />
          {
            scrolled &&
            <input
              type="text"
              placeholder="Search services..."
              className="ml-4 px-3 py-1 w-64 lg:w-100 border rounded-xl"
            />
          }
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <section className="mt-25 pb-10 text-center">
        <h1 className="text-3xl font-bold">Find trusted services near you</h1>
        <input
          type="text"
          placeholder="Search for a service..."
          className="mt-4 w-full max-w-md px-4 py-2 border rounded-xl shadow-md"
        />
      </section>
      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Top Service Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map((cat, idx) => (
            <Card className="group cursor-pointer overflow-hidden rounded-2xl transition-all hover:shadow-xl hover:scale-[1.02] bg-white py-0">
              <div className="relative h-[130px] w-full overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="object-cover h-full w-full transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CardContent className="flex flex-col items-center justify-center px-4 py-2 text-center">
                <h4 className="font-semibold text-base">{cat.name}</h4>
                <p className="text-muted-foreground text-xs mt-1">{cat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <Footer userRole={'seeker'} />
    </main>
  )
}

export default Dashboard