import { GalleryVerticalEnd } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom"

function AuthForm({ formType, registerAs, setRegisterAs }) {
    return (
        <div className="flex flex-col items-center gap-6">
            {
                (formType === "register" && registerAs === null)
                    ? <div className=' w-65 lg:w-full flex flex-col items-center justify-center gap-3'>
                        <Button
                            onClick={() => setRegisterAs("seeker")}
                            variant={'outline'} size={'lg'}
                            className={'w-full h-20 border-2 border-secondary shadow-lg hover:bg-teal-200'}>
                             I Need a Service
                        </Button>
                        <p className='font-semibold text-xl'>or</p>
                        <Button
                            onClick={() => setRegisterAs("provider")}
                            variant={'outline'} size={'lg'}
                            className={'w-full h-20 border-2 border-accent hover:bg-amber-200 shadow-lg'}>
                             I Provide Services
                        </Button>
                    </div>
                    : <form className=" w-65 lg:w-full">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-6">
                                <div className="space-y-4">
                                    {formType === "register"
                                        && <div className="grid gap-3">
                                            <Label htmlFor="name">Full Name</Label>
                                            <Input
                                                id="name"
                                                type="name"
                                                placeholder="Jhon Doe"
                                                required
                                            />
                                        </div>
                                    }
                                    <div className="grid gap-3">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="m@example.com"
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="password">Password</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="Example@123"
                                            required
                                        />
                                    </div>
                                </div>
                                {
                                    formType === "register"
                                        ? <Button onClick={() => { formType = "login" }} type="submit" className={`w-full ${registerAs === "provider" ? "bg-accent hover:bg-amber-600" : "bg-secondary hover:bg-teal-600"}`}>
                                            Register
                                        </Button>
                                        : <Link to={'/seeker/home'}>
                                            <Button type="submit" className="w-full">Login</Button>
                                        </Link>
                                }
                            </div>
                            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                                <span className="bg-background text-muted-foreground relative z-10 px-2">
                                    Or
                                </span>
                            </div>
                            <div className="grid grid-cols-1">
                                <Button variant="outline" type="button" disabled className="w-full border cursor-not-allowed">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path
                                            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                    Continue with Google
                                </Button>
                            </div>
                            {
                                formType === "login"
                                    ? <div className="text-center text-sm">
                                        <a href="#" className="underline underline-offset-4 text-primary cursor-not-allowed">
                                            Forgot Password ?
                                        </a>
                                    </div>
                                    : <div className="text-center text-sm">
                                        <p
                                            onClick={() => setRegisterAs(null)}
                                            className="underline underline-offset-4 text-primary cursor-pointer">
                                            ← Back to Role Selection
                                        </p>
                                    </div>
                            }

                        </div>
                    </form>
            }


        </div>
    )
}

export default AuthForm

