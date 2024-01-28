import React from 'react';

interface UsernameProps {
  username: string;
}

export const Username: React.FC<UsernameProps> = ({ username }) => (
  <span className="font-semibold">{username}</span>
);
