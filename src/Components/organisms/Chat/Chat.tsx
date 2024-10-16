import React, { useRef, useState, useEffect, useCallback, memo } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdAddCircle } from "react-icons/io";
import { AiFillGift, AiOutlineGif } from "react-icons/ai";
import { MdEmojiEmotions } from "react-icons/md";
import { Textarea } from "@nextui-org/react";

import ChatHeader from "../ChatHeader/ChatHeader";
import Message from "@molecules/Message";
import UsersList from "../UsersList/UsersList";
import NoChannelContent from "@atoms/EmptyChatPlaceholder";

import SendMessage from "@utils/queries/SendMessage";

import { selectLastSelectedChannels } from "@store/reducers/appSlice";
import { socketService } from "@services/socketService";
import { selectChannelMessages, selectChannelName } from "@store/reducers/serverListSlice";

const Chat = () => {
  const navigate = useNavigate();
  const params = useParams();

  const channelName = useSelector(
    selectChannelName(params.server_id || "", params.channel_id || "")
  );
  const messages = useSelector(
    selectChannelMessages(params.server_id || "", params.channel_id || "")
  );
  const channels = [];
  const server = [];
  const lastSelectedChannels = useSelector(selectLastSelectedChannels);

  const [input, setInput] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
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
