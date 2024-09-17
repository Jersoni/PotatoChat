"use client";
import googleLogo from "@/public/icons/google.png";
// import { ring2 } from "ldrs";
import "ldrs/ring";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

const GoogleSignInButton = () => {
  // loading ui
  // ring2.register();
  const [loading, setLoading] = useState(false);

  // sign in click handler
  const handleClick = () => {
    setLoading(true);
    signIn("google", {
      callbackUrl:
        "/chats"
        // "/",
    });
  };

  return (
    <div className="">
      <button
        onClick={handleClick}
        className="bg-white p-3 w-full rounded-md flex flex-row items-center justify-center gap-3 active:bg-gray-100 font-semibold border border-gray-300 relative"
        // className="bg-white p-3 min-w-[15rem] max-w-[24rem] w-[80vw] rounded-lg flex flex-row items-center justify-center gap-3 active:bg-gray-100 font-semibold border border-gray-300"
      >
        {loading ? (
          <div className="absolute left-4 h0-full grid place-items-center">
            <div
              className="inline-block h-6 w-6 animate-spin rounded-full border-[3px] border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status">
              <span
                className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
              >Loading...</span>
            </div>
          </div>
        ) : (
          <Image
            src={googleLogo}
            alt="Google Logo"
            width={20}
            height={20}
            className="absolute left-4"
          />
        )}
        Continue with Google
      </button>
    </div>
  );
};

export default GoogleSignInButton;