import type { FC, ReactNode } from "react";

import type { TWMaxW } from "../types";

interface ContainerProps {
  maxWidth?: TWMaxW;
  children: ReactNode;
}

export const Container: FC<ContainerProps> = ({
  maxWidth = "max-w-4xl",
  children,
}) => {
  return (
    <div
      className={`container mx-auto ${maxWidth} my-0 sm:my-8 py-8 px-4 sm:px-8 bg-white shadow-md sm:rounded-xl`}
    >
      {children}
    </div>
  );
};
