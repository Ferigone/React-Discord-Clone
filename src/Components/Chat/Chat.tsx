import React, { useContext, useRef, useState } from "react";
import "./Chat.css";
import ChatHeader from "../ChatHeader/ChatHeader";
import Message from "../Message/Message";
import { useSelector, useDispatch } from "react-redux";

import { IoMdAddCircle, IoMdSend } from "react-icons/io";
import { AiFillGift, AiOutlineGif } from "react-icons/ai";
import { MdEmojiEmotions } from "react-icons/md";

import UsersList from "../UsersList/UsersList";
import { addMessages, addNewMessage, selectChannel, selectChannelName, selectMessages, setChannelInfo, setMessages } from "../../store/reducers/channelSlice";
import { Loading, Textarea } from "@nextui-org/react";
import SendMessage from "../../utils/queries/SendMessage";
import { SocketContext } from "../../context/socket";
import { useParams } from "react-router-dom";
import { useIsVisible } from "../../hooks/useIsElementVisible";
import { useQuery } from "@tanstack/react-query";
import Scrollbars from "react-custom-scrollbars-2";
import GetChannelInfo from '../../utils/queries/GetChannelInfo';
import GetMessages from "../../utils/queries/GetMessages";

function Chat() {
  const elementRef: any = useRef(null);
  const channelName = useSelector(selectChannelName);
  const messages = useSelector(selectMessages);
  const channel = useSelector(selectChannel);
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const [top, setTop] = useState(0);

  const params = useParams();

  const [input, setInput] = useState("");
  const [messageIndex, setMessageIndex] = useState(0);

  const textAreaRef: any = useRef();

  const isElementVisible = useIsVisible(elementRef);

  const { isLoading: isLoadingChannel, error: errorChannel, data: dataChannel } = useQuery({
    queryKey: ['channel', params.channel_id],
    queryFn: () => {
      return GetChannelInfo(params.channel_id || "").then((data: any) => {
        dispatch(setChannelInfo(data))
        return data;
      })
    },
    enabled: !!params.channel_id,
    refetchOnWindowFocus: false
  })

  const calculateIndex = () => {
    if (messages.length < 50) {
      return 0
    } else if(messages.length >= 50) {
      return messages.length;
    }
  }

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['messages', channel._id], queryFn: () => {
      GetMessages(channel._id, calculateIndex()).then((res: any) => {
        console.log(messageIndex)
        if (res) {
          if (messages.length) {
            dispatch(addMessages(res))
          } else {
            dispatch(setMessages(res))
          }
        }
        return res;
      });
    },
    enabled: !!channel._id,
    retry: false,
    refetchOnWindowFocus: false,
  });


  const handleKeyPress = (e: any) => {
    if (e.key === "Enter" && e.shiftKey) {
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      if (input) {
        SendMessage(input, params.channel_id || "")
        setInput("");
        textAreaRef.current.value = "";
      }
    }
  };

  React.useEffect(() => {
    socket.emit('joinChannel', params.channel_id);
    setMessageIndex(0);
    return () => {
      socket.emit('leaveChannel', params.channel_id);
    }
  }, [params.channel_id])


  React.useEffect(() => {
    socket.on('message', (newMessage: any) => {
      dispatch(addNewMessage(newMessage))
    })
  }, [])

  React.useEffect(() => {
    if (isElementVisible && messages.length > 0) {
      refetch();
    }
  }, [isElementVisible])


  return (
    <div className="chat">
      <ChatHeader channelName={channelName} />
      <div className="chat__container">
        <div className="chat__messages_container">
          <div className="chat__messages">
            {messages.map((message: any) => (
              <Message
                key={message._id}
                timestamp={message.timestamp}
                user={message.author}
                message={message.content}
              />
            ))}
            <div ref={elementRef}>
              {isLoading && (
                <div className="flex justify-center items-center h-[50px]">
                  <Loading size="md" />
                </div>
              )}
            </div>
          </div>
          <div className="chat__input">
            <div className="flex flex-row my-1">
              <IoMdAddCircle className="w-[25px] h-[25px] mx-2" />
            </div>
            <div className="mx-1 w-full">
              <Textarea
                ref={textAreaRef}
                aria-label="Message"
                placeholder="Message"
                minRows={1}
                maxLength={20}
                css={{
                  width: "100%",
                }}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                animated={false}
              />
            </div>
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
