import { createHash } from 'crypto';
import parseUrl from './parseUrl';

const secret = process.env.SECRET;

export default async function verifyCsrfToken({ req }) {
	const csrfMethods = ['POST', 'PUT', 'PATCH', 'DELETE'];

	try {
		const { body } = req;
		const { csrfToken: csrfTokenFromBody } = body;

		const parsedUrl = parseUrl(
			process.env.NEXTAUTH_URL || process.env.VERCEL_URL
		);
		const baseUrl = parsedUrl.baseUrl;
		const useSecureCookies = baseUrl.startsWith('https://');
		const csrfProp = `${
			useSecureCookies ? '__Host-' : ''
		}next-auth.csrf-token`;

		if (req.cookies[csrfProp]) {
			const [csrfTokenValue, csrfTokenHash] =
				req.cookies[csrfProp].split('|');
			if (
				csrfTokenHash ===
				createHash('sha256')
					.update(`${csrfTokenValue}${secret}`)
					.digest('hex')
			) {
				// If hash matches then we trust the CSRF token value
				// If this is a method that is allowed to use csrf protection and the CSRF Token in the request body matches
				// the cookie we have already verified is one we have set, then token is verified!
				if (
					csrfMethods.includes(req.method) &&
					csrfTokenValue === csrfTokenFromBody
				)
					return true;
			}
		}
		return false;
	} catch (error) {
		return false;
	}
}
