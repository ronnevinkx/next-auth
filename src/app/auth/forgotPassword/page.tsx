import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { ForgotPasswordForm } from "@/lib/auth/components";

export const metadata: Metadata = {
  title: "Forgot Password",
};

export default async function ForgotPassword() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return <ForgotPasswordForm />;
}
