import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { User } from "@/lib/models/User.model";
import dbConnect from "@/lib/utils/dbConnect";

import { authOptions } from "../auth/[...nextauth]/authOptions";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (session) {
    await dbConnect();

    const users = await User.find(
      {
        email: "my@email.com",
      },
      "name email loginCount lastLoginAt createdAt"
    );

    // 200 OK
    return NextResponse.json(
      {
        users,
      },
      {
        status: 200,
      }
    );
  } else {
    // 401 Unauthorized
    return NextResponse.json(
      {
        users: null,
      },
      {
        status: 401,
      }
    );
  }
}
