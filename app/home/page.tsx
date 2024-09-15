"use client";
import { ChatWindow, Header, Messagebox } from "@/components";
import supabase from "@/lib/supabaseClient";
import { MessageProps, UserProps } from "@/types";
import { useSession } from "next-auth/react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";


export default function Home() {
  // dark mode
  const [darkMode, setDarkMode] = useState(false);

  // user
  const { data: session, status } = useSession()
  const [user, setUser] = useState<UserProps>();

  // get user data
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", session?.user?.email);

      if (error) {
        console.log(error);
      } else {
        setUser({...data[0], ...session?.user});
      }
    };

    if (session?.user?.email) {
        fetchUser();
    }
  }, [session]);

  // message
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log(message);
  }, [message]);

  // messagebox change handler
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  // messagebox submit handler
  const MessageSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error } = await supabase.from("messages").insert({
      sender_id: user?.id,
      reciever_id: 2,
      message: message,
    });

    if (error) {
      console.log(error);
    } else {
      console.log("message sent successfully.");
      setMessage("");
    }
  };

  // TODO: realtime subscription
  // listen to database changes to the 'messages' table for INSERT events
  const [messages, setMessages] = useState<MessageProps[]>([]);
  useEffect(() => {
    const subscribeToMessages = supabase
      .channel("realtime:messages") // Create a channel for messages
      .on(
        "postgres_changes", // Listen to database changes
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          console.log("New message inserted:", payload.new);
          setMessages((prevMessages) => [
            ...prevMessages,
            payload.new as MessageProps,
          ]);
        }
      )
      .subscribe();

    // Cleanup the subscription when the component unmounts
    return () => {
      supabase.removeChannel(subscribeToMessages);
    };
  }, []);

  // fetch all from table 'messages'
  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .order("created_at");

      if (error) console.log(error);
      else setMessages(data);
    };

    fetchMessages();
  }, []);

  return (
    <div
      className={`${darkMode ? "bg-[#30343b]" : ""} 
      flex flex-col w-full`}
    >
      <Header
        user={user}
        darkMode={darkMode}
        setDarkMode={() => setDarkMode(!darkMode)}
      />
      <ChatWindow user={user} messages={messages} />
      <Messagebox
        onChange={onInputChange}
        message={message}
        onSubmit={MessageSubmitHandler}
      />
    </div>
  );
}
