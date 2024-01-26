
import React from "react";
import "./Message.css";
import dayjs from "dayjs";
import { Grid, Card, Text } from "@nextui-org/react";

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
      <div className="flex h-full">
        <img className="w-[40px] h-[40px] rounded-full" src={`https://via.placeholder.com/150/000000/FFFFFF/?text=${user.username[0]}`} />
      </div>
      <div className="message__info block break-all">
        <h5>
          <span className="font-semibold">
            {user.username}
          </span>
          <span className="message__timestamp">
            {dayjs(timestamp).format("DD-MM-YYYY HH:mm")}
          </span>
        </h5>
        <h4 className="relative break-words" dangerouslySetInnerHTML={{ __html: unescape(message.replace(/\n/g, "<br />")) }}></h4>
      </div>
    </div>
  );
}

export default Message;
