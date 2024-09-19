'use client'
import supabase from "@/lib/supabaseClient"
import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { signIn } from "next-auth/react"

const SignUp = () => {

  const router = useRouter()
  const [error, setError] = useState<string | null | undefined>()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {

    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    const username = formData.get('username')?.toString()
    const password = formData.get('password')?.toString()
    const confirmPassword = formData.get('confirmPassword')?.toString()

    // check if username starts with number
    if(!isNaN(Number(username?.slice(0,1)))) {
      setError('Username cannot start with a number')
      setLoading(false)
      return
    }

    // check if all is lower case
    if (username !== username?.toLocaleLowerCase()) {
      setError('Username must contain only lowercase letters.')
      setLoading(false)
      return
    }

    // check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      setLoading(false)
      return
    }

    // check if password is short
    if (password && password?.length < 8) {
      setError('Password must be at least 8 characters long.')
      setLoading(false)
      return
    }

    const { data, error } = await supabase
      .from('users')
      .insert({
        username: username,
        password: password
      })

    if (error) {
      if (error.code === '23505') {
        setError('Username already exists.')
      } else {
        setError(error.message)
      }
      setLoading(false)
      return
    }
    

    const response = await signIn("credentials", {
      username: username,
      password: password,
      redirect: false,
    });
    
    if (response?.ok) {
      router.push('/chats')
    } else {
      setError(response?.error)
      setLoading(false)
    }
  }

  return (
    <div className='p-6 grid place-items-center h-[100vh] bg-neutral-900'>
      <div className='h-fit w-full flex flex-col gap-6'>
        <h1 className='text-xl font-bold text-white'>Create a PotatoChat account</h1>
        {error && <div className="credentials-error">{error}</div>}
        <form 
          onSubmit={handleSubmit}
          className="credentials-form">
          <input 
            name="username" 
            type="text" 
            required
            autoComplete="off"
            placeholder="Username"
          />
          <input 
            name="password" 
            type="password" 
            required
            autoComplete="off"
            placeholder="Password"
          />
          <input 
            name="confirmPassword" 
            type="password" 
            required
            autoComplete="off"
            placeholder="Confirm password"
          />
          <button type="submit" className="form-button">
            {loading ? (
              <div className="left-4 h-full grid place-items-center">
                <div
                  className="inline-block h-6 w-6 animate-spin rounded-full border-[3px] border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status">
                  <span
                    className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                    >Loading...</span>
                </div>
              </div>
            ) : "Create Account"}
          </button>
        </form>
        <div className="flex flex-row gap-2 justify-center">
          <span className="text-white">Have an account?</span>
          <Link href={'/'} className="text-sky-500 text-center">Log in</Link>
        </div>
      </div>

    </div>
  )
}

export default SignUp