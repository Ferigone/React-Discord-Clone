import React from "react";
import { IoMdNotifications, IoMdPeople, IoMdSearch, IoMdHelpCircle } from 'react-icons/io';
import { MdEditLocationAlt, MdInbox } from 'react-icons/md';

function ChatHeader({ channelName }: { channelName: string }) {
  return (
    <div className="flex justify-between items-center text-gray-500 p-1 border-b border-gray-800 bg-gray-800">
      <div className="flex items-center">
        <h4 className="flex items-center text-white text-lg my-2">
          <span className="text-gray-500 text-xl px-2.5">#</span>
          {channelName}
        </h4>
      </div>
      <div className="flex items-center flex-1 justify-between">
        {/* Icons can go here */}
      </div>
    </div>
  );
}

export default ChatHeader;
