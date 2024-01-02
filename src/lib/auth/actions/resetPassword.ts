"use server";

import { getServerSession } from "next-auth";
import { z } from "zod";

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { User } from "@/lib/models/User.model";
import dbConnect from "@/lib/utils/dbConnect";

export async function resetPassword(_: any, formData: FormData) {
  const session = await getServerSession(authOptions);

  if (session) {
    return {
      success: null,
      error: "AlreadySignedIn",
    };
  }

  await dbConnect();

  const data = Object.fromEntries(formData.entries());
  const result = z
    .object({
      password: z.string().trim().min(5),
      token: z.string(),
    })
    .safeParse(data);

  if (!result.success) {
    return { success: null, error: "InvalidPassword" };
  }

  try {
    const { password, token } = result.data;
    const user = await User.findOne({ retrieveToken: token });

    if (user) {
      await User.findByIdAndUpdatePassword(user._id.toString(), password);
    }

    // return success message even if no user's been found, because we don't want to inform people if someone's a member or not
    return {
      success: "Your password has been reset.",
      error: null,
    };
  } catch (error) {
    return {
      success: null,
      error: "General",
    };
  }
}
