import React from "react";

interface UserImageProps {
  username: string;
}

export const UserImage: React.FC<UserImageProps> = ({ username }) => (
  <img
    className="w-10 h-10 rounded-full"
    src={`https://placehold.co/200x200/000000/FFFFFF/png?font=roboto&text=${username[0]}`}
    alt={`${username}'s profile`}
  />
);
