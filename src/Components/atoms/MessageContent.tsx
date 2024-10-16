import React, {useState} from "react";
import {Modal, ModalContent, useDisclosure, ModalBody, ModalFooter} from "@nextui-org/react";

interface MessageContentProps {
  message: string;
}

export const MessageContent: React.FC<MessageContentProps> = ({message}) => {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const imageRegex = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))/gi;
  const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/gi;
  const twitchStreamRegex = /(?:https?:\/\/)?(?:www\.)?twitch\.tv\/([a-zA-Z0-9_]+)/gi;
  const twitchClipRegex = /(?:https?:\/\/)?(?:www\.)?clips\.twitch\.tv\/([a-zA-Z0-9_-]+)/gi;



  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    onOpen();
  };

  const parseMessage = (message: string) => {
    const parts = message.split(/(https?:\/\/[^\s]+)/g);

    return parts.map((part, index) => {
      if (imageRegex.test(part)) {
        return (
            <img
                key={index}
                src={part}
                alt="Embedded content"
                className="inline-block max-w-xs my-2 cursor-pointer rounded-lg"
                onClick={() => handleImageClick(part)}
            />
        );
      }

      const youtubeMatch = youtubeRegex.exec(part);
      if (youtubeMatch) {
        const videoId = youtubeMatch[1];
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

      const twitchStreamMatch = twitchStreamRegex.exec(part);
      if (twitchStreamMatch) {
        const channelName = twitchStreamMatch[1];
        return (
            <iframe
                key={index}
                src={`https://player.twitch.tv/?channel=${channelName}&parent=${window.location.hostname}&autoplay=false`}
                height="315"
                width="560"
                allowFullScreen
                className="my-2 rounded-lg"
                title={`Twitch Stream - ${channelName}`}
                frameBorder="0"
            ></iframe>
        );
      }

      const twitchClipMatch = twitchClipRegex.exec(part);
      if (twitchClipMatch) {
        const clipId = twitchClipMatch[1];
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
        <h4 className="relative break-words font-light">{parseMessage(message)}</h4>

        {selectedImage && (
            <Modal isOpen={isOpen} onOpenChange={onClose} backdrop="blur" className="bg-transparent shadow-none">
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
                        <a href={selectedImage} target="_blank" rel="noreferrer" className="text-white hover:underline">Open
                          in new tab</a>
                      </ModalFooter>
                    </>
                )}
              </ModalContent>
            </Modal>
        )}
      </>
  );
};
