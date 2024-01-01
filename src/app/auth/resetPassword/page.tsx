import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { ResetPasswordForm } from "@/lib/auth/components";

export const metadata: Metadata = {
  title: "Reset Password",
};

export default async function ResetPassword() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return <ResetPasswordForm />;
}
