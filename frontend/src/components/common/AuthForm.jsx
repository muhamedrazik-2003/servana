import { GalleryVerticalEnd } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react"
import { loginUser, registerUser } from "../../redux/slices/authSlice"
import { toast } from "sonner"


function AuthForm({ formType, registerAs, setRegisterAs }) {
    const [userData, setUserData] = useState({
        fullName: "", email: "", password: "", role: registerAs
    })
    console.log(registerAs);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, isLoading } = useSelector(state => state.authSlice);

    useEffect(() => {
        if (userData.role === null && registerAs !== null) {
            setUserData(prev => ({ ...prev, role: registerAs }))
        }
    }, [registerAs, userData.role])

    const handleRegister = async (e) => {
        console.log(userData)
        e.preventDefault();
        try {
            const response = await dispatch(registerUser(userData))
            console.log(response)
            if (registerUser.fulfilled.match(response)) {
                const { user } = response.payload;
                toast.success("🥳 You're all set! Start exploring")
                switch (user.role) {
                    case 'seeker':
                        navigate('/seeker/home');
                        break;
                    case 'provider':
                        navigate('/provider/dashboard');
                }
            }
            setUserData({
                fullName: "", email: "", password: "", role: ""
            })
        } catch (error) {
            console.error(error.message)
        }
    };

    const handleLogin = async (e) => {
        console.log(error)
        e.preventDefault();
        console.log(userData);
        try {
            const response = await dispatch(loginUser(userData))
            console.log(response)
            if (loginUser.fulfilled.match(response)) {
                const { user } = response.payload
                toast.success("Login Successfull")

                switch (user.role) {
                    case 'admin':
                        navigate('/admin/dashboard');
                        break;
                    case 'seeker':
                        navigate('/seeker/home');
                        break;
                    case 'provider':
                        navigate('/provider/dashboard');
                }
            }
            setUserData({
                fullName: "", email: "", password: "", role: ""
            })
        } catch (error) {
            toast.warning(error)
            console.error(error)
        }
    }

    return (
        <div className="flex flex-col items-center gap-6">
            {
                (formType === "register" && registerAs === null)
                    ? <div className=' w-65 lg:w-full flex flex-col items-center justify-center gap-3'>
                        <Button
                            onClick={() => {
                                setRegisterAs("seeker")
                                setUserData({ ...userData, role: 'seeker' })
                            }}
                            variant={'outline'} size={'lg'}
                            className={'w-full h-20 border-2 border-secondary shadow-lg hover:bg-teal-200'}>
                            I Need a Service
                        </Button>
                        <p className='font-semibold text-xl'>or</p>
                        <Button
                            onClick={() => {
                                setRegisterAs("provider")
                                setUserData({ ...userData, role: 'provider' })
                            }}
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
                                                onChange={(e) => {setUserData({ ...userData, fullName: e.target.value })}}
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
                                            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                        />
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="password">Password</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="Example@123"
                                            required
                                            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                                        />
                                    </div>
                                    {/* for error message */}
                                    {
                                        error && <p className="text-center text-xs font-semibold text-red-500">{error}</p>
                                    }
                                </div>
                                {
                                    formType === "register"
                                        ? <Button disabled={isLoading} onClick={(e) => handleRegister(e)} type="submit" className={`w-full ${registerAs === "provider" ? "bg-accent hover:bg-amber-600" : "bg-secondary hover:bg-teal-600"}`}>
                                            {isLoading ? ' Registering...' : " Register"}
                                        </Button>
                                        : <Button disabled={isLoading} onClick={(e) => handleLogin(e)} type="submit" className="w-full">{isLoading ? ' logging in...' : " Login"}</Button>
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

