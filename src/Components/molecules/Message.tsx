import { UserImage } from "@atoms/UserImage";
import { Username } from "@atoms/Username";
import { Timestamp } from "@atoms/Timestamp";
import { MessageContent } from "@atoms/MessageContent";
import MessageAttachment from "./MessageAttachment";
import { Button } from "@nextui-org/react";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { selectUser } from "@store/reducers/userSlice";
import RemoveMesssage from "@utils/queries/RemoveMessage";

function Message({
  id,
  user,
  timestamp,
  message,
  attachments,
}: {
  id: any;
  user: any;
  timestamp: Date;
  message: string;
  attachments?: any[];
}) {
  const currentUser = useSelector(selectUser);

  return (
    <div className="message group relative flex items-center p-3 px-8 transition-colors duration-250 text-white w-full break-words relative hover:bg-gray-700">
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

      {user.id === currentUser.id && (
        <div className="absolute right-8 hidden group-hover:block">
          <Button
            isIconOnly
            variant="solid"
            className="bg-transparent hover:bg-transparent rounded-md text-red-500"
            onClick={async () => {
              await RemoveMesssage(id);
            }}
          >
            <FaTrash />
          </Button>
        </div>
      )}
    </div>
  );
}

export default Message;
