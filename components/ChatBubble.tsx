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
  );
};

export default ChatBubble;
