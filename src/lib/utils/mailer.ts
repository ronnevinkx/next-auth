"use server";

import type { MailDataRequired } from "@sendgrid/mail";
import sgMail from "@sendgrid/mail";

export async function sendEmail(mailData: MailDataRequired) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

  try {
    await sgMail.send(mailData);
    return true;
  } catch (error) {
    return false;
  }
}
