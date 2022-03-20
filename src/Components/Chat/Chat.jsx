import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";
import ChatHeader from "../ChatHeader/ChatHeader";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { Input } from "@material-ui/core";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import GifIcon from "@material-ui/icons/Gif";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import Message from "../Message/Message";
import { useSelector } from "react-redux";
import {
  selectChannelId,
  selectChannelName,
} from "../../store/reducers/appSlice";
import { selectUser } from "../../store/reducers/userSlice";
import db from "../../utils/firebase";
import firebase from "firebase";

import UsersList from "../UsersList/UsersList";

function Chat() {
  const elementRef = useRef();
  const channelId = useSelector(selectChannelId);
  const user = useSelector(selectUser);
  const channelName = useSelector(selectChannelName);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (channelId) {
      db.collection("channels")
        .doc(channelId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot(
          (snapshot) => setMessages(snapshot.docs.map((doc) => doc.data())),
          elementRef.current.scrollIntoView()
        );
    }
  }, [channelId]);

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection("channels")
      .doc(channelId)
      .collection("messages")
      .add({
        timestamp: Date.now(),
        message: input,
        user: user,
      });

    setInput("");
  };
  return (
    <div className="chat">
      <ChatHeader channelName={channelName} />
      <div className="chat__container">
        <div className="chat__messages_container">
          <div className="chat__messages">
            {messages.map((message) => (
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
            <AddCircleIcon />
            <form>
              <Input
                value={input}
                disabled={!channelId}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Message #${channelName}`}
                className="chat__search"
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
            <div className="chat__inputIcons">
              <CardGiftcardIcon />
              <GifIcon />
              <EmojiEmotionsIcon />
            </div>
          </div>
        </div>
        <UsersList />
      </div>
    </div>
  );
}

export default Chat;
