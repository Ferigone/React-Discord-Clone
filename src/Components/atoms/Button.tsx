import React from "react";

interface ButtonProps {
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children }) => (
  <button
    type="submit"
    className="w-full bg-blue text-white h-[44px] rounded-sm font-semibold mb-2 mt-6"
  >
    {children}
  </button>
);
