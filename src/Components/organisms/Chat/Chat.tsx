import React, {
  useContext,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdAddCircle } from "react-icons/io";
import { AiFillGift, AiOutlineGif } from "react-icons/ai";
import { MdEmojiEmotions } from "react-icons/md";
import { Textarea } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";

import ChatHeader from "../ChatHeader/ChatHeader";
import Message from "@molecules/Message";
import UsersList from "../UsersList/UsersList";
import MessageSkeleton from "../Skeletons/Message";
import NoChannelContent from "@atoms/EmptyChatPlaceholder";

import SendMessage from "@utils/queries/SendMessage";
import GetChannelInfo from "@utils/queries/GetChannelInfo";
import GetMessages from "@utils/queries/GetMessages";

import { SocketContext } from "@context/socket";
import { useIsVisible } from "@hooks/useIsElementVisible";

import {
  addMessages,
  addNewMessage,
  selectChannel,
  selectChannelName,
  selectMessages,
  setChannelInfo,
  setMessages,
} from "@store/reducers/channelSlice";
import { selectChannels, selectServer } from "@store/reducers/serverSlice";
import { selectLastSelectedChannels } from "@store/reducers/appSlice";
import { socketService } from "@services/socketService";

const Chat = () => {
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
  const [totalChatMessages, setTotalChatMessages] = useState(0);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const elementRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null); // Ref for chat container to detect scroll position
  const isElementVisible = useIsVisible(elementRef);

  // Fetch channel info
  useQuery({
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
  const {
    isLoading,
    isPending,
    data,
    refetch: refetchMessages,
  } = useQuery({
    queryKey: ["messages", channel._id],
    queryFn: async () => {
      if (!channel.id) return;
      const newMessages = await GetMessages(channel.id, messages.length);
      console.log(newMessages);
      if (messages.length) {
        dispatch(addMessages(newMessages));
      } else {
        dispatch(setMessages(newMessages));
      }
      setTotalChatMessages(newMessages.total);
      return newMessages;
    },
    enabled: !!channel._id,
    retry: false,
    refetchOnWindowFocus: false,
  });

  // Detect if user is scrolled to the bottom
  const isUserAtBottom = () => {
    if (!chatContainerRef.current) return false;
    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;

    console.log("ScrollTop", scrollTop, "ScrollHeight", scrollHeight, "ClientHeight", clientHeight);
  
    // Allow a tolerance of ±50px from the bottom
    const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);
    
    // If the distance from the bottom is less than or equal to 50px, consider the user at the bottom
    return scrollTop >= -300;
  };
  

  // Scroll to the bottom of the chat
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  // Send message with callback to prevent re-creation on every render
  const handleSendMessage = useCallback(async () => {
    if (!input.trim()) return;
    const res = (await SendMessage(input, params.channel_id || "")) as any;
    if (!res?.error) {
      setInput("");
      scrollToBottom(); // Scroll to bottom after sending a message
    }
  }, [input, params.channel_id]);

  // Handle Enter key to send message
  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    },
    [handleSendMessage]
  );

  // Join and leave channel based on route change
  useEffect(() => {
    if (params.channel_id) {
      socketService.emit("joinChannel", params.channel_id);
    }

    return () => {
      if (params.channel_id) {
        socketService.emit("leaveChannel", params.channel_id);
      }
    };
  }, [params.channel_id]);

  // Listen for incoming messages via socket
  useEffect(() => {
    socketService.on("message", (newMessage) => {
      const atBottom = isUserAtBottom(); // Check if user is at the bottom
      console.log("at bottom?", atBottom);
      dispatch(addNewMessage(newMessage));
      if (atBottom) {
        scrollToBottom(); // Auto-scroll to bottom if user is already at the bottom
      }
    });

    return () => {
      socketService.off("message");
    };
  }, [dispatch]);

  // Refetch messages when scrolling to the top (for infinite scroll)
  useEffect(() => {
    if (isElementVisible && messages.length > 0) {
      refetchMessages();
    }
  }, [isElementVisible, messages.length, refetchMessages]);

  // Auto-navigate to last selected channel
  useEffect(() => {
    if (!params.channel_id && channels.length > 0 && params.server_id) {
      const lastSelected = lastSelectedChannels.find(
        (el: { server_id: string; channel_id: string }) =>
          el.server_id === server._id
      );
      if (lastSelected) {
        navigate(
          `/app/server/${server._id}/channel/${lastSelected.channel_id}`
        );
      }
    }
  }, [
    channels,
    lastSelectedChannels,
    navigate,
    params.channel_id,
    params.server_id,
    server._id,
  ]);

  return (
    <>
      {" "}
      {params.channel_id ? (
        <div className="chat flex flex-row bg-primary flex-grow max-h-screen">
          <div className="chat__container flex flex-col flex-grow min-w-0 min-h-0">
            <ChatHeader channelName={channelName} />
            <div className="chat__messages_container relative flex flex-col min-w-0 min-h-0 flex-grow">
              <div
                className="chat__messages flex flex-col-reverse overflow-y-scroll scrollbar-thin scrollbar-thumb-black scrollbar-track-transparent flex-grow"
                ref={chatContainerRef} // Attach ref to chat container
              >
                {messages.map((message: any) => (
                  <Message
                    key={message.id}
                    timestamp={message.timestamp}
                    user={message?.author}
                    message={message.content}
                  />
                ))}
                {(isLoading || (isPending && !data)) &&
                  Array(1)
                    .fill(0)
                    .map((_, i) => <MessageSkeleton key={i} />)}
                {messages.length % 50 === 0 && messages.length > 0 && (
                  <div ref={elementRef}>
                    <MessageSkeleton />
                  </div>
                )}
                {!isPending && !isLoading && totalChatMessages === 0 && (
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
      ) : (
        <NoChannelContent />
      )}
      <UsersList />
    </>
  );
};

export default Chat;
