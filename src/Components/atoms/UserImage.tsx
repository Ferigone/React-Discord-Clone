import React from "react";

interface UserImageProps {
  username: string;
}

export const UserImage: React.FC<UserImageProps> = ({ username }) => (
  <img
    className="w-10 h-10 rounded-full"
    src={`https://via.placeholder.com/200/000000/FFFFFF/?text=${username[0]}`}
    alt={`${username}'s profile`}
  />
);
