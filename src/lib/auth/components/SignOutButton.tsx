"use client";

import { signOut } from "next-auth/react";
import type { FC } from "react";

import { Button } from "@/lib/components";

export const SignOutButton: FC<{ fullWidth?: boolean }> = ({ fullWidth }) => {
  return (
    <Button onClick={() => signOut()} fullWidth={fullWidth}>
      Sign Out
    </Button>
  );
};
