import dayjs from "dayjs";
import { UserImage } from "@atoms/UserImage";
import { Username } from "@atoms/Username";
import { Timestamp } from "@atoms/Timestamp";
import { MessageContent } from "@atoms/MessageContent";
import MessageAttachment from "./MessageAttachment";

function Message({
  user,
  timestamp,
  message,
  attachments,
}: {
  user: any;
  timestamp: Date;
  message: string;
  attachments?: any[];
}) {
  console.log("Message", user, timestamp, message);
  return (
    <div className="message flex items-center p-3 px-8 transition-colors duration-250 text-white w-full break-words relative hover:bg-gray-700">
      <div className="flex h-full w-[40px]">
        <UserImage
          username={user?.username || "Placeholder"}
          url={user?.avatar}
        />
      </div>
      <div className="block break-all ml-5">
        <h5 className="flex items-baseline">
          <Username username={user?.username || "Placeholder"} />
          <Timestamp timestamp={timestamp} />
        </h5>
        <MessageContent message={message} />
        {attachments && attachments.length > 0 && (
          <div className="attachments flex flex-wrap gap-4 mt-4">
            {attachments.map((attachment) => (
              <MessageAttachment key={attachment.id} attachment={attachment} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Message;
