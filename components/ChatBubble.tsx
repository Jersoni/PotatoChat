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
              ? "bg-white border border-gray-400"
              : "bg-gray-800 text-white ml-auto"
          }  p-2 rounded-full px-5 w-fit`}
      >
        {data.message}
      </div>
    </div>
  );
};

export default ChatBubble;
