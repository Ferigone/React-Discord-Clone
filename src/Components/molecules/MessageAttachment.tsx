import React, { useState } from "react";
import {
  Card,
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Image,
  useDisclosure,
} from "@nextui-org/react";
import { filesize } from "filesize";
import { FaFile, FaFileLines, FaFilePdf } from "react-icons/fa6";
import { IoMdDownload } from "react-icons/io";

const MessageAttachment = ({ attachment }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const isImageFile = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/svg+xml",
  ].includes(attachment.fileType);

  const handleImageClick = () => {
    setSelectedImage(attachment.url);
    onOpen();
  };

  return (
    <>
      {isImageFile ? (
        <>
          <Image
            src={attachment.url}
            alt={attachment.filename}
            className="cursor-pointer rounded-lg max-h-96"
            onClick={handleImageClick}
          />
          {selectedImage && (
            <Modal
              isOpen={isOpen}
              onOpenChange={onClose}
              backdrop="blur"
              className="bg-transparent shadow-none"
            >
              <ModalContent>
                {() => (
                  <>
                    <ModalBody className="pt-8 flex justify-center items-center">
                      <Image
                        src={selectedImage}
                        alt="Full-size preview"
                        className="max-h-screen object-contain rounded-none"
                      />
                    </ModalBody>
                    <ModalFooter className="pt-0 flex justify-start pl-7">
                      <a
                        href={selectedImage}
                        target="_blank"
                        rel="noreferrer"
                        className="text-white hover:underline"
                      >
                        Open in new tab
                      </a>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          )}
        </>
      ) : (
        <Card
          key={attachment.id}
          className="flex flex-row gap-2 p-4 items-center relative bg-primary"
        >
          {attachment.fileType === "text/plain" ? (
            <FaFileLines size={40} />
          ) : attachment.fileType === "application/pdf" ? (
            <FaFilePdf size={40} />
          ) : (
            <FaFile size={40} />
          )}
          <div className="flex flex-col mr-2">
            <p className="text-gray-200">{attachment.filename}</p>
            <p className="text-light-gray text-xs">
              {filesize(attachment.fileSize)}
            </p>
          </div>
          <a
            className="text-gray-500"
            href={attachment.url}
            download={attachment.filename}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IoMdDownload size={20} />
          </a>
        </Card>
      )}
    </>
  );
};

export default MessageAttachment;
