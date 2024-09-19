'use client'
import { GoogleSignInButton, CredentialsSignIn } from "@/components"
import Link from "next/link"

const Login = () => {

  return (
    <div 
      className={`grid place-items-center justify-center bg-neutral-900 overflow-hidden fixed top-0 left-0 right-0 bottom-0 `} 
      // className={`grid place-items-center justify-center bg-white overflow-hidden fixed top-0 left-0 right-0 bottom-0`} 
    >
      <div className="flex flex-col gap-6 min-w-[15rem] max-w-[24rem] w-[80vw]">
        <h1 className="font-bold text-white text-2xl w-full">PotatoChat</h1>
        <CredentialsSignIn />
        {/* <div className="flex flex-row items-center gap-4">
          <div className="border-b border-gray-600 w-full"></div>
          <p className="text-gray-400 text-center">or</p>
          <div className="border-b border-gray-600 w-full"></div>
        </div>
        <GoogleSignInButton /> */}
        <div className="text-white flex flex-row justify-center gap-2">
          <span>New to PotatoChat?</span>
          <Link href={'/signup'} className="text-sky-500">Join now</Link>
        </div>
      </div>
    </div>
  )
}

export default Login