"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { BuiltInProviderType } from "next-auth/providers/index";
import type { ClientSafeProvider, LiteralUnion } from "next-auth/react";
import { signIn } from "next-auth/react";
import type { FC } from "react";
import { useState } from "react";

import { Button, Container, Input } from "@/lib/components";
import type { PasswordInputType } from "@/lib/types";

import { AuthError } from "./AuthError";
import {
  togglePasswordInputType,
  TogglePasswordVisibility,
} from "./TogglePasswordVisibility";

interface AuthFormProps {
  authType: "register" | "signin";
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
  csrfToken?: string;
}

export const AuthForm: FC<AuthFormProps> = ({
  authType,
  providers,
  csrfToken,
}) => {
  const [passwordInputType, setPasswordInputType] =
    useState<PasswordInputType>("password");
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn("credentials", { name, email, password });
  };

  const formSettings =
    authType === "register"
      ? {
          title: "Register",
          providerPrefix: "Register",
          emailAction: "register",
          submitLabel: "Register",
          passwordLabel: "Password (at least 5 chars)",
          passwordAutoComplete: "new-password",
        }
      : {
          title: "Sign In",
          providerPrefix: "Sign in",
          emailAction: "sign in",
          submitLabel: "Sign In",
          passwordLabel: "Password",
          passwordAutoComplete: "current-password",
        };

  return (
    <Container maxWidth="max-w-md">
      <h1 className="font-bold text-3xl mb-7">{formSettings.title}</h1>
      {providers &&
        Object.values(providers).map((provider) => (
          <div key={provider.name} className="mt-3">
            {provider.name === "Credentials" && (
              <>
                <div className="inline-flex items-center justify-center w-full">
                  <hr className="w-full h-px my-8 bg-gray-300 border-0" />
                  <span className="absolute px-3 text-sm text-gray-500 bg-white -translate-x-1/2 left-1/2">
                    or {formSettings.emailAction} with email
                  </span>
                </div>
                <form onSubmit={handleSubmit}>
                  {authType === "register" && (
                    <div className="mb-4">
                      <label htmlFor="name">Name</label>
                      <Input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Your name"
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                  )}
                  <div className="mb-4">
                    <label htmlFor="email">Email address</label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="name@email.com"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="password">
                      {formSettings.passwordLabel}
                    </label>
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
                        autoComplete={formSettings.passwordAutoComplete}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    {authType === "signin" && (
                      <p className="text-sm mt-2">
                        <Link href="/auth/forgotPassword">
                          Forgot password?
                        </Link>
                      </p>
                    )}
                  </div>
                  <div className="mt-5 mb-3">
                    <input
                      name="csrfToken"
                      type="hidden"
                      defaultValue={csrfToken}
                    />
                    {error && <AuthError errorId={error} />}
                    <Button type="submit" primary>
                      {formSettings.submitLabel}
                    </Button>
                  </div>
                  {authType === "register" && (
                    <p className="text-sm text-gray-500 text-center">
                      Already a member? <Link href="/auth/signin">Sign In</Link>
                    </p>
                  )}
                  {authType === "signin" && (
                    <p className="text-sm text-gray-500 text-center">
                      Not a member yet?{" "}
                      <Link href="/auth/register">Register</Link>
                    </p>
                  )}
                </form>
              </>
            )}
            {provider.name !== "Credentials" && (
              <Button onClick={() => signIn(provider.id)}>
                <Image
                  src={`/${provider.name.toLowerCase()}.svg`}
                  width={30}
                  height={30}
                  alt={provider.name}
                  className="absolute left-3"
                />
                <span>
                  {formSettings.providerPrefix} with {provider.name}
                </span>
              </Button>
            )}
          </div>
        ))}
    </Container>
  );
};
