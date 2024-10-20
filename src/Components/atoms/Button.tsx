import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface ButtonProps {
  children: React.ReactNode;
  isLoading?: any;
}

export const Button: React.FC<ButtonProps> = ({ children, isLoading }) => (
  <button
    type="submit"
    className={`transition-colors w-full ${isLoading ? "bg-blue/50" : "bg-blue"} text-white h-[44px] rounded-sm font-semibold mb-2 mt-6 flex flex-row items-center justify-center`}
    disabled={isLoading}
  >
    {isLoading && (
      <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 mr-3" />
    )}
    {children}
  </button>
);
