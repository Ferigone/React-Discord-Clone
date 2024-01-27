import React, { useContext, useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdAddCircle } from "react-icons/io";
import { AiFillGift, AiOutlineGif } from "react-icons/ai";
import { MdEmojiEmotions } from "react-icons/md";
import { Textarea } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";

import ChatHeader from "../ChatHeader/ChatHeader";
import Message from "../Message/Message";
import UsersList from "../UsersList/UsersList";
import MessageSkeleton from "../Skeletons/Message";
import NoChannelContent from "../NoChannelContent/NoChannelContent";

import SendMessage from "../../utils/queries/SendMessage";
import GetChannelInfo from "../../utils/queries/GetChannelInfo";
import GetMessages from "../../utils/queries/GetMessages";

import { SocketContext } from "../../context/socket";
import { useIsVisible } from "../../hooks/useIsElementVisible";

import {
  addMessages,
  addNewMessage,
  selectChannel,
  selectChannelName,
  selectMessages,
  setChannelInfo,
  setMessages,
} from "../../store/reducers/channelSlice";
import {
  selectChannels,
  selectServer,
} from "../../store/reducers/serverSlice";
import {
  selectLastSelectedChannels,
} from "../../store/reducers/appSlice";

function Chat() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const socket = useContext(SocketContext);

  const channelName = useSelector(selectChannelName);
  const messages = useSelector(selectMessages);
  const channel = useSelector(selectChannel);
  const channels = useSelector(selectChannels);
  const server = useSelector(selectServer);
  const lastSelectedChannels = useSelector(selectLastSelectedChannels);

  const [input, setInput] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const elementRef = useRef<HTMLDivElement>(null);
  
  const isElementVisible = useIsVisible(elementRef);

  // Fetch channel info
  const { isLoading: isLoadingChannel } = useQuery({
    queryKey: ["channel", params.channel_id],
    queryFn: async () => {
      if (!params.channel_id) return;
      const data = await GetChannelInfo(params.channel_id);
      dispatch(setChannelInfo(data));
      return data;
    },
    enabled: !!params.channel_id,
    refetchOnWindowFocus: false,
  });

  // Fetch messages
  const { isLoading, isPending, data, isSuccess, refetch: refetchMessages } = useQuery({
    queryKey: ["messages", channel._id],
    queryFn: async () => {
      if (!channel._id) return;
      const newMessages = await GetMessages(channel._id, messages.length);
      if (messages.length) {
        dispatch(addMessages(newMessages));
      } else {
        dispatch(setMessages(newMessages));
      }
      return newMessages;
    },
    enabled: !!channel._id,
    retry: false,
    refetchOnWindowFocus: false,
  });

  // Send message
  const handleSendMessage = async () => {
    if (!input.trim()) return;
    const res = await SendMessage(input, params.channel_id || "") as any;
    if (!res?.error) {
      setInput("");
    }
  };

  // Handle key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (params.channel_id) {
      socket.emit("joinChannel", params.channel_id);
    }
    return () => {
      if (params.channel_id) {
        socket.emit("leaveChannel", params.channel_id);
      }
    };
  }, [params.channel_id, socket]);

  useEffect(() => {
    socket.on("message", (newMessage) => {
      dispatch(addNewMessage(newMessage));
    });
    return () => {
      socket.off("message");
    };
  }, [dispatch, socket]);

  useEffect(() => {
    if (isElementVisible && messages.length > 0) {
      refetchMessages();
    }
  }, [isElementVisible, messages.length, refetchMessages]);

  useEffect(() => {
    if (!params.channel_id && channels.length > 0 && params.server_id) {
      const lastSelected = lastSelectedChannels.find(
        // TODO: Add type
        (el: any) => el.server_id === server._id
      );
      if (lastSelected) {
        navigate(`/app/server/${server._id}/channel/${lastSelected.channel_id}`);
      }
    }
  }, [channels, lastSelectedChannels, navigate, params.channel_id, params.server_id, server._id]);


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
              {(isLoading || (isPending && !data)) && (
                <>
                  {Array(1)
                    .fill(0)
                    .map((_, i) => (
                      <MessageSkeleton key={i} />
                    ))}
                </>
              )}
              {(messages.length % 50 === 0 && messages.length > 0) && (
                <div ref={elementRef}>
                  <MessageSkeleton />
                </div>
              )}
              
              {(messages.length === 0 && isSuccess && !isPending && !isLoading) && (
                <NoChannelContent />
              )}
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
