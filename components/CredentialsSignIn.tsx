"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const CredentialsSignIn = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    console.log(Object.fromEntries(formData))
    // try {
    //   const response = await doCredentialLogin(formData);

    //   if (!!response?.error) {
    //     console.error(response.error);
    //     setError(response.error);
    //   } else {
    //     router.push("/chats");
    //   }
    // } catch (e) {
    //   console.error(e);
    //   setError("Check your Credentials");
    // }

    try {
      const response = await signIn("credentials", {
          username: formData.get("username"),
          password: formData.get("password"),
          redirect: false,
      });
      if (!!response?.error) {
        console.error(response.error);
        setError(response.error);
      } else {
        router.push("/chats");
      }
    } catch (err) {
      console.error(err);
      setError("Check your Credentials");
    }
  }

  return (
    <div className="">
      <form 
        onSubmit={onSubmit} 
        className="flex flex-col gap-3">
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
          className="p-3 bg-[#598de0] text-gray-100 rounded-md font-bold mt-2">
          Sign in
        </button>
      </form>
    </div>
  );
};

export default CredentialsSignIn;
