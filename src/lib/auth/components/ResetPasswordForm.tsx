"use client";

import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";
import { type FC, useState } from "react";
import { useFormState } from "react-dom";

import { resetPassword } from "@/lib/auth/actions";
import { Button, Container, Input } from "@/lib/components";
import type { PasswordInputType } from "@/lib/types";

import {
  togglePasswordInputType,
  TogglePasswordVisibility,
} from "../components";
import { AuthError } from "./AuthError";

interface InitialStateType {
  success: string | null;
  error: string | null;
}

const initialState: InitialStateType = {
  success: null,
  error: null,
};

export const ResetPasswordForm: FC = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [passwordInputType, setPasswordInputType] =
    useState<PasswordInputType>("password");
  const [state, formAction] = useFormState(resetPassword, initialState);
  const { success, error } = state;

  if (!token) {
    redirect("/");
  }

  return (
    <Container maxWidth="max-w-md">
      <h1 className="font-bold text-3xl mb-7">Reset Password</h1>
      {success && (
        <>
          <p className="text-green-500">{success}</p>
          <p>
            <Link href="/auth/signin">Sign In</Link>
          </p>
        </>
      )}
      {!success && (
        <form action={formAction} className="mt-3">
          <div className="mb-4">
            <label htmlFor="password">New password</label>
            <div className="relative">
              <TogglePasswordVisibility
                title={
                  passwordInputType === "password"
                    ? "Show password"
                    : "Hide password"
                }
                onClick={() => {
                  togglePasswordInputType(
                    passwordInputType,
                    setPasswordInputType
                  );
                }}
                currentType={passwordInputType}
              />
              <Input
                id="password"
                type={passwordInputType}
                name="password"
                autoComplete="new-password"
                required
              />
            </div>
          </div>
          <div className="mt-5 mb-3">
            {error && <AuthError errorId={error} />}
            <input type="hidden" name="token" value={token} />
            <Button type="submit" primary>
              Update password
            </Button>
          </div>
        </form>
      )}
    </Container>
  );
};
