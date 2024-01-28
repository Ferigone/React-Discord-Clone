import React from 'react';

interface MessageContentProps {
  message: string;
}

export const MessageContent: React.FC<MessageContentProps> = ({ message }) => (
  <h4
    className="relative break-words font-light"
    dangerouslySetInnerHTML={{
      __html: unescape(message.replace(/\n/g, "<br />")),
    }}
  ></h4>
);
