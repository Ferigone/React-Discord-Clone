// MessageInput.tsx

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Textarea, Button } from "@nextui-org/react";

import { MdEmojiEmotions } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import { IoMdAddCircle } from "react-icons/io";
import { AiFillGift, AiOutlineGif } from "react-icons/ai";

import EmojiPicker from "emoji-picker-react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import FilePreviewList from "./FilePreviewList";

interface MessageInputProps {
  input: string;
  setInput: (input: string) => void;
  handleSendMessage: () => void;
  handleKeyPress: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  selectedFiles: any[];
  removeFile: (fileToRemove: any) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  customEmojis: any[];
  serverName: string;
  inputRef: React.RefObject<HTMLTextAreaElement>;
}

const MessageInput: React.FC<MessageInputProps> = ({
  input,
  setInput,
  handleSendMessage,
  handleKeyPress,
  selectedFiles,
  removeFile,
  onFileChange,
  customEmojis,
  serverName,
  inputRef,
}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const categories = [
    { category: "custom", name: `${serverName} Server emojis` },
    { category: "suggested", name: "Recently Used" },
  ];
  const [animateButtons] = useAutoAnimate({
    easing: "ease-in-out",
    disrespectUserMotionPreference: false,
  });
  const showSendButton = input.trim() || selectedFiles.length > 0;
  const emojiPickerRef = useRef(null);

  const handleClickOutside = useCallback((event) => {
    if (
      emojiPickerRef.current &&
      !emojiPickerRef.current.contains(event.target)
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

  const handleAddFile = () => {
    document.getElementById("fileInput")?.click();
  };

  return (
    <div className="text-gray-400 flex justify-between p-1.5 rounded-md mx-5 mb-5">
      <div className="mx-1 w-full bg-light-hover/25 rounded-lg">
        {selectedFiles.length > 0 && (
          <FilePreviewList
            selectedFiles={selectedFiles}
            removeFile={removeFile}
          />
        )}
        <Textarea
          ref={inputRef}
          aria-label="Message"
          placeholder="Message"
          minRows={1}
          maxRows={4}
          className=""
          classNames={{
            innerWrapper: "flex justify-center items-center",
            inputWrapper: `bg-light-hover/50 hover:bg-light-hover/50 rounded-b-lg ${
              selectedFiles.length === 0 ? "rounded-t-lg" : "rounded-t-none"
            }`,
            input: "font-semibold bg-light-hover/50",
          }}
          startContent={
            <Button isIconOnly variant="light" onClick={handleAddFile}>
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
                <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                  <MdEmojiEmotions className="fill-primary-text hover:fill-lighter-hover w-7 h-7 mr-2" />
                </button>
                {showEmojiPicker && (
                  <div
                    className="absolute bottom-12 right-0"
                    ref={emojiPickerRef}
                  >
                    {/* @ts-ignore */}
                    <EmojiPicker
                      categories={categories}
                      customEmojis={customEmojis}
                      skinTonesDisabled
                      theme="dark"
                      onEmojiClick={(emoji) => {
                        setInput(
                          input +
                            (emoji.isCustom ? emoji.names[0] : emoji.emoji)
                        );
                      }}
                    />
                  </div>
                )}
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
  );
};

export default MessageInput;
