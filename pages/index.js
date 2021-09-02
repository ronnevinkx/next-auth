import { signIn, signOut, useSession, getSession } from 'next-auth/client';
import Link from 'next/link';
import styled from 'styled-components';
import User from '../models/User.model';
import { Button } from '../components/Button';

export default function Home({ session, users }) {
	// client side checking, so this will lead to flickering
	// const [session, loading] = useSession();

	/*
		when using useSession, this console.log will return undefined on the server,
		but gives us a user prop on the client
		
		when using getServerSideProps, this also gives us the user on the server and
		prevents flickering, but takes our page out of static generation
	*/
	// console.log('SESSION', session);

	return (
		<Container>
			{!session && (
				<>
					<h1 className="mb-20">Not signed in</h1>
					<p className="mb-20">
						<Button primary onClick={() => signIn()} notFullWidth>
							Sign In
						</Button>
					</p>
					<p>
						<Link href="/auth/register">Register</Link>
					</p>
				</>
			)}
			{session && (
				<>
					<h1 className="mb-20">Welcome, {session.user.name}</h1>
					{session.user.email && (
						<>
							<p className="mb-40">
								Signed in as: {session.user.email}
							</p>
							<h3 className="mb-20">Users</h3>
							<div className="mb-20">
								{users.map(user => (
									<p key={user._id}>
										{user.name} - {user.email}
									</p>
								))}
							</div>
						</>
					)}
					<p>
						<Button onClick={() => signOut()} notFullWidth>
							Sign Out
						</Button>
					</p>
				</>
			)}
		</Container>
	);
}

export async function getServerSideProps(context) {
	const session = await getSession(context);
	let users = [];

	if (session) {
		users = await User.find(
			{},
			'name email loginCount lastLoginAt createdAt'
		);
	}

	return {
		props: {
			meta: { title: 'Home' },
			session,
			users: JSON.parse(JSON.stringify(users))
		}
	};
}

const Container = styled.div`
	height: calc(100vh - 150px);
	max-width: 900px;
	margin: 0 auto;
	padding: 30px;
	border-radius: 30px;
	box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
	background: ${({ theme }) => theme.color.containerLightBg};

	a:hover {
		color: ${({ theme }) => theme.color.textHoverDark};
	}
`;
