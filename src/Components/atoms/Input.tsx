import React from "react";
import { Input } from "@nextui-org/react";


export const InputComponent: React.FC<any> = ({
  onChange,
  error,
  errorMessage,
  id,
  label,
  ...props
}) => (
  <>
    <Input
      id={id}
      onValueChange={onChange}
      className="bg-secondary text-white w-[414px] h-[50px] rounded-sm mb-4 "
      errorMessage={error ? errorMessage : ""}
      label={label}
      labelPlacement="outside"
      classNames={{
        input: "bg-secondary text-white h-full h-[50px]",
        innerWrapper: "h-[50px]",
        label: "text-white",
        errorMessage: "text-red-500",
      }}
      {...props}
    />
  </>
);
