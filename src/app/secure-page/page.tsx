import { getServerSession } from "next-auth";

import { SignInButton, SignOutButton } from "@/lib/auth/components";
import { Container } from "@/lib/components";

import { authOptions } from "../api/auth/[...nextauth]/authOptions";

export default async function SecurePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <Container maxWidth="max-w-md">
        <p>Please sign in first:</p>
        <p className="mt-3">
          <SignInButton fullWidth={false} />
        </p>
      </Container>
    );
  }

  return (
    <Container>
      <h1 className="font-bold text-3xl">Secure Page</h1>
      <p>Here is my secured content.</p>
      <p className="mt-3">
        <SignOutButton fullWidth={false} />
      </p>
    </Container>
  );
}
