import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";
import ChatHeader from "../ChatHeader/ChatHeader";
import Message from "../Message/Message";
import { useSelector } from "react-redux";
import {
  selectChannelId,
  selectChannelName,
} from "../../store/reducers/appSlice";
import { selectUser } from "../../store/reducers/userSlice";

import { IoMdAddCircle } from "react-icons/io";
import { AiFillGift, AiOutlineGif } from "react-icons/ai";
import { MdEmojiEmotions } from "react-icons/md";

import UsersList from "../UsersList/UsersList";

function Chat() {
  const elementRef: any = useRef();
  const channelId = useSelector(selectChannelId);
  const user = useSelector(selectUser);
  const channelName = useSelector(selectChannelName);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (channelId) {
      
    }
  }, [channelId]);

  const sendMessage = (e: any) => {
    e.preventDefault();

    

    setInput("");
  };
  return (
    <div className="chat">
      <ChatHeader channelName={channelName} />
      <div className="chat__container">
        <div className="chat__messages_container">
          <div className="chat__messages">
            {messages.map((message: any) => (
              <Message
                key="key"
                timestamp={message.timestamp}
                user={message.user}
                message={message.message}
              />
            ))}
            <div ref={elementRef} />
          </div>
          <div className="chat__input">
            <IoMdAddCircle className="w-[25px] h-[25px] mx-2" />
            <form>
              <input
                value={input}
                disabled={!channelId}
                onChange={(e: any) => setInput(e.target.value)}
                placeholder={`Message #${channelName}`}
                className="w-full pr-10 bg-transparent outline-none"
              />
              <button
                type="submit"
                disabled={!channelId}
                className="chat__inputButton"
                onClick={sendMessage}
              >
                Send Message
              </button>
            </form>
            <div className="flex flex-row my-1">
              <AiFillGift className="w-[25px] h-[25px] mr-2" />
              <AiOutlineGif className="w-[25px] h-[25px] mr-2" />
              <MdEmojiEmotions className="w-[25px] h-[25px] mr-2" />
            </div>
          </div>
        </div>
        <UsersList />
      </div>
    </div>
  );
}

export default Chat;
