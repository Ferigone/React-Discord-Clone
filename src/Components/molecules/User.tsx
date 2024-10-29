import { Avatar } from "@nextui-org/react";

interface Props {
  user: any;
  showTag?: boolean;
}

const User = ({ user, showTag }: Props) => {
  const statusColors: any = {
    online: "success",
    away: "warning",
    dnd: "danger",
    offline: "default",
  };

  // Fallback values in case user or user.username is not defined
  const username = user?.username ?? "Unknown";
  const userId = user?.id?.substring(0, 6)?.toUpperCase() ?? "000000";
  const placeholderUserImage = `https://placehold.co/200x200/000000/FFFFFF/png?font=roboto&text=${username[0] || "U"}`

  return (
    <div className="flex flex-row items-center">
      <Avatar
        src={user.avatar || placeholderUserImage}
        className="font-semibold mx-4 my-1"
        isBordered={true}
        color={statusColors[user?.status] || "default"}
        size="sm"
      />

      <div className="flex flex-col cursor-pointer">
        <span className="text-white font-bold text-sm">{username}</span>
        {showTag && (
          <span className="text-gray text-xs font-semibold">
            #{userId}
          </span>
        )}
      </div>
    </div>
  );
};

export default User;
