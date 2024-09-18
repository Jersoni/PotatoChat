"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const CredentialsSignIn = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    
    const formData = new FormData(event.currentTarget);

    const response = await signIn("credentials", {
        username: formData.get("username")?.toString(),
        password: formData.get("password")?.toString(),
        redirect: false, // Prevent redirect, handle manually
    });

    if (response?.error) {
      console.log(response.status)
      setError("Incorrect username or password. Please try again.");
    } else {
      router.push("/chats");
    }

    setLoading(false);
  }
  
  return (
    <div className="w-full">
      <form 
        onSubmit={onSubmit} 
        className="flex flex-col gap-3 w-full">
        <input
          required
          autoComplete="off"
          type="text"
          name="username"
          placeholder="username"
          className="w-full p-3 rounded-md font-semibold outline-none"
          />
        <input
          required
          autoComplete="off"
          type="password"
          name="password"
          placeholder="password"
          className="w-full p-3 rounded-md font-semibold outline-none"
          />
        <button 
          type={"submit"} 
          className="p-3 bg-[#598de0] text-gray-100 rounded-md font-bold mt-2"
          disabled={loading}  // Disable button when loading
          >
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
            ) : "Sign in"}
        </button>
      </form>
      {error && <div className="text-red-500 mt-2 w-full">{error}</div>}  {/* Display error */}
    </div>
  );
};

export default CredentialsSignIn;
