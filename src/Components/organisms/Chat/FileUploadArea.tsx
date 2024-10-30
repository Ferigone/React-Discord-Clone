// FileUploadArea.tsx

import React from "react";
import { Card, CardBody } from "@nextui-org/react";
import { FaFileLines } from "react-icons/fa6";

const FileUploadArea = () => {
  return (
    <div className="absolute w-full h-full z-50 flex justify-center items-center backdrop-blur shadow-none">
      <Card className="py-4 w-[75%] bg-transparent border-dashed border-gray-500 border-1">
        <CardBody className="overflow-visible py-2 flex items-center justify-center p-4">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <FaFileLines size={50} className="text-gray-500 mb-8" />
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              All files will be uploaded to this channel
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default FileUploadArea;
