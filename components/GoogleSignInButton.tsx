"use client";
import googleLogo from "@/public/icons/google.png";
import { ring2 } from "ldrs";
import "ldrs/ring";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

const GoogleSignInButton = () => {
  // loading ui
  ring2.register();
  const [loading, setLoading] = useState(false);

  // sign in click handler
  const handleClick = () => {
    setLoading(true);
    signIn("google", {
      callbackUrl:
        // "/chats"
        "/",
    });
  };

  return (
    <div className="">
      <button
        onClick={handleClick}
        className="bg-white p-3 min-w-[15rem] max-w-[24rem] w-[80vw] rounded-md flex flex-row items-center justify-center gap-3 active:bg-gray-100 font-semibold border border-gray-300 relative"
        // className="bg-white p-3 min-w-[15rem] max-w-[24rem] w-[80vw] rounded-lg flex flex-row items-center justify-center gap-3 active:bg-gray-100 font-semibold border border-gray-300"
      >
        {loading ? (
          <div className="absolute left-4 h0-full grid place-items-center">
            <l-ring-2
              size="22"
              stroke="2.5"
              stroke-length="0.25"
              bg-opacity="0.0"
              speed="0.8"
              color="black"
            ></l-ring-2>
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
