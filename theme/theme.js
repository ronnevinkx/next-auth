import { createGlobalStyle } from 'styled-components';

export const theme = {
	font: {
		family: {
			default: 'Helvetica, Arial, sans-serif'
		},
		size: {
			xxs: '12px',
			xs: '14px'
		}
	},
	button: {
		primary: {
			borderColor: '#41d27a',
			backgroundColor: '#41d27a',
			hover: {
				borderColor: '#36b96a',
				backgroundColor: '#36b96a'
			}
		},
		special: {
			fb: {
				border: '#3b5998',
				surface: '#3b5998',
				hover: {
					border: '#2d4373',
					surface: '#2d4373'
				}
			}
		},
		hover: {
			surface: '#cdcfef'
		}
	},
	color: {
		primary: '#202244',
		textColor: '#51537c',
		link: '#41d27a',
		textHoverLight: '#ffffff',
		textHoverDark: '#202244',
		error: '#ec1044',
		inputBorder: '#282a4f',
		inputActiveBorder: '#41d27a',
		inputBg: '#282a4f',
		containerLightBg: '#ffffff',
		containerDarkBg: '#202244',
		backgroundColor: '#32365b',
		white: '#ffffff',
		black: '#000000'
	},
	spacing: {
		sm: '20px',
		md: '30px'
	}
};

export const GlobalStyle = createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		border: none;
		outline: none;
		appearance: none;
		box-sizing: border-box;
	}

	html, body {
		width: 100%;
	}

	body {
		font-family: ${({ theme }) => theme.font.family.default};
		color: ${({ theme }) => theme.color.textColor};
		line-height: 1.2;
		background: ${({ theme }) => theme.color.backgroundColor};
	}

	h1,
	h2,
	h3,
	h4 {
		color: ${({ theme }) => theme.color.primary};
	}

	a {
		color: ${({ theme }) => theme.color.link};
	}

	a:hover {
		color: ${({ theme }) => theme.color.textHoverLight};
	}

	label {
		display: block;
		font-size: 14px;
		margin-bottom: 5px;
	}

	::placeholder {
		color: ${({ theme }) => theme.color.textColor};
		opacity: 1;
	}
`;
