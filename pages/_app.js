import '../styles/styles.scss';
import { Provider as AuthProvider } from 'next-auth/client';
import { ThemeProvider } from 'styled-components';
import { theme, GlobalStyle } from '../theme/theme';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }) {
	return (
		<AuthProvider session={pageProps.session}>
			<ThemeProvider theme={theme}>
				<GlobalStyle />
				<Layout meta={pageProps.meta}>
					<Component {...pageProps} />
				</Layout>
			</ThemeProvider>
		</AuthProvider>
	);
}

export default MyApp;
