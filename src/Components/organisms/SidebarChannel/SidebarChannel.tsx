import { useEffect, useState, useRef, useCallback } from "react";
import { FaMicrophone } from "react-icons/fa";
import { socketService } from "@services/socketService";
import { useParams, Link } from "react-router-dom";
import { RiHashtag } from "react-icons/ri";
import { User } from "@nextui-org/user";
import { Button } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { selectUserId } from "@store/reducers/userSlice";

interface SidebarChannelProps {
  id: string;
  channelName: string;
  type?: string;
}

function SidebarChannel({ id, channelName, type }: SidebarChannelProps) {
  const { server_id, channel_id } = useParams();
  const [usersInChannel, setUsersInChannel] = useState<[]>([]);
  const currentChannelRef = useRef<string | null>(null);
  const currentUserId = useSelector(selectUserId);

  const handleJoinVoiceChannel = useCallback(
    (channelId: string) => {
      const currentChannel = currentChannelRef.current;

      if (currentChannel && currentChannel !== channelId) {
        socketService.emit("leaveVoiceChannel", {
          channelId: currentChannel,
          serverId: server_id,
        });
      }

      socketService.emit("joinVoiceChannel", {
        channelId,
        serverId: server_id,
      });

      currentChannelRef.current = channelId;
    },
    [server_id]
  );

  const handleLeaveVoiceChannel = useCallback(() => {
    const currentChannel = currentChannelRef.current;
    socketService.emit("leaveVoiceChannel", {
      channelId: currentChannel,
      serverId: server_id,
    });
    currentChannelRef.current = null;
  }, [server_id]);

  useEffect(() => {
    const handleUserUpdate = (updatedChannelId: string, userList: []) => {
      if (updatedChannelId === `voice:${server_id}:${id}`) {
        setUsersInChannel(userList);
      }
    };

    const handleServerVoiceChannelsUpdate = ({ channelId, users }: any) => {
      if (`voice:${server_id}:${channelId}` === `voice:${server_id}:${id}`) {
        setUsersInChannel(users);
        const audio = new Audio(
          "https://www.myinstants.com/media/sounds/yt1s_nYWSz5R.mp3"
        );
        audio.volume = 0.25;
        audio.play();
      }
    };

    socketService.on("updateVoiceChannelUsers", handleUserUpdate);
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
  }, [id, server_id]);

  const isCurrentUserConnected = useCallback(
    () => usersInChannel.some((user) => user.id === currentUserId),
    [usersInChannel, currentUserId]
  );

  return (
    <>
      {type === "voice" ? (
        <>
          <div
            className="flex flex-col text-primary-text py-1 my-1 rounded-lg hover:bg-light-hover hover:pl-2 duration-100 cursor-pointer"
            onClick={() => handleJoinVoiceChannel(id)}
          >
            <div className="flex flex-row items-center">
              <FaMicrophone className="mx-2" />
              <h5 className="mb-1">{channelName}</h5>
            </div>
          </div>
          <ul className="text-sm text-gray-500">
            {usersInChannel.length > 0 &&
              usersInChannel.map((user) => (
                <div
                  className="flex flex-row items-center pl-8 my-3"
                  key={user.id}
                >
                  <User
                    name={user.username}
                    avatarProps={{
                      src: "https://avatars.githubusercontent.com/u/30373425?v=4",
                      className: "w-6 h-6 text-tiny",
                    }}
                    classNames={{ name: "max-w-[125px] truncate" }}
                  />
                </div>
              ))}
            {isCurrentUserConnected() && (
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
          to={`/app/server/${server_id}/channel/${id}`}
          className={`${
            channel_id === id ? "text-white bg-light-hover" : ""
          } flex flex-row items-center text-primary-text py-1 my-1 rounded-lg hover:bg-light-hover hover:pl-2 duration-100 cursor-pointer`}
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
