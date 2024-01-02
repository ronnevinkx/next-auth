import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";

import { isProd } from "@/lib/constants";
import { User } from "@/lib/models/User.model";
import dbConnect from "@/lib/utils/dbConnect";

export const authOptions: NextAuthOptions = {
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID as string,
      clientSecret: process.env.FACEBOOK_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_ID as string,
      clientSecret: process.env.TWITTER_SECRET as string,
      name: "Twitter",
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        name: { label: "Name", type: "text", placeholder: "Your name" },
        email: { label: "Email", type: "email", placeholder: "name@email.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        await dbConnect();

        if (!credentials) {
          return null;
        }

        // find user in database and return it
        const { name, email, password } = credentials;
        const authType =
          req.body?.callbackUrl.indexOf("/register") !== -1
            ? "register"
            : "signin";

        if (!email || !password) {
          return null;
        }

        if (authType === "register") {
          if (!name) {
            return null;
          }

          try {
            const user = await User.add({ name, email, password });
            return user;
          } catch (error) {
            return null;
          }
        } else {
          try {
            const user = await User.login(email, password);
            return user;
          } catch (error) {
            return null;
          }
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: !isProd,
  callbacks: {
    async signIn({ user, account }) {
      // check incoming oauth or credentials request against database
      // and update loginCount and lastLoginAt
      const { name, email, image } = user;

      if (account?.type === "oauth") {
        if (!name) {
          // TODO: signin or register?
          return "/auth/signin?error=NoName";
        }

        // TODO: in case of no public email with github, how to know where to return (register/signin)?
        if (!email) {
          return "/auth/signin?error=NoEmail";
        }

        try {
          const existingUser = await User.findOne({ email });

          if (existingUser) {
            existingUser.loginCount = existingUser.loginCount + 1;
            existingUser.lastLoginAt = new Date();
            await existingUser.save();
          } else {
            const newUser = await User.add({ name, email, image });

            if (!newUser) {
              return "/auth/register?error=FailedNewUser";
            }
          }
        } catch (error) {
          // TODO: signin or register?
          return "/auth/signin?error=General";
        }
      }

      return true;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
};
