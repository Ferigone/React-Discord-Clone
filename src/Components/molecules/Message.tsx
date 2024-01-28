import dayjs from "dayjs";
import { UserImage } from "@atoms/UserImage";
import { Username } from "@atoms/Username";
import { Timestamp } from "@atoms/Timestamp";
import { MessageContent } from "@atoms/MessageContent";

function Message({
  user,
  timestamp,
  message,
}: {
  user: any;
  timestamp: Date;
  message: string;
}) {
  const isSameDay = () => {
    return (
      dayjs(timestamp).format("DD-MM-YYYY") === dayjs().format("DD-MM-YYYY")
    );
  };

  return (
    <div className="message flex items-center p-3 px-8 transition-colors duration-250 text-white w-full break-words relative hover:bg-gray-700">
      <div className="flex h-full">
        <UserImage username={user.username} />
      </div>
      <div className="block break-all ml-5">
        <h5 className="flex items-baseline">
          <Username username={user.username} />
          <Timestamp timestamp={timestamp} isSameDay={isSameDay} />
        </h5>
        <MessageContent message={message} />
      </div>
    </div>
  );
}

export default Message;
