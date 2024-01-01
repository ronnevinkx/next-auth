"use server";

import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";
import { z } from "zod";

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { COMPANY_FROM_EMAIL, COMPANY_FROM_NAME } from "@/lib/constants";
import { User } from "@/lib/models/User.model";
import { sendEmail } from "@/lib/utils/mailer";

export async function retrievePassword(_: any, formData: FormData) {
  const session = await getServerSession(authOptions);

  if (session) {
    return {
      success: null,
      error: "AlreadySignedIn",
    };
  }

  const data = Object.fromEntries(formData.entries());
  const result = z
    .object({
      email: z.string().trim().email().toLowerCase().min(6),
    })
    .safeParse(data);

  if (!result.success) {
    return { success: null, error: "InvalidEmail" };
  }

  try {
    const { email } = result.data;
    const user = await User.findOne({ email });

    if (user) {
      // create retrieveToken and store in user record
      const salt = await bcrypt.genSalt();
      const retrieveToken = await bcrypt.hash(user._id.toString(), salt);
      await User.findByIdAndUpdate(user._id, { retrieveToken });

      // send email with token
      const tokenLink = `${process.env.NEXTAUTH_URL}/auth/resetPassword?token=${retrieveToken}`;

      const mailData = {
        from: `${COMPANY_FROM_NAME} <${COMPANY_FROM_EMAIL}>`,
        to: `${user.name} <${user.email}>`,
        subject: "Reset your password",
        text: `Hi ${user.name}, forgot your password? Click on this link to reset your password: ${tokenLink}`,
        html: `<p>Hi <strong>${user.name}</strong>,</p><p>Forgot your password? Click on this link to reset your password:<br /><br /><a href="${tokenLink}">${tokenLink}</a></p>`,
      };

      const emailSent = await sendEmail(mailData);

      if (!emailSent) {
        throw new Error();
      }
    }

    // return success message even if no user's been found, because we don't want to inform people if someone's a member or not
    return {
      success: "Please check your inbox.",
      error: null,
    };
  } catch (error) {
    return {
      success: null,
      error: "General",
    };
  }
}
