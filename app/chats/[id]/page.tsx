// "use client";
// import { ChatWindow, Header, Messagebox } from "@/components";
// import supabase from "@/lib/supabaseClient";
// import { MessageProps, UserProps } from "@/types";
// import { useSession } from "next-auth/react";
// import { useParams } from "next/navigation";
// import { ChangeEvent, FormEvent, useEffect, useState } from "react";

// export default function Home() {
//   // params
//   const params = useParams();

//   // dark mode
//   const [darkMode, setDarkMode] = useState(false);

//   // user
//   const { data: session, status } = useSession();
//   const [recipient, setRecipient] = useState<UserProps>();
//   const [user, setUser] = useState<UserProps>();

//   // get user data
//   useEffect(() => {
//     const fetchUser = async () => {
//       const { data, error } = await supabase
//         .from("users")
//         .select("*")
//         .eq("email", session?.user?.email);

//       if (error) {
//         console.log(error);
//       } else {
//         setUser({ ...data[0], ...session?.user });
//       }
//     };

//     if (session?.user?.email) {
//       fetchUser();
//     }
//   }, [session]);

//   // get recipient data
//   useEffect(() => {
//     const getRecipientsData = async () => {
//       const { data, error } = await supabase
//         .from("users")
//         .select("*")
//         .eq("id", params.id);

//       if (error) {
//         console.log(error);
//       } else {
//         setRecipient(data[0]);
//       }
//     };

//     getRecipientsData();
//   }, [params]);

//   // message
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     console.log(message);
//   }, [message]);

//   // messagebox change handler
//   const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setMessage(e.target.value);
//   };

//   // messagebox submit handler
//   const MessageSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const { error } = await supabase.from("messages").insert({
//       sender_id: user?.id,
//       message: message,
//       chat_id: convoID,
//     });

//     if (error) {
//       console.log(error);
//     } else {
//       console.log("message sent successfully.");
//       setMessage("");
//     }
//   };

//   // TODO: realtime subscription
//   // listen to database changes to the 'messages' table for INSERT events
//   const [messages, setMessages] = useState<MessageProps[]>([]);
//   useEffect(() => {
//     const subscribeToMessages = supabase
//       .channel("realtime:messages") // Create a channel for messages
//       .on(
//         "postgres_changes", // Listen to database changes
//         {
//           event: "INSERT",
//           schema: "public",
//           table: "messages",
//         },
//         (payload) => {
//           console.log("New message inserted:", payload.new);
//           setMessages((prevMessages) => [
//             ...prevMessages,
//             payload.new as MessageProps,
//           ]);
//         }
//       )
//       .subscribe();

//     // Cleanup the subscription when the component unmounts
//     return () => {
//       supabase.removeChannel(subscribeToMessages);
//     };
//   }, []);

//   // fetch conversation
//   const [convoID, setConvoID] = useState<number>();

//   useEffect(() => {
//     const fetchConvo = async () => {
//       const { data, error } = await supabase
//         .from("chats")
//         .select()
//         .contains("participants", [user?.id, recipient?.id]);

//       if (error) {
//         console.log(error);
//       } else {
//         setConvoID(data[0].id);
//       }
//     };

//     if (user && recipient) {
//       fetchConvo();
//     }
//   }, [user, recipient]);

//   // fetch all from table 'messages'
//   useEffect(() => {
//     const fetchMessages = async () => {
//       const { data, error } = await supabase
//         .from("messages")
//         .select("*")
//         .eq("chat_id", convoID);

//       if (error) console.log(error);
//       else setMessages(data);
//     };

//     if (convoID) {
//       fetchMessages();
//     }
//   }, [convoID]);

//   return (
//     <div
//       className={`${darkMode ? "bg-[#30343b]" : ""} 
//       flex flex-col w-full`}
//     >
//       <Header
//         user={user}
//         recipient={recipient}
//         darkMode={darkMode}
//         setDarkMode={() => setDarkMode(!darkMode)}
//       />
//       <ChatWindow user={user} messages={messages} />
//       <Messagebox
//         onChange={onInputChange}
//         message={message}
//         onSubmit={MessageSubmitHandler}
//       />
//     </div>
//   );
// }

import React from 'react'

const Page = () => {
  return (
    <div>Page</div>
  )
}

export default Page