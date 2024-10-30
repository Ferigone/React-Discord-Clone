// MessageList.tsx

import React from "react";
import Message from "@molecules/Message";
import { useAutoAnimate } from "@formkit/auto-animate/react";

interface MessageListProps {
  messages: any[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const [parent] = useAutoAnimate();

  return (
    <div
      className="flex flex-col-reverse overflow-y-scroll scrollbar-thin scrollbar-thumb-black scrollbar-track-transparent flex-grow"
      ref={parent}
    >
      {messages?.map((message) => (
        <Message
          key={message.id}
          id={message.id}
          timestamp={message.timestamp}
          user={message.author}
          message={message.content}
          attachments={message.attachments}
        />
      ))}
    </div>
  );
};

export default MessageList;
