import React from "react";

interface InputProps {
  type: string;
  id: string;
  required?: boolean;
}

export const Input: React.FC<InputProps> = ({ type, id, required }) => (
  <input
    type={type}
    id={id}
    required={required}
    className="bg-secondary text-white w-[414px] h-[40px] rounded-sm mb-4 outline-none p-3"
  />
);
