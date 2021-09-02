import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';

export default function Layout({ meta, children }) {
	return (
		<>
			<Head>{meta && <title>{meta.title}</title>}</Head>
			<Nav>
				<Link href="/">Home</Link>
			</Nav>
			<Main>
				<Inner>{children}</Inner>
			</Main>
		</>
	);
}

const Nav = styled.nav`
	position: fixed;
	top: 0;
	width: 100%;
	padding: 15px;
	margin-bottom: 30px;
	z-index: 2;
`;

const Main = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 1;
`;

const Inner = styled.div`
	max-width: 1200px;
	padding: 0 15px;
	margin: 60px auto 0;
`;
