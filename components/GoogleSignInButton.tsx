import googleLogo from "@/public/icons/google.png";
import { signIn } from "next-auth/react";
import Image from "next/image";

const GoogleSignInButton = () => {

  const handleClick = () => {
    signIn("google", { callbackUrl: '/home' });
  };

  return (
    <div className="">
      <button
        onClick={handleClick}
        className="bg-white p-3 min-w-[15rem] max-w-[24rem] w-[80vw] rounded-md flex flex-row items-center justify-center gap-3 active:bg-gray-100 font-semibold border border-gray-300 relative"
        // className="bg-white p-3 min-w-[15rem] max-w-[24rem] w-[80vw] rounded-lg flex flex-row items-center justify-center gap-3 active:bg-gray-100 font-semibold border border-gray-300"
      >
        <Image
          src={googleLogo}
          alt="Google Logo"
          width={20}
          height={20}
          className="absolute left-4"
        />
        Continue with Google
      </button>
    </div>
  );
};

export default GoogleSignInButton;
