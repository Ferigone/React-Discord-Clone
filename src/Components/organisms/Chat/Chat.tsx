import React, { useRef, useState, useEffect, useCallback, memo } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdAddCircle } from "react-icons/io";
import { AiFillGift, AiOutlineGif } from "react-icons/ai";
import { MdEmojiEmotions } from "react-icons/md";
import { ScrollShadow, Textarea } from "@nextui-org/react";

import ChatHeader from "../ChatHeader/ChatHeader";
import Message from "@molecules/Message";
import UsersList from "../UsersList/UsersList";
import NoChannelContent from "@atoms/EmptyChatPlaceholder";
import EmojiPicker from "emoji-picker-react";

import SendMessage from "@utils/queries/SendMessage";

import { socketService } from "@services/socketService";
import {
  selectChannelMessages,
  selectChannelName,
  selectCustomEmojis,
  selectServerName,
} from "@store/reducers/serverListSlice";

const Chat = () => {
  const params = useParams();

  const channelName = useSelector(
    selectChannelName(params.server_id || "", params.channel_id || "")
  );
  const messages = useSelector(
    selectChannelMessages(params.server_id || "", params.channel_id || "")
  );

  const customEmojis = useSelector(selectCustomEmojis(params.server_id || ""));

  const serverName = useSelector(selectServerName(params.server_id || ""));

  const categories = [
    {
      category: "custom",
      name: serverName + " Server emojis",
    },
    {
      category: "suggested",
      name: "Recently Used",
    },
  ];

  const [input, setInput] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
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

  const emojiPickerRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      emojiPickerRef.current &&
      !emojiPickerRef.current.contains(event.target as Node)
    ) {
      setShowEmojiPicker(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

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
              <ScrollShadow
                offset={50}
                visibility="top"
                className="flex flex-col-reverse overflow-y-scroll scrollbar-thin scrollbar-thumb-black scrollbar-track-transparent flex-grow"
              >
                {messages.map((message, index) => (
                  <Message
                    key={message.id}
                    timestamp={message.timestamp}
                    user={message.author}
                    message={message.content}
                  />
                ))}
              </ScrollShadow>
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
                        <div className="relative flex">
                          <button
                            onClick={() => {
                              setShowEmojiPicker(!showEmojiPicker);
                            }}
                          >
                            <MdEmojiEmotions className="fill-primary-text hover:fill-lighter-hover w-7 h-7 mr-2" />
                          </button>
                          <div
                            className="absolute bottom-12 right-0"
                            ref={emojiPickerRef}
                          >
                            {/* @ts-ignore */}
                            <EmojiPicker
                              categories={categories}
                              customEmojis={customEmojis}
                              open={showEmojiPicker}
                              skinTonesDisabled
                              theme="dark"
                              onEmojiClick={(emoji: any) => {
                                if (emoji.isCustom) {
                                  setInput(input + emoji.names[0]);
                                } else {
                                  setInput(input + emoji.emoji);
                                }
                              }}
                            />
                          </div>
                        </div>
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
