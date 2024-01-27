import React, { useContext, useRef, useState } from "react";
// import "./Chat.css";
import ChatHeader from "../ChatHeader/ChatHeader";
import Message from "../Message/Message";
import { useSelector, useDispatch } from "react-redux";
import { redirect, useNavigate, useParams } from "react-router-dom";

import { IoMdAddCircle, IoMdSend } from "react-icons/io";
import { AiFillGift, AiOutlineGif } from "react-icons/ai";
import { MdEmojiEmotions } from "react-icons/md";

import UsersList from "../UsersList/UsersList";
import {
  addMessages,
  addNewMessage,
  selectChannel,
  selectChannelName,
  selectMessages,
  setChannelInfo,
  setMessages,
} from "../../store/reducers/channelSlice";
import { Button, CircularProgress, Textarea } from "@nextui-org/react";
import SendMessage from "../../utils/queries/SendMessage";
import { SocketContext } from "../../context/socket";
import { useIsVisible } from "../../hooks/useIsElementVisible";
import { useQuery } from "@tanstack/react-query";
import Scrollbars from "react-custom-scrollbars-2";
import GetChannelInfo from "../../utils/queries/GetChannelInfo";
import GetMessages from "../../utils/queries/GetMessages";
import { selectChannels, selectServer } from "../../store/reducers/serverSlice";
import {
  selectLastSelectedChannels,
  setLastSelectedChannel,
  setLastSelectedServer,
} from "../../store/reducers/appSlice";

function Chat() {
  const elementRef: any = useRef(null);
  const channelName = useSelector(selectChannelName);
  const messages = useSelector(selectMessages);
  const channel = useSelector(selectChannel);
  const channels = useSelector(selectChannels);
  const server = useSelector(selectServer);
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();

  const lastSelectedChannels = useSelector(selectLastSelectedChannels);

  const token = localStorage.getItem("token");
  const [top, setTop] = useState(0);

  const params = useParams();
  const navigate = useNavigate();

  const [input, setInput] = useState("");
  const [messageIndex, setMessageIndex] = useState(0);

  const textAreaRef: any = useRef();

  const isElementVisible = useIsVisible(elementRef);

  const {
    isLoading: isLoadingChannel,
    error: errorChannel,
    data: dataChannel,
  } = useQuery({
    queryKey: ["channel", params.channel_id],
    queryFn: () => {
      return GetChannelInfo(params.channel_id || "").then((data: any) => {
        dispatch(setChannelInfo(data));
        return data;
      });
    },
    enabled: !!params.channel_id,
    refetchOnWindowFocus: false,
  });

  const calculateIndex = () => {
    if (messages.length < 50) {
      return 0;
    } else if (messages.length >= 50) {
      return messages.length;
    }
  };

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["messages", channel._id],
    queryFn: () => {
      GetMessages(channel._id, calculateIndex()).then((res: any) => {
        console.log(messageIndex);
        if (res) {
          if (messages.length) {
            dispatch(addMessages(res));
          } else {
            dispatch(setMessages(res));
          }
        }
        return res;
      });
    },
    enabled: !!channel._id,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const handleKeyPress = async (e: any) => {
    if (e.key === "Enter" && e.shiftKey) {
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      if (input) {
        let res: any = await SendMessage(input, params.channel_id || "");
        if (!res?.error) {
          setInput("");
          refetch();
        }
      }
    }
  };

  React.useEffect(() => {
    socket.emit("joinChannel", params.channel_id);
    setMessageIndex(0);

    dispatch(
      setLastSelectedChannel({
        channel_id: channel._id,
        server_id: channel.server_id,
      })
    );

    return () => {
      socket.emit("leaveChannel", params.channel_id);
    };
  }, [params.channel_id]);


  React.useEffect(() => {
    socket.on("message", (newMessage: any) => {
      dispatch(addNewMessage(newMessage));
    });
  }, []);

  React.useEffect(() => {
    if (isElementVisible && messages.length > 0) {
      refetch();
    }
  }, [isElementVisible]);

  React.useEffect(() => {
    if (!params.channel_id && channels.length > 0 && server?._id) {
      const lastSelectedChannel = lastSelectedChannels.find(
        (el: any) => el.server_id === server._id
      );
      navigate(
        `/app/server/${server._id}/channel/${lastSelectedChannel.channel_id}`
      );
    }
  }, [channels]);

  return (
    <>
      <div className="chat flex flex-col bg-primary flex-grow rounded-2xl max-h-screen">
        <div className="chat__container flex flex-col flex-grow min-w-0 min-h-0">
          <ChatHeader channelName={channelName} />
          <div className="chat__messages_container relative flex flex-col min-w-0 min-h-0 flex-grow">
            <div className="chat__messages flex flex-col-reverse overflow-y-scroll scrollbar-thin scrollbar-thumb-black scrollbar-track-transparent flex-grow">
              {messages.map((message: any) => (
                <Message
                  key={message._id}
                  timestamp={message.timestamp}
                  user={message.author}
                  message={message.content}
                />
              ))}
              <div
                ref={elementRef}
                className="flex justify-center items-center h-12"
              >
                {isLoading && <CircularProgress size="md" />}
              </div>
            </div>
            <div className="chat__input text-gray-400 flex justify-between p-1.5 rounded-md mx-5 mb-5">
              <div className="mx-1 w-full">
                <Textarea
                  ref={textAreaRef}
                  aria-label="Message"
                  placeholder="Message"
                  minRows={1}
                  maxRows={4}
                  classNames={{
                    innerWrapper: "flex justify-center items-center",
                    input: "font-semibold",
                  }}
                  startContent={
                    <button>
                      <IoMdAddCircle className="fill-primary-text hover:fill-lighter-hover w-7 h-7 mx-2" />
                    </button>
                  }
                  endContent={
                    <>
                      <button>
                        <AiFillGift className="fill-primary-text hover:fill-lighter-hover w-7 h-7 mr-2" />
                      </button>
                      <button>
                        <AiOutlineGif className="fill-primary-text hover:fill-lighter-hover w-7 h-7 mr-2" />
                      </button>
                      <button>
                        <MdEmojiEmotions className="fill-primary-text hover:fill-lighter-hover w-7 h-7 mr-2" />
                      </button>
                    </>
                  }
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  value={input}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <UsersList />
    </>
  );
}

export default Chat;
