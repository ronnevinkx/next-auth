import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "../auth/[...nextauth]/authOptions";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (session && session.user) {
    const { name, email } = session.user;

    // 200 OK
    return NextResponse.json(
      {
        me: {
          name,
          email,
        },
      },
      {
        status: 200,
      }
    );
  } else {
    // 401 Unauthorized
    return NextResponse.json(
      {
        session: null,
      },
      {
        status: 401,
      }
    );
  }
}
