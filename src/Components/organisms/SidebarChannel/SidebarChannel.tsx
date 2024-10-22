import { useEffect, useState, useRef } from "react";
import { FaMicrophone } from "react-icons/fa";
import { socketService } from "@services/socketService";
import { useParams } from "react-router-dom";
import { RiHashtag } from "react-icons/ri";
import { Link } from "react-router-dom";
import { User } from "@nextui-org/user";
import { Button } from "@nextui-org/react";

function SidebarChannel({
  id,
  channelName,
  type,
}: {
  id: string;
  channelName: string;
  type?: string;
}) {
  const params = useParams();
  const [usersInChannel, setUsersInChannel] = useState<string[]>([]);
  const currentChannelRef = useRef<string | null>(null); // Track current channel

  // Function to join a voice channel
  const handleJoinVoiceChannel = (channelId: string) => {
    const currentChannel = currentChannelRef.current;

    // If the user is in another channel, first leave that channel
    if (currentChannel && currentChannel !== channelId) {
      socketService.emit("leaveVoiceChannel", {
        channelId: currentChannel,
        serverId: params.server_id,
      });
    }

    // Emit the join channel event
    socketService.emit("joinVoiceChannel", {
      channelId,
      serverId: params.server_id,
    });

    // Update the current channel reference
    currentChannelRef.current = channelId;
  };

  // Function to handle leaving the voice channel
  const handleLeaveVoiceChannel = () => {
    const currentChannel = currentChannelRef.current;
    if (currentChannel) {
      // Emit the leave event
      socketService.emit("leaveVoiceChannel", {
        channelId: currentChannel,
        serverId: params.server_id,
      });

      // Clear the current channel reference
      currentChannelRef.current = null;
    }
  };

  useEffect(() => {
    const handleUserUpdate = (updatedChannelId, userList) => {
      if (updatedChannelId === `voice:${params.server_id}:${id}`) {
        setUsersInChannel(userList);
      }
    };

    const handleServerVoiceChannelsUpdate = ({ channelId, users }) => {
      if (
        `voice:${params.server_id}:${channelId}` ===
        `voice:${params.server_id}:${id}`
      ) {
        setUsersInChannel(users);
        // Play sound when someone joins to the voice channel where the user is
        const audio = new Audio("https://www.myinstants.com/media/sounds/yt1s_nYWSz5R.mp3");
        audio.volume = 0.25;
        audio.play();
      }
    };

    // Listen for user updates in the channel
    socketService.on("updateVoiceChannelUsers", handleUserUpdate);

    // Listen for server-wide updates on voice channel users
    socketService.on(
      "updateServerVoiceChannels",
      handleServerVoiceChannelsUpdate
    );

    return () => {
      socketService.off("updateVoiceChannelUsers", handleUserUpdate);
      socketService.off(
        "updateServerVoiceChannels",
        handleServerVoiceChannelsUpdate
      );
    };
  }, [id, params.server_id]);

  return (
    <>
      {type === "voice" ? (
        <>
          <div
            className="flex flex-col text-primary-text py-1 my-1 rounded-lg hover:bg-light-hover hover:pl-2 duration-100 cursor-pointer"
            onClick={() => handleJoinVoiceChannel(id)}
          >
            <div className="flex flex-row items-center">
              <FaMicrophone className="mt-1 mx-2" />
              <h5 className="mb-1">{channelName}</h5>
            </div>
          </div>
          <ul className="text-sm text-gray-500">
            {usersInChannel.length > 0 &&
              usersInChannel.map((user) => (
                <div
                  className="flex flex-row items-center pl-8 my-3"
                  key={user}
                >
                  <User
                    name={user}
                    avatarProps={{
                      src: "https://avatars.githubusercontent.com/u/30373425?v=4",
                      className: "w-6 h-6 text-tiny",
                    }}
                    classNames={{
                      name: "max-w-[125px] truncate",
                    }}
                  />
                </div>
              ))}
            {/* Add button disconnect */}
            {type === "voice" && currentChannelRef.current === id && (
              <Button
                className="w-full"
                onClick={handleLeaveVoiceChannel}
                variant="error"
              >
                Disconnect
              </Button>
            )}
          </ul>
        </>
      ) : (
        <Link
          to={`/app/server/${params.server_id}/channel/${id}`}
          className="flex flex-row items-center text-primary-text py-1 my-1 rounded-lg hover:bg-light-hover hover:pl-2 duration-100 cursor-pointer"
        >
          <h5 className="flex items-center mb-1">
            <RiHashtag className="mt-1 mx-2" />
            {channelName}
          </h5>
        </Link>
      )}
    </>
  );
}

export default SidebarChannel;
