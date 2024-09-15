import { MessageProps, UserProps } from "@/types";

const ChatBubble = ({
  user,
  data,
  role = "reciever",
}: {
  user: UserProps | undefined;
  data: MessageProps;
  role: "sender" | "reciever";
}) => {

  return (
    <div>
      {/* <img 
        src={user?.image} 
        alt={"user profile"}
        height={32}
        width={32} 
        className={`rounded-full `}
      /> */}
      <div
        className={`
          ${
            role === "reciever"
              ? "bg-white !rounded-bl-md border border-gray-400"
              : "bg-gray-800 text-white !rounded-br-md ml-auto"
          }  p-2 rounded-2xl px-5 w-fit`}
      >
        {data.message}
      </div>
    </div>
  );
};

export default ChatBubble;
