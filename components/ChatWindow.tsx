import ChatBubble from "./ChatBubble";

const ChatWindow = () => {
  return (
    <div className="h-fit mt-auto p-3 flex flex-col gap-1">
      <ChatBubble content={`hello`} role="reciever" />
      <ChatBubble content={`Whats up nigga`} role="reciever" />
      <ChatBubble content={`Good bye`} role="sender" />
    </div>
  );
};

export default ChatWindow;
