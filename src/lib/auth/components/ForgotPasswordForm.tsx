"use client";

import Link from "next/link";
import type { FC } from "react";
import { useFormState } from "react-dom";

import { retrievePassword } from "@/lib/auth/actions";
import { Button, Container, Input } from "@/lib/components";

import { AuthError } from "./AuthError";

interface InitialStateType {
  success: string | null;
  error: string | null;
}

const initialState: InitialStateType = {
  success: null,
  error: null,
};

export const ForgotPasswordForm: FC = () => {
  const [state, formAction] = useFormState(retrievePassword, initialState);
  const { success, error } = state;

  return (
    <Container maxWidth="max-w-md">
      <h1 className="font-bold text-3xl mb-7">Forgot Password</h1>
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
            <label htmlFor="email">Email address</label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="name@email.com"
              required
            />
          </div>
          <div className="mt-5 mb-3">
            {error && <AuthError errorId={error} />}
            <Button type="submit" primary>
              Send password reset email
            </Button>
          </div>
          <p className="text-sm text-gray-500 text-center">
            Remember your password? <Link href="/auth/signin">Sign In</Link>
          </p>
        </form>
      )}
    </Container>
  );
};
