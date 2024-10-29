import { Card, Tooltip } from "@nextui-org/react";
import { filesize } from "filesize";
import React from "react";
import { FaFile, FaFileImage, FaFileLines, FaFilePdf } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";
import { IoMdDownload } from "react-icons/io";

const MessageAttachment = ({ attachment }) => {
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
  return (
    <Card
      key={attachment.id}
      className={`flex flex-row gap-2 p-4 items-center relative bg-primary`}
    >
      {mapFileTypeToIcon(attachment.fileType)}
      <div className="flex flex-col mr-2">
        <p className="text-gray-200">{attachment.filename}</p>
        <p className="text-light-gray text-xs">
          {filesize(attachment.fileSize)}
        </p>
      </div>
      <a
        className="text-gray-500"
        // Download attachment
        href={attachment.url}
        download={attachment.filename}
        target="_blank"
      >
        <IoMdDownload size={20} />
      </a>
    </Card>
  );
};

export default MessageAttachment;
