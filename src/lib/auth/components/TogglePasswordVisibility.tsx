import Image from "next/image";
import type { Dispatch, FC, SetStateAction } from "react";

import type { PasswordInputType } from "@/lib/types";

interface TogglePasswordVisibilityProps {
  title: string;
  onClick: () => void;
  currentType: PasswordInputType;
}

export const TogglePasswordVisibility: FC<TogglePasswordVisibilityProps> = ({
  title,
  onClick,
  currentType,
}) => {
  return (
    <div
      title={title}
      onClick={onClick}
      className={`absolute right-3 ${
        currentType === "password" ? "bottom-[10px]" : "bottom-[12px]"
      } cursor-pointer w-5 h-[17px]`}
    >
      <Image
        src={currentType === "password" ? "/visible.svg" : "/invisible.svg"}
        width={20}
        height={17}
        alt={title}
      />
    </div>
  );
};

export const togglePasswordInputType = (
  passwordInputType: PasswordInputType,
  setPasswordInputType: Dispatch<SetStateAction<PasswordInputType>>
) => {
  const type = passwordInputType === "password" ? "text" : "password";
  setPasswordInputType(type);
};
