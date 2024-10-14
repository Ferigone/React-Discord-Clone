import React, { useState } from "react";
import { Modal, ModalContent, useDisclosure, ModalBody, ModalFooter } from "@nextui-org/react"; // Example modal from NextUI

interface MessageContentProps {
  message: string;
}

export const MessageContent: React.FC<MessageContentProps> = ({ message }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Regular expressions to identify image URLs, YouTube URLs, Twitch streams, and Twitch clips
  const imageRegex = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))/gi;
  const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/gi;
  const twitchStreamRegex = /(?:https?:\/\/)?(?:www\.)?twitch\.tv\/([a-zA-Z0-9_]+)/gi;
  const twitchClipRegex = /(?:https?:\/\/)?(?:www\.)?clips\.twitch\.tv\/([a-zA-Z0-9_-]+)/gi;

  // Function to open the modal with the selected image
  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    onOpen();
  };

  // Function to parse and replace image, YouTube, and Twitch URLs
  const parseMessage = (message: string) => {
    const parts = message.split(/(https?:\/\/[^\s]+)/g); // Split message by URLs

    return parts.map((part, index) => {
      // Check if the part matches an image URL
      if (imageRegex.test(part)) {
        return (
          <img
            key={index}
            src={part}
            alt="Embedded content"
            className="inline-block max-w-xs my-2 cursor-pointer"
            onClick={() => handleImageClick(part)}
          />
        );
      }

      // Check if the part matches a YouTube URL
      const youtubeMatch = youtubeRegex.exec(part);
      if (youtubeMatch) {
        const videoId = youtubeMatch[1]; // Extract the YouTube video ID
        return (
          <iframe
            key={index}
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="my-2 rounded-lg"
          ></iframe>
        );
      }

      // Check if the part matches a Twitch stream URL
      const twitchStreamMatch = twitchStreamRegex.exec(part);
      if (twitchStreamMatch) {
        const channelName = twitchStreamMatch[1]; // Extract the Twitch channel name
        return (
          <iframe
            key={index}
            src={`https://player.twitch.tv/?channel=${channelName}&parent=${window.location.hostname}&autoplay=false`}
            height="315"
            width="560"
            allowFullScreen
            autopla
            className="my-2 rounded-lg"
            title={`Twitch Stream - ${channelName}`}
            frameBorder="0"
          ></iframe>
        );
      }

      // Check if the part matches a Twitch clip URL
      const twitchClipMatch = twitchClipRegex.exec(part);
      if (twitchClipMatch) {
        const clipId = twitchClipMatch[1]; // Extract the Twitch clip ID
        return (
          <iframe
            key={index}
            src={`https://clips.twitch.tv/embed?clip=${clipId}&parent=${window.location.hostname}&autoplay=false`}
            height="315"
            width="560"
            allowFullScreen
            className="my-2 rounded-lg"
            title={`Twitch Clip - ${clipId}`}
            frameBorder="0"
            loading="lazy"
          ></iframe>
        );
      }

      // Otherwise, return the regular text
      return (
        <span
          key={index}
          dangerouslySetInnerHTML={{
            __html: unescape(part.replace(/\n/g, "<br />")),
          }}
        ></span>
      );
    });
  };

  return (
    <>
      {/* Render the message content */}
      <h4 className="relative break-words font-light">{parseMessage(message)}</h4>

      {/* Modal for image preview */}
      {selectedImage && (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur" className="bg-transparent shadow-none">
          <ModalContent>
            {() => (
              <>
                <ModalBody className="pt-8">
                  <img
                    src={selectedImage}
                    alt="Full-size preview"
                    className="max-w-full max-h-screen object-contain"
                  />
                </ModalBody>
                <ModalFooter className="pt-0 flex justify-start pl-7">
                  <a href={selectedImage} target="_blank" rel="noreferrer" className="text-white hover:underline">Open in new tab</a>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </>
  );
};
