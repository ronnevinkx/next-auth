# NextAuth.js

Custom authentication system with NextAuth.js.

Check out [live version](https://next-auth-delta.vercel.app).

## Issues

Currently working on these issues:

- `callbackUrl` doesn't work for `secure-page`, user returns to homepage
- No way of knowing if we should return to register or signin on error, see comments marked with `// TODO`

## Good to know

- When signing in with a social provider without having an account, you automatically get an account.

- When signing in with GitHub (possibly fails if there's no public email address), code has no way of knowing where to return (`/auth/signin` or `/auth/register`). See: `authOptions.tsx`.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Configuration](#configuration)
- [Routes](#routes)
- [Auth Providers](#auth-providers)
  - [Facebook](#facebook)
- [Email](#email)
- [Deployment Checklist](#deployment-checklist)

## Features

- Sign in and register with OAuth and credentials
- Protected API routes
- Persisting users in database
- Sending out welcome email
- Show/hide password toggle
- Forgot/retrieve password flow

## Technologies

| Tool         | Purpose                            |
| ------------ | ---------------------------------- |
| Vercel       | Hosting platform                   |
| Next.js      | React framework                    |
| TypeScript   | Programming language               |
| MongoDB      | Document database for user records |
| Mongoose     | ODM for MongoDB                    |
| SendGrid     | Email service                      |
| Tailwind CSS | Utility-first CSS framework        |
| Bcrypt       | Password hashing                   |
| Zod          | Input validation                   |

## Configuration

1. Clone repo: `git clone https://github.com/ronnevinkx/next-auth.git`
2. Install packages: `yarn`
3. Setup `.env` file as indicated in `.env.example`
4. List desired OAuth providers in `/api/[...nextauth]/authOptions.ts`
5. Run locally: `yarn dev`

## Auth Providers

- Facebook
- GitHub
- Google
- Twitter
- Credentials

### Facebook

1. After creating the app in the developer console, make sure to click Create Test App and use those credentials on localhost.

2. Set Advanced Access for public_profile (App Review > Permissions and Features).

3. Do the Data Use Checkup.

4. Facebook Login should now work.

For a live app, first get Advanced Access for `public_profile` through the [console](https://developers.facebook.com/) (section App Review, action Get Advanced Access).

Make sure Facebook returns email address if you want to persist user (because you can also create FB account with phone number).

## Email

I've chosen SendGrid as email service and have set up the environment variable `SENDGRID_API_KEY` for that, but you can choose anything you like. See `mailer.ts`.

## Deployment Checklist

- [x] Welcome and Forgot Password mails sent out and received
- [x] Facebook sign in and register
- [x] Google sign in and register
- [x] Twitter sign in and register
- [x] GitHub sign in and register
- [x] Credentials sign in and register
