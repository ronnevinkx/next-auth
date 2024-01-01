"use client";

import { signIn } from "next-auth/react";
import type { FC } from "react";

import { Button } from "@/lib/components";

export const SignInButton: FC<{ fullWidth?: boolean }> = ({ fullWidth }) => {
  return (
    <Button
      onClick={() => signIn(undefined, { redirect: true })}
      fullWidth={fullWidth}
    >
      Sign In
    </Button>
  );
};
