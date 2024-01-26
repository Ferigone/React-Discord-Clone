import React from "react";
import "./ChatHeader.css";

import {IoMdNotifications, IoMdPeople, IoMdSearch, IoMdHelpCircle} from 'react-icons/io'
import {MdEditLocationAlt, MdInbox} from 'react-icons/md'

function ChatHeader({ channelName }: {channelName: string}) {
  return (
    <div className="chatHeader">
      <div className="chatHeader__left">
        <h4>
          <span className="chatHeader__hash">#</span>
          {channelName}
        </h4>
      </div>
      <div className="chatHeader__right">
      </div>
    </div>
  );
}

export default ChatHeader;
