// Chat.tsx

import React, { useRef, useState, useEffect, useCallback, memo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ChatHeader from "../ChatHeader/ChatHeader";
import NoChannelContent from "@atoms/EmptyChatPlaceholder";
import UsersList from "../UsersList/UsersList";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import FileUploadArea from "./FileUploadArea";

import SendMessage from "@utils/queries/SendMessage";
import UploadMessageFile from "@utils/queries/UploadMessageFile";
import { socketService } from "@services/socketService";
import {
  selectChannelMessages,
  selectChannelName,
  selectCustomEmojis,
  selectServerName,
} from "@store/reducers/serverListSlice";

import { useDropzone } from "react-dropzone";

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

  const [input, setInput] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<any>([]);
  const textAreaRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    // Implement scrolling logic if needed
  }, []);

  const handleSendMessage = useCallback(async () => {
    if (!input.trim() && selectedFiles.length === 0) return;

    const res = await SendMessage(
      input,
      params.channel_id || "",
      selectedFiles.map((file) => file.id)
    );
    if (!res?.error) {
      setInput("");
      setSelectedFiles([]);
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

  const removeFile = (fileToRemove) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((file) => file.file !== fileToRemove)
    );
  };

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

  const onFileChange = (e) => {
    const files = Array.from(e.target.files);

    const newFiles = files.map((file) => ({ file, status: "uploading" }));
    setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);

    files.forEach(async (file: any) => {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await UploadMessageFile(formData);
        setSelectedFiles((prevFiles) =>
          prevFiles.map((f) =>
            f.file === file
              ? { ...f, ...response.data.savedFile, status: "uploaded" }
              : f
          )
        );
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    });
  };

  const onDrop = useCallback((acceptedFiles) => {
    const files = acceptedFiles.map((file) => ({
      file,
      status: "uploading",
    }));

    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);

    acceptedFiles.forEach(async (file) => {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await UploadMessageFile(formData);
        setSelectedFiles((prevFiles) =>
          prevFiles.map((f) =>
            f.file === file
              ? { ...f, ...response.data.savedFile, status: "uploaded" }
              : f
          )
        );
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    });
  }, []);

  const { getRootProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      {params.channel_id ? (
        <div className="flex flex-row bg-primary/50 flex-grow max-h-screen">
          <div className="flex flex-col flex-grow min-w-0 min-h-0">
            <ChatHeader channelName={channelName} />
            <div
              className="relative flex flex-col min-w-0 min-h-0 flex-grow"
              {...getRootProps()}
            >
              {isDragActive && <FileUploadArea />}
              <MessageList messages={messages} />
              <MessageInput
                input={input}
                setInput={setInput}
                handleSendMessage={handleSendMessage}
                handleKeyPress={handleKeyPress}
                selectedFiles={selectedFiles}
                setSelectedFiles={setSelectedFiles}
                removeFile={removeFile}
                onFileChange={onFileChange}
                customEmojis={customEmojis}
                serverName={serverName}
                inputRef={textAreaRef}
              />
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
