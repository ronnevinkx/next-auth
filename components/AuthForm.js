import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { signIn } from 'next-auth/client';
import { FormContainer } from './FormContainer';
import { FormGroup } from './FormGroup';
import { Button } from './Button';
import { Input } from './Input';
import ErrorMessage from './ErrorMessage';
import {
	TogglePasswordVisibility,
	togglePasswordInputType
} from './TogglePasswordVisibility';

export default function AuthForm({ type, providers, csrfToken }) {
	const [passwordInputType, setPasswordInputType] = useState('password');
	const { error } = useRouter().query;

	const formSettings =
		type === 'register'
			? {
					title: 'Register',
					providerPrefix: 'Register',
					emailAction: 'register',
					submitLabel: 'Register',
					passwordAutoComplete: 'new-password'
			  }
			: {
					title: 'Sign In',
					providerPrefix: 'Sign in',
					emailAction: 'sign in',
					submitLabel: 'Sign In',
					passwordAutoComplete: 'current-password'
			  };

	return (
		<FormContainer>
			<h1 className="text-light mb-20">{formSettings.title}</h1>
			{Object.values(providers).map(provider => (
				<div key={provider.name} className="mb-10">
					{provider.name === 'Credentials' && (
						<>
							<div className="hr">
								<div className="hr__text">
									or {formSettings.emailAction} with email
								</div>
							</div>
							<form
								method="post"
								action="/api/auth/callback/credentials"
							>
								{type === 'register' && (
									<FormGroup>
										<label htmlFor="name">Name</label>
										<Input
											type="text"
											name="name"
											placeholder="Your name"
											required
										/>
									</FormGroup>
								)}
								<FormGroup>
									<label htmlFor="email">Email address</label>
									<Input
										type="email"
										name="email"
										placeholder="name@email.com"
										required
									/>
								</FormGroup>
								<FormGroup>
									<label htmlFor="password">Password</label>
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
										autoComplete={
											formSettings.passwordAutoComplete
										}
										required
									/>
								</FormGroup>
								{type === 'signin' && (
									<p className="text-sm mb-20">
										<Link href="/auth/forgotPassword">
											Forgot password?
										</Link>
									</p>
								)}
								<FormGroup>
									<input
										name="csrfToken"
										type="hidden"
										defaultValue={csrfToken}
									/>
									<input
										name="authType"
										type="hidden"
										defaultValue={type}
									/>
									{error && <ErrorMessage errorId={error} />}
									<Button type="submit" primary>
										{formSettings.submitLabel}
									</Button>
								</FormGroup>
								{type === 'register' && (
									<p className="text-sm text-center">
										Already a member?{' '}
										<Link href="/auth/signin">Sign In</Link>
									</p>
								)}
								{type === 'signin' && (
									<p className="text-sm text-center">
										Not a member yet?{' '}
										<Link href="/auth/register">
											Register
										</Link>
									</p>
								)}
							</form>
						</>
					)}
					{provider.name !== 'Credentials' && (
						<Button
							onClick={() => signIn(provider.id)}
							provider={provider.name}
						>
							{formSettings.providerPrefix} with {provider.name}
						</Button>
					)}
				</div>
			))}
		</FormContainer>
	);
}
