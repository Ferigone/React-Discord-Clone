// FilePreviewList.tsx

import React from "react";
import { Card, Tooltip } from "@nextui-org/react";
import { IoIosClose } from "react-icons/io";
import { filesize } from "filesize";
import { FaFile, FaFileImage, FaFileLines, FaFilePdf } from "react-icons/fa6";

interface FilePreviewListProps {
  selectedFiles: any[];
  removeFile: (fileToRemove: any) => void;
}

const FilePreviewList: React.FC<FilePreviewListProps> = ({
  selectedFiles,
  removeFile,
}) => {
  const mapFileTypeToIcon = (fileType) => {
    switch (fileType) {
      case "text/plain":
        return <FaFileLines size={40} />;
      case "application/pdf":
        return <FaFilePdf size={40} />;
      case "image/jpeg":
      case "image/png":
      case "image/gif":
      case "image/svg+xml":
        return <FaFileImage size={40} />;
      default:
        return <FaFile size={40} />;
    }
  };

  return (
    <div className="mb-2 p-2 rounded-t-lg flex items-center gap-2 flex-wrap max-h-[100px] overflow-y-auto">
      {selectedFiles.map((fileObj, index) => (
        <Card
          key={index}
          className={`flex flex-row rounded-lg gap-2 p-4 items-center relative ${
            fileObj.status === "uploading" ? "opacity-50" : "opacity-100"
          } bg-light-hover/25`}
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
  );
};

export default FilePreviewList;
