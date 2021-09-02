import { useState } from 'react';
import { signIn, getCsrfToken, getSession } from 'next-auth/client';
import User from '../../models/User.model';
import { FormContainer } from '../../components/FormContainer';
import { FormGroup } from '../../components/FormGroup';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import {
	TogglePasswordVisibility,
	togglePasswordInputType
} from '../../components/TogglePasswordVisibility';
import ErrorMessage from '../../components/ErrorMessage';

export default function ResetPassword({ userId, csrfToken }) {
	const [passwordInputType, setPasswordInputType] = useState('password');
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

		let { password } = form;
		password = password.trim();

		if (!password || password.length < process.env.PASSWORD_MINLENGTH) {
			setError('InvalidPassword');
		} else {
			try {
				const res = await fetch('/api/account/resetPassword', {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ userId, password, csrfToken })
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
			<h1 className="text-light mb-20">Reset password</h1>
			{isSubmitting ? (
				<p className="text-light">Submitting...</p>
			) : (
				message && (
					<>
						<p
							className={
								success
									? `text-light mb-20`
									: `text-warning mb-20`
							}
						>
							{message}
						</p>
						{success && (
							<Button
								primary
								onClick={() => signIn()}
								notFullWidth
							>
								Sign In
							</Button>
						)}
					</>
				)
			)}
			{!isSubmitting && !success && (
				<>
					<form onSubmit={handleSubmit}>
						<FormGroup>
							<label htmlFor="password">New password</label>
							<TogglePasswordVisibility
								title={
									passwordInputType === 'password'
										? 'Show password'
										: 'Hide password'
								}
								onClick={e =>
									togglePasswordInputType(
										passwordInputType,
										setPasswordInputType
									)
								}
								currentType={passwordInputType}
							/>
							<Input
								type={passwordInputType}
								name="password"
								autoComplete="new-password"
								onChange={handleChange}
								required
							/>
						</FormGroup>
						<FormGroup>
							{error && <ErrorMessage errorId={error} />}
							<Button type="submit" primary>
								Update password
							</Button>
						</FormGroup>
					</form>
				</>
			)}
		</FormContainer>
	);
}

export async function getServerSideProps(context) {
	try {
		const { token } = context.query;
		const user = await User.findOne({ retrieveToken: token });

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
				meta: { title: 'Reset Password' },
				userId: user._id.toString(),
				csrfToken
			}
		};
	} catch (error) {
		return {
			redirect: {
				permanent: false,
				destination: '/'
			},
			props: {}
		};
	}
}
