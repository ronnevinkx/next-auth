import { getCsrfToken, getProviders, getSession } from 'next-auth/client';
import AuthForm from '../../components/AuthForm';

export default function SignIn({ providers, csrfToken }) {
	return (
		<AuthForm type="signin" providers={providers} csrfToken={csrfToken} />
	);
}

export async function getServerSideProps(context) {
	const session = await getSession(context);

	if (session && session.user) {
		return {
			redirect: {
				permanent: false,
				destination: '/'
			},
			props: {}
		};
	}

	return {
		props: {
			meta: { title: 'Sign In' },
			providers: await getProviders(),
			csrfToken: await getCsrfToken(context)
		}
	};
}
