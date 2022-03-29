import { Avatar } from "@material-ui/core";
import React from "react";
import "./Message.css";
import moment from "moment";

function Message({
  user,
  timestamp,
  message,
}: {
  user: any;
  timestamp: Date;
  message: string;
}) {
  return (
    <div className="message w-full break-words relative">
      <Avatar src={user.photo} />
      <div className="message__info block break-all">
        <h5>
          {user.displayName}
          <span className="message__timestamp">
            {moment(timestamp).format("DDMMYYYY") ===
            moment(Date.now()).format("DDMMYYYY")
              ? moment(timestamp).format("YYYY-MM-DD HH:mm")
              : moment(timestamp).format("YYYY-MM-DD")}
          </span>
        </h5>
        <h4 className="relative break-words">{message}</h4>
      </div>
    </div>
  );
}

export default Message;
