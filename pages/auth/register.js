import { getCsrfToken, getProviders, getSession } from 'next-auth/client';
import AuthForm from '../../components/AuthForm';

export default function Register({ providers, csrfToken }) {
	return (
		<AuthForm type="register" providers={providers} csrfToken={csrfToken} />
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
			meta: { title: 'Register' },
			providers: await getProviders(),
			csrfToken: await getCsrfToken(context)
		}
	};
}
