import { Avatar } from "@material-ui/core";
import React from "react";
import "./Message.css";
import moment from "moment";

function Message({ user, timestamp, message }) {
  return (
    <div className="message">
      <Avatar src={user.photo} />
      <div className="message__info">
        <h5>
          {user.displayName}
          <span className="message__timestamp">
            {moment(Date.now()).format("DDMMYYYY") ===
            moment(Date.now()).format("DDMMYYYY")
              ? moment(timestamp).format("YYYY-MM-DD HH:mm")
              : moment(timestamp).format("YYYY-MM-DD")}
          </span>
        </h5>
        <h4>{message}</h4>
      </div>
    </div>
  );
}

export default Message;
