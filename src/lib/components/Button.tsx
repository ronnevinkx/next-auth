import type { FC, ReactNode } from "react";

interface ButtonProps {
  type?: "button" | "reset" | "submit";
  onClick?: () => void;
  primary?: boolean;
  fullWidth?: boolean;
  children: ReactNode;
}

export const Button: FC<ButtonProps> = ({
  type = "button",
  onClick,
  primary = false,
  fullWidth = true,
  children,
}) => {
  return (
    <button
      type={type}
      className={`relative flex items-center justify-center border rounded-lg pl-7 sm:pl-3 pr-3 py-3 transition-all ${
        fullWidth && "w-full"
      } ${
        primary
          ? "text-white border-green-500 bg-green-500 hover:border-green-600 hover:bg-green-600"
          : "border-gray-300 hover:bg-gray-100"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
