import React, { useRef, useState, useEffect, useCallback, memo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IoMdAddCircle } from "react-icons/io";
import { AiFillGift, AiOutlineGif } from "react-icons/ai";
import { MdEmojiEmotions } from "react-icons/md";
import { Button, Card, Textarea, Tooltip } from "@nextui-org/react";
import { FaFile, FaFileImage, FaFileLines, FaFilePdf } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";
import { filesize } from "filesize";
import { IoSend } from "react-icons/io5";

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

import { useAutoAnimate } from "@formkit/auto-animate/react";
import UploadMessageFile from "@utils/queries/UploadMessageFile";

const Chat = () => {
  const params = useParams();

  const [parent, enableAnimations] = useAutoAnimate();
  const [animateFiles, enableAnimateFiles] = useAutoAnimate();
  const [animateButtons, enableAnimateButtons] = useAutoAnimate({
    easing: "ease-in-out",
    disrespectUserMotionPreference: false,
  });
  const channelName = useSelector(
    selectChannelName(params.server_id || "", params.channel_id || "")
  );
  const messages = useSelector(
    selectChannelMessages(params.server_id || "", params.channel_id || "")
  );

  const customEmojis = useSelector(selectCustomEmojis(params.server_id || ""));
  const serverName = useSelector(selectServerName(params.server_id || ""));

  const categories = [
    { category: "custom", name: serverName + " Server emojis" },
    { category: "suggested", name: "Recently Used" },
  ];

  const [input, setInput] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const textAreaRef = useRef(null);
  const chatContainerRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, []);

  const handleSendMessage = useCallback(async () => {
    if (!input.trim() && selectedFiles.length === 0) return;

    const res = (await SendMessage(
      input,
      params.channel_id || "",
      selectedFiles.map((file) => file.id)
    )) as any;
    if (!res?.error) {
      setInput("");
      setSelectedFiles([]); // Clear files after sending
      scrollToBottom();
    }
  }, [input, selectedFiles, params.channel_id, scrollToBottom]);

  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    },
    [handleSendMessage]
  );

  const emojiPickerRef = useRef(null);

  const handleClickOutside = useCallback((event) => {
    if (
      emojiPickerRef.current &&
      !emojiPickerRef.current.contains(event.target)
    ) {
      setShowEmojiPicker(false);
    }
  }, []);

  const handleAddFile = () => {
    document.getElementById("fileInput")?.click();
  };

  const onFileChange = (e) => {
    const files: any = Array.from(e.target.files);

    // Add files with "uploading" status
    const newFiles = files.map((file) => ({ file, status: "uploading" }));
    setSelectedFiles((prevFiles: any) => [...prevFiles, ...newFiles]);

    // Upload each file
    files.forEach(async (file) => {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await UploadMessageFile(formData);
        console.log("File uploaded successfully:", response);

        // Update the file status to "uploaded" after successful upload
        setSelectedFiles((prevFiles: any) =>
          prevFiles.map((f) =>
            f.file === file ? { ...{...f, ...response.data.savedFile}, status: "uploaded" } : f
          )
        );
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    });
  };

  const removeFile = (fileToRemove) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((file) => file.file !== fileToRemove)
    );
  };

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

  const mapFileTypeToIcon = (fileType) => {
    switch (fileType) {
      case "text/plain":
        return <FaFileLines size={40} />;
      case "application/pdf":
        return <FaFilePdf size={40} />;
      case "image/jpeg":
        return <FaFileImage size={40} />;
      case "image/png":
        return <FaFileImage size={40} />;
      case "image/gif":
        return <FaFileImage size={40} />;
      case "image/svg+xml":
        return <FaFileImage size={40} />;
      default:
        return <FaFile size={40} />;
    }
  };

  const showSendButton = input.trim() || selectedFiles.length > 0;

  return (
    <>
      {params.channel_id ? (
        <div className="flex flex-row bg-primary flex-grow max-h-screen">
          <div className="flex flex-col flex-grow min-w-0 min-h-0">
            <ChatHeader channelName={channelName} />
            <div className="relative flex flex-col min-w-0 min-h-0 flex-grow">
              <div
                className="flex flex-col-reverse overflow-y-scroll scrollbar-thin scrollbar-thumb-black scrollbar-track-transparent flex-grow"
                ref={parent}
              >
                {messages?.map((message, index) => (
                  <Message
                    key={message.id}
                    id={message.id}
                    timestamp={message.timestamp}
                    user={message.author}
                    message={message.content}
                    attachments={message.attachments}
                  />
                ))}
              </div>
              <div className="text-gray-400 flex justify-between p-1.5 rounded-md mx-5 mb-5">
                <div className="mx-1 w-full bg-light-hover rounded-lg">
                  {selectedFiles.length > 0 && (
                    <div
                      className="mb-2 p-2 rounded-t-lg flex items-center gap-2 flex-wrap "
                      ref={animateFiles}
                    >
                      {selectedFiles.map((fileObj, index) => (
                        <Card
                          key={index}
                          className={`flex flex-row gap-2 p-4 items-center relative ${
                            fileObj.status === "uploading"
                              ? "opacity-50"
                              : "opacity-100"
                          } bg-primary`}
                        >
                          {mapFileTypeToIcon(fileObj.file.type)}
                          <div className="flex flex-col mr-2">
                            <Tooltip content={fileObj.file.name}>
                              <p className="text-gray-200 max-w-[160px] truncate ...">
                                {fileObj.file.name}
                              </p>
                            </Tooltip>
                            <p className="text-light-gray text-xs">
                              {filesize(fileObj.file.size)}
                            </p>
                          </div>
                          <button
                            className="text-red-500 absolute right-1 top-1"
                            onClick={() => removeFile(fileObj.file)}
                          >
                            <IoIosClose size={20} />
                          </button>
                        </Card>
                      ))}
                    </div>
                  )}
                  <Textarea
                    ref={textAreaRef}
                    aria-label="Message"
                    placeholder="Message"
                    minRows={1}
                    maxRows={4}
                    className=""
                    classNames={{
                      innerWrapper: "flex justify-center items-center",
                      inputWrapper: `bg-light-hover hover:bg-light-hover rounded-b-lg ${
                        selectedFiles.length === 0
                          ? "rounded-t-lg"
                          : "rounded-t-none"
                      }`,
                      input: "font-semibold bg-light-hover",
                    }}
                    startContent={
                      <Button
                        isIconOnly
                        variant="light"
                        onClick={handleAddFile}
                      >
                        <IoMdAddCircle className="fill-primary-text w-7 h-7 mx-2" />
                      </Button>
                    }
                    endContent={
                      <div ref={animateButtons} className="flex flex-row">
                        <button>
                          <AiFillGift className="fill-primary-text hover:fill-lighter-hover w-7 h-7 mr-2" />
                        </button>
                        <button>
                          <AiOutlineGif className="fill-primary-text hover:fill-lighter-hover w-7 h-7 mr-2" />
                        </button>
                        <div className="relative flex">
                          <button
                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
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
                              onEmojiClick={(emoji) => {
                                setInput(
                                  input +
                                    (emoji.isCustom
                                      ? emoji.names[0]
                                      : emoji.emoji)
                                );
                              }}
                            />
                          </div>
                        </div>
                        {showSendButton && (
                          <Button
                            variant="light"
                            onClick={handleSendMessage}
                            className="hover:bg-light-hover"
                            isIconOnly
                          >
                            <IoSend className="fill-primary-text w-7 h-7 mx-2" />
                          </Button>
                        )}
                      </div>
                    }
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    value={input}
                  />
                  <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    multiple
                    onChange={onFileChange}
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
