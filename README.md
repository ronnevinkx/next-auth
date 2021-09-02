# NextAuth

Custom authentication system with NextAuth.js.

Check out [live version](https://next-auth-delta.herokuapp.com).

**Good to know**

-   When signing in with a social provider without having an account, you automatically get an account.

-   When signing in with GitHub (fails because no public email address), code has no way to know where to return (/auth/signin or /auth/register). See: [...nextauth.js]

## Table of Contents

-   [Features](#features)
-   [Technologies](#technologies)
-   [Installation](#installation)
-   [Routes](#routes)
-   [Auth Providers](#auth-providers)
    -   [Facebook](#facebook)
-   [SSL on localhost](#ssl-on-localhost)
-   [JWT](#jwt)
-   [SVG](#svg)
-   [Email](#email)
-   [Deployment Checklist](#deployment-checklist)
-   [Notes](#notes)

## Features

-   Sign in and register with OAuth and credentials
-   Protected API routes
-   Persisting users in database
-   Sending out welcome email
-   Show/hide password toggle
-   Forgot password flow

## Technologies

| Technology        | Purpose                              |
| ----------------- | ------------------------------------ |
| Next.js           | SSR and SSG framework for React      |
| NextAuth          | Authentication solution              |
| Mongoose          | ODM for MongoDB                      |
| bcrypt            | Password encryption                  |
| validator         | Email address validation             |
| sass              | Custom utility classes               |
| SendGrid          | Email service                        |
| styled-components | Theming and component-scoped styling |

## Installation

1. Clone repo: `git clone https://github.com/ronnevinkx/next-auth.git`
2. Install package: `npm i`
3. Setup `.env` file as indicated in `.env.example`
4. List desired OAuth providers in `[...nextauth].js`
5. Run locally: `npm run dev`

## Routes

| Route                         | Description                        |
| ----------------------------- | ---------------------------------- |
| `/auth/signin`                | Sign in                            |
| `/auth/register`              | Register                           |
| `/auth/forgotPassword`        | Forgot password - email form       |
| `/auth/resetPassword`         | Reset password - new password form |
| `/api/users`                  | Users API - protected              |
| `/api/auth/*`                 | NextAuth handler                   |
| `/api/account/forgotPassword` | Send email with token link         |
| `/api/account/resetPassword`  | Change password                    |

## Auth Providers

-   Facebook
-   GitHub
-   Google
-   Twitter
-   Credentials

### Facebook

1. After creating the app in the developer console, make sure to click Create Test App and use those credentials on localhost.

2. Set Advanced Access for public_profile (App Review > Permissions and Features).

3. Do the Data Use Checkup

4. Facebook Login should now work!

For a live app, First get Advanced Access for `public_profile` through the [console](https://developers.facebook.com/) (section App Review, action Get Advanced Access).

Make sure Facebook returns email address if you want to persist user (because you can also create FB account with phone number).

## SSL on localhost

1. Create certificate:

```
openssl req -x509 -out localhost.crt -keyout localhost.key \
-days 365 \
-newkey rsa:2048 -nodes -sha256 \
-subj '/CN=localhost' -extensions EXT -config <( \
printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")
```

2. Move to `certificates` folder in project root, add this folder to `.gitignore`

3. Click on certificate to add to keychain, look it up and set to `Always Trust`

4. Create custom `server.js`:

```js
const { createServer } = require('https');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
	key: fs.readFileSync('./certificates/localhost.key'),
	cert: fs.readFileSync('./certificates/localhost.crt')
};

app.prepare().then(() => {
	createServer(httpsOptions, (req, res) => {
		const parsedUrl = parse(req.url, true);
		handle(req, res, parsedUrl);
	}).listen(3000, err => {
		if (err) throw err;
		console.log('> Server started on https://localhost:3000');
	});
});
```

5. Change package.json file:

```json
"scripts": {
	"start": "node server.js"
},
```

6. Comment out `pages` prop in `[...nextauth].js`

Now run `npm run start`

## JWT

1. Installed node-jose-tools globally (`npm install -g node-jose-tools`)
2. Created `JWT_SIGNING_PRIVATE_KEY` with `jose newkey -s 256 -t oct -a HS512`

## SVG

[SVG url encoder](https://yoksel.github.io/url-encoder/)

## Email

I've chosen SendGrid as email service and have set up the environment variable `SENDGRID_API_KEY` for that, but you can choose anything you like. See `/utils/mailer.js`.

## Deployment Checklist

-   [x] Styling rendered on server
-   [ ] Welcome and Forgot Password mails sent out: no
-   [ ] Facebook sign in
-   [ ] Google sign in
-   [ ] Twitter sign in
-   [ ] GitHub sign in
-   [ ] Credentials sign in
-   [ ] Credentials register

## Notes

-   Configured `.babelrc` to use styled-components with Next.js
-   styled-components are serverside rendered through custom `_document.js`
