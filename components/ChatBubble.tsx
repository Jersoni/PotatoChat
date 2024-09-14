import React from 'react'

const ChatBubble = ({
    content,
    role = 'reciever'
} : {
    content: string,
    role: 'sender' | 'reciever'
}) => {
  return (
      <div className={`
        ${role === "reciever" 
            ? 'bg-white !rounded-bl-md'
            : 'bg-gray-800 text-white !rounded-br-md ml-auto'
        }  p-2 rounded-2xl px-5 w-fit`}>
        
        {content}
      </div>
      
  )
}

export default ChatBubble