import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Footer from "../../components/common/Footer"

function Dashboard() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 150)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
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

      <section className="mt-25 mb-6 text-center min-h-[200vh]">
        <h1 className="text-3xl font-bold">Find trusted services near you</h1>
        <input
          type="text"
          placeholder="Search for a service..."
          className="mt-4 w-full max-w-md px-4 py-2 border rounded-xl shadow-md"
        />
      </section>
      <Footer userRole={'seeker'}/>
    </main>
  )
}

export default Dashboard