'use client'
import { GoogleSignInButton, CredentialsSignIn } from "@/components"

const Login = () => {

  return (
    <div 
      className={`grid place-items-center justify-center bg-neutral-900 overflow-hidden fixed top-0 left-0 right-0 bottom-0`} 
      // className={`grid place-items-center justify-center bg-white overflow-hidden fixed top-0 left-0 right-0 bottom-0`} 
    >
      <div className="flex flex-col gap-6">
        <h1 className="font-bold text-white text-center text-2xl">Sign In</h1>     
        <CredentialsSignIn />
        <div className="flex flex-row items-center gap-4">
          <div className="border-b border-gray-600 w-full"></div>
          <p className="text-gray-400 text-center">or</p>
          <div className="border-b border-gray-600 w-full"></div>
        </div>
        <GoogleSignInButton />
      </div>
    </div>
  )
}

export default Login