import React, {
  useContext,
  useRef,
  useState,
  useEffect,
  useCallback,
  memo,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdAddCircle } from "react-icons/io";
import { AiFillGift, AiOutlineGif } from "react-icons/ai";
import { MdEmojiEmotions } from "react-icons/md";
import { Textarea } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { FixedSizeList as List } from 'react-window';

import ChatHeader from "../ChatHeader/ChatHeader";
import Message from "@molecules/Message";
import UsersList from "../UsersList/UsersList";
import MessageSkeleton from "../Skeletons/Message";
import NoChannelContent from "@atoms/EmptyChatPlaceholder";

import SendMessage from "@utils/queries/SendMessage";
import GetChannelInfo from "@utils/queries/GetChannelInfo";
import GetMessages from "@utils/queries/GetMessages";

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
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const isElementVisible = useIsVisible(elementRef);

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

  const isUserAtBottom = useCallback(() => {
    if (!chatContainerRef.current) return false;
    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);
    return distanceFromBottom <= 50;
  }, []);

  const scrollToBottom = useCallback(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, []);

  const handleSendMessage = useCallback(async () => {
    if (!input.trim()) return;
    const res = (await SendMessage(input, params.channel_id || "")) as any;
    if (!res?.error) {
      setInput("");
      scrollToBottom();
    }
  }, [input, params.channel_id, scrollToBottom]);

  const handleKeyPress = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          handleSendMessage();
        }
      },
      [handleSendMessage]
  );

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

  useEffect(() => {
    socketService.on("message", (newMessage) => {
      const atBottom = isUserAtBottom();
      dispatch(addNewMessage(newMessage));
      if (atBottom) {
        scrollToBottom();
      }
    });

    return () => {
      socketService.off("message");
    };
  }, [dispatch, isUserAtBottom, scrollToBottom]);

  useEffect(() => {
    if (isElementVisible && messages.length > 0) {
      refetchMessages();
    }
  }, [isElementVisible, messages.length, refetchMessages]);

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

  const renderMessage = ({ index, style }: { index: number; style: React.CSSProperties }) => (
      <div style={style}>
        <Message
            key={messages[index].id}
            timestamp={messages[index].timestamp}
            user={messages[index]?.author}
            message={messages[index].content}
        />
      </div>
  );

  return (
      <>
        {params.channel_id ? (
            <div className="flex flex-row bg-primary flex-grow max-h-screen">
              <div className="flex flex-col flex-grow min-w-0 min-h-0">
                <ChatHeader channelName={channelName} />
                <div className="relative flex flex-col min-w-0 min-h-0 flex-grow">
                  <div
                      className="flex flex-col-reverse overflow-y-scroll scrollbar-thin scrollbar-thumb-black scrollbar-track-transparent flex-grow"
                      ref={chatContainerRef}
                  >
                    {messages.map((message, index) => (
                        <Message
                            key={message.id}
                            timestamp={message.timestamp}
                            user={message.author}
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
                  <div className="text-gray-400 flex justify-between p-1.5 rounded-md mx-5 mb-5">
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

export default memo(Chat);
