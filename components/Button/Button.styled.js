import styled, { css } from 'styled-components';

const buttonStyles = css`
	font-family: ${({ theme }) => theme.font.family.default};
	font-size: ${({ theme }) => theme.font.size.xs};
	font-weight: bold;
	${({ notFullWidth }) => (!notFullWidth ? 'width: 100%;' : 'width: auto;')}
	cursor: pointer;
	color: ${({ theme }) => theme.color.primary};
	padding: 12px 25px;
	border: 1px solid #cdcfef;
	border-radius: 10px;
	transition: 0.2s all;
	background-color: ${({ theme }) => theme.color.white};
	background-repeat: no-repeat;
	background-position: 10px center;
	background-size: 20px;

	&:hover {
		background-color: ${({ theme }) => theme.button.hover.surface};
	}

	${({ provider }) =>
		provider === 'GitHub' && `background-image: url(/github.svg);`}

	${({ provider }) =>
		provider === 'Twitter' && `background-image: url(/twitter.svg);`}

	${({ provider }) =>
		provider === 'Google' &&
		`background-image: url(//d3nn82uaxijpm6.cloudfront.net/assets/website/landing-page/icon-google-d0e460839c4717a1dc562f7233331668a2674805b8b2df3eac5ec7fd2d6add46.svg);`}

	${({ provider }) =>
		provider === 'Facebook' &&
		css`
			color: ${({ theme }) => theme.color.white};
			border-color: ${({ theme }) => theme.button.special.fb.border};
			background-color: ${({ theme }) => theme.button.special.fb.surface};
			background-image: url(//d3nn82uaxijpm6.cloudfront.net/assets/website/landing-page/icon-facebook-9ddcb5e9f2a1950d462ad216d4955f16d576437de4312625c67895d42302a0a0.svg);

			&:hover {
				border-color: ${({ theme }) =>
					theme.button.special.fb.hover.border};
				background-color: ${({ theme }) =>
					theme.button.special.fb.hover.surface};
			}
		`}

	${({ primary }) =>
		primary &&
		css`
			border-color: ${({ theme }) => theme.button.primary.borderColor};
			background-color: ${({ theme }) =>
				theme.button.primary.backgroundColor};

			&:hover {
				border-color: ${({ theme }) =>
					theme.button.primary.hover.borderColor};
				background-color: ${({ theme }) =>
					theme.button.primary.hover.backgroundColor};
			}
		`}
`;

export const StyledAnchorButton = styled.a`
	${buttonStyles}
`;

export const StyledButton = styled.button`
	${buttonStyles}
`;
