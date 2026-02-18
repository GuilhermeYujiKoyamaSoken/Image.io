import React from "react";

interface InputTextProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const InputText: React.FC<InputTextProps> = ({
  type = "text",
  className = "",
  error,
  ...props
}) => {

  const baseStyles = 
  ` w-full
    px-4 py-2 sm:py-3
    text-sm sm:text-base
    rounded-xl
    bg-gray-900
    text-white
    border
    transition
    focus:outline-none
    focus:ring-2`

  const stateStyles = error
    ? "border-red-500 focus:ring-red-500"
    : "border-gray-700 focus:ring-blue-500"

  return (
    <input
      type={type}
      {...props}
      className={`${baseStyles} ${stateStyles} ${className}`}
    />
  );
};