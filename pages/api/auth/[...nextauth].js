import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User.model';

dbConnect();

export default NextAuth({
	providers: [
		Providers.Facebook({
			clientId: process.env.FACEBOOK_CLIENT_ID,
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET
		}),
		Providers.GitHub({
			clientId: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET
		}),
		Providers.Google({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET
		}),
		Providers.Twitter({
			clientId: process.env.TWITTER_CLIENT_ID,
			clientSecret: process.env.TWITTER_CLIENT_SECRET
		}),
		Providers.Credentials({
			name: 'Credentials',
			async authorize(credentials, req) {
				// find user in database and return it
				const { name, email, password } = credentials;
				const { authType } = req.body;

				if (!email || !password) {
					return false;
				}

				if (authType === 'register') {
					if (!name) {
						return false;
					}

					try {
						const user = await User.add({ name, email, password });
						return user;
					} catch (error) {
						throw '/auth/register?error=CredentialsSignin';
					}
				} else {
					try {
						const user = await User.login(email, password);
						return user;
					} catch (error) {
						throw '/auth/signin?error=CredentialsSignin';
					}
				}
			}
		})
	],
	secret: process.env.SECRET,
	session: {
		jwt: true
	},
	jwt: {
		signingKey: process.env.JWT_SIGNING_PRIVATE_KEY
	},
	pages: {
		signIn: '/auth/signin'
	},
	callbacks: {
		async signIn(user, account, profile) {
			const { name, email, image } = user;

			if (account.type === 'oauth') {
				if (!name) {
					return '/auth/signin?error=NoName';
				}

				// TODO: no public email with github, but how to know where to return (register/signin)?
				if (!email) {
					return '/auth/signin?error=NoEmail';
				}

				try {
					let existingUser = await User.findOne({
						email: user.email
					});

					if (existingUser) {
						existingUser.loginCount = existingUser.loginCount + 1;
						existingUser.lastLoginAt = new Date();
						await existingUser.save();
					} else {
						const newUser = await User.add({ name, email, image });

						if (!newUser) {
							return '/auth/register?error=FailedNewUser';
						}
					}
				} catch (error) {
					return '/auth/signin?error=General';
				}
			}

			return true;
		},
		async redirect(url, baseUrl) {
			return baseUrl;
		}
	}
});
