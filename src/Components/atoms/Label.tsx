import React from "react";

interface LabelProps {
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}

export const Label: React.FC<LabelProps> = ({
  htmlFor,
  required,
  children,
}) => (
  <label
    htmlFor={htmlFor}
    className="font-bold text-light-gray mb-2 text-[12px]"
  >
    {children} {required && <sup className="text-red-500">*</sup>}
  </label>
);
