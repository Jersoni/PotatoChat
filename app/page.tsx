"use client";
import { ChatWindow, Header, Messagebox } from "@/components";
import supabase from "@/lib/supabaseClient";
import { UserProps } from "@/types";
import { ChangeEvent, useEffect, useState } from "react";

export default function Home() {
  
  // dark mode
  const [darkMode, setDarkMode] = useState(false);

  // user
  const [user, setUser] = useState<UserProps>();

  // get user data
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", 1);

      if (error) {
        console.log(error);
      } else {
        setUser(data[0]);
      }
    };

    fetchUser();
  }, []);

  // message
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log(message)
  }, [message])

  // messagebox change handler
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  // messagebox submit handler
  const MessageSubmitHandler = async () => {
    console.log("sending");
    const { data, error } = await supabase.from("messages").insert({
      sender_id: user?.id,
      reciever_id: 2,
      message: message,
    });

    if (error) {
      console.log(error);
    } else {
      console.log("sent: " + data);
    }
  };

  return (
    <div
      className={`${darkMode ? "bg-gray-300" : ""} 
      flex flex-col h-[100vh]`}
    >
      <Header
        user={user}
        darkMode={darkMode}
        setDarkMode={() => setDarkMode(!darkMode)}
      />
      <ChatWindow />
      <Messagebox
        onChange={onInputChange}
        message={message}
        onSubmit={MessageSubmitHandler}
      />
    </div>
  );
}
