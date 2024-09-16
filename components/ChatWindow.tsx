'use client'
import { MessageProps, UserProps } from "@/types";
import ChatBubble from "./ChatBubble";
import { useEffect } from "react";

const ChatWindow = ({ 
  user,
  messages
}: { 
  user: UserProps | undefined
  messages: MessageProps[] 
}) => {

  // useEffect(() => {
  //   window.scrollTo({
  //     top: document.documentElement.scrollHeight,
  //     behavior: 'smooth',
  //   });
  // })

  return (
    <div className="p-3 gap-1 py-20 flex flex-col">
      {messages.map((row) => {
        return (
          <ChatBubble 
            user={user} 
            data={row}
            role={
              user?.id === row.sender_id ? "sender" : "reciever"} 
            key={row.id}
          />
        )
      })
    }
    </div>
  );
};

export default ChatWindow;
