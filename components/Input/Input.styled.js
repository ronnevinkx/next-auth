import styled, { css } from 'styled-components';

export const StyledInput = styled.input(
	({ flex, type, round, contained }) => css`
		display: block;
		width: 100%;
		${flex && 'flex: 1;'}
		font-family: ${({ theme }) => theme.font.family.default};
		font-size: ${({ theme }) => theme.font.size.xs};
		color: ${({ theme }) => theme.color.white};
		border: 1px solid ${({ theme }) => theme.color.inputBorder};
		padding: 10px 8px;
		margin-top: 6px;
		border-radius: ${round ? '20px' : '10px'};
		${contained &&
		`
			padding: 12px;
			margin: 0 15px;
		`}
		${type === 'email' && 'text-transform: lowercase;'}
		background: ${({ theme }) => theme.color.inputBg};

		:-webkit-autofill,
		:-webkit-autofill:hover,
		:-webkit-autofill:focus {
			border-color: ${({ theme }) => theme.color.inputActiveBorder};
			-webkit-text-fill-color: ${({ theme }) => theme.color.white};
			/* -webkit-box-shadow: 0 0 0px 1000px #41d27a inset; // background color for autofill */
			transition: background-color 5000s ease-in-out 0s;
		}
	`
);
