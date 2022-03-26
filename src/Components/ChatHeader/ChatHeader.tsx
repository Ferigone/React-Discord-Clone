import React from "react";
import "./ChatHeader.css";
import { IconButton, Input } from "@material-ui/core";

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
        <IconButton>
          <IoMdNotifications />
        </IconButton>
        <IconButton>
          <MdEditLocationAlt />
        </IconButton>
        <IconButton>
          <IoMdPeople />
        </IconButton>

        <div className="chatHeader__search">
          <Input placeholder="search" className="chatHeader__search" />
          <IoMdSearch />
        </div>

        <IconButton>
          <MdInbox />
        </IconButton>
        <IconButton>
          <IoMdHelpCircle />
        </IconButton>
      </div>
    </div>
  );
}

export default ChatHeader;
