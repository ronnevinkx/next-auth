import Link from 'next/link';
import { useState } from 'react';
import { getCsrfToken, getSession } from 'next-auth/client';
import { FormContainer } from '../../components/FormContainer';
import { FormGroup } from '../../components/FormGroup';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import ErrorMessage from '../../components/ErrorMessage';

export default function ForgotPassword({ csrfToken }) {
	const [error, setError] = useState('');
	const [form, setForm] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [success, setSuccess] = useState(false);
	const [message, setMessage] = useState('');

	const handleChange = e => {
		setForm({
			...form,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = async e => {
		e.preventDefault();
		setError('');
		setIsSubmitting(true);

		const { email } = form;

		let pattern = new RegExp(
			/^(('[\w-\s]+')|([\w-]+(?:\.[\w-]+)*)|('[\w-\s]+')([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
		);

		if (!email || !pattern.test(email)) {
			setError('InvalidEmail');
		} else {
			try {
				const res = await fetch('/api/account/forgotPassword', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ email, csrfToken })
				});

				const { success, message } = await res.json();

				setSuccess(success);
				setMessage(message);
			} catch (error) {
				//
			}
		}

		setIsSubmitting(false);
	};

	return (
		<FormContainer>
			<h1 className="text-light mb-20">Forgot password</h1>
			{isSubmitting ? (
				<p className="text-light">Submitting...</p>
			) : (
				message && (
					<p
						className={
							success ? `text-light` : `text-warning mb-20`
						}
					>
						{message}
					</p>
				)
			)}
			{!isSubmitting && !success && (
				<>
					<form onSubmit={handleSubmit}>
						<FormGroup>
							<label htmlFor="email">Email address</label>
							<Input
								type="email"
								name="email"
								placeholder="name@email.com"
								onChange={handleChange}
								required
							/>
						</FormGroup>
						<FormGroup>
							{error && <ErrorMessage errorId={error} />}
							<Button type="submit" primary>
								Send password reset email
							</Button>
						</FormGroup>
						<p className="text-sm text-center">
							Remember your password?{' '}
							<Link href="/auth/signin">Sign In</Link>
						</p>
					</form>
				</>
			)}
		</FormContainer>
	);
}

export async function getServerSideProps(context) {
	const session = await getSession(context);
	const csrfToken = await getCsrfToken(context);

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
			meta: { title: 'Forgot Password' },
			csrfToken
		}
	};
}
