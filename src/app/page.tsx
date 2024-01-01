import type { Metadata } from "next";
import Link from "next/link";
import { getServerSession } from "next-auth";

import { SignOutButton } from "@/lib/auth/components";
import { Container } from "@/lib/components";

import { authOptions } from "./api/auth/[...nextauth]/authOptions";

export const metadata: Metadata = {
  title: "Home",
};

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <Container>
      <h1 className="font-bold text-3xl">Home</h1>
      {session ? (
        <div>
          <p>Name: {session.user?.name}</p>
          <p>
            Go to the <Link href="/secure-page">Secure Page</Link>.
          </p>
          <p className="mt-3">
            <SignOutButton fullWidth={false} />
          </p>
        </div>
      ) : (
        <p className="mt-3">
          Please <Link href="/auth/signin">Sign In</Link> or{" "}
          <Link href="/auth/register">Register</Link>.
        </p>
      )}
    </Container>
  );
}
