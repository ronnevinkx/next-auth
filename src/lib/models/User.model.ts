import bcrypt from "bcrypt";
import type { Model } from "mongoose";
import { model, Schema } from "mongoose";
import { models } from "mongoose";

import { COMPANY_FROM_EMAIL, COMPANY_FROM_NAME } from "@/lib/constants";
import { sendEmail } from "@/lib/utils/mailer";

export interface IUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  retrieveToken?: string;
  image?: string | null;
  loginCount: number;
  lastLoginAt: object;
}

interface UserModel extends Model<IUser> {
  login(email: string, password: string): Promise<IUser>;
  add(userProps: {
    name: string;
    email: string;
    password?: string;
    image?: string | null;
  }): Promise<IUser>;
  findByIdAndUpdatePassword(userId: string, password: string): Promise<IUser>;
}

const schema = new Schema<IUser, UserModel>(
  {
    name: {
      type: String,
      required: [true, "Please enter a name"],
      trim: true,
      minlength: 1,
      maxlength: [40, "Your name can only have 40 characters."],
    },
    email: {
      type: String,
      required: [true, "Please enter an email address."],
      unique: true,
      trim: true,
      minlength: 5,
      lowercase: true,
    },
    password: {
      type: String,
      trim: true,
      minlength: 5,
    },
    retrieveToken: {
      type: String,
      trim: true,
    },
    image: String,
    loginCount: {
      type: Number,
      default: 1,
    },
    lastLoginAt: {
      type: Date,
      default: new Date(),
    },
  },
  {
    timestamps: true,
  }
);

schema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();

  if (this.isModified("password") && this.password) {
    this.password = await bcrypt.hash(this.password, salt);
  }

  next();
});

// static methods
schema.static("login", async function (email, password): Promise<IUser> {
  const user = await this.findOne({ email });

  if (user) {
    if (!user.password) {
      throw Error("No password set, try with social provider");
    }

    const auth = await bcrypt.compare(password, user.password);

    if (auth) {
      user.loginCount = user.loginCount + 1;
      user.lastLoginAt = new Date();
      await user.save();

      return user;
    }

    throw Error("Password is incorrect");
  }

  throw Error("Email is incorrect");
});

schema.statics.add = async function (userProps): Promise<IUser> {
  const user = await this.create(userProps);

  if (user) {
    // send welcome email
    const mailData = {
      from: `${COMPANY_FROM_NAME} <${COMPANY_FROM_EMAIL}>`,
      to: `${user.name} <${user.email}>`,
      subject: "Welcome to NextAuth",
      text: `Hi ${user.name}, welcome to NextAuth! You've signed up with email ${user.email}`,
      html: `<p>Hi <strong>${user.name}</strong>,</p><p>Welcome to NextAuth! You've signed up with email ${user.email}</p>`,
    };

    sendEmail(mailData);

    return user;
  }

  throw Error("Account cannot be created");
};

schema.statics.findByIdAndUpdatePassword = async function (
  userId,
  password
): Promise<IUser> {
  const user = await this.findById(userId);

  if (user) {
    user.password = password;
    user.retrieveToken = undefined;
    await user.save();

    return user;
  }

  throw Error("User cannot be found");
};

export const User =
  (models.User as UserModel) || model<IUser, UserModel>("User", schema);
