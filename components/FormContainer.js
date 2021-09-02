import styled from 'styled-components';

export const FormContainer = styled.div`
	max-width: 400px;
	margin: 0 auto 40px;
	padding: ${({ theme }) => theme.spacing.md};
	border-radius: 20px;
	background: ${({ theme }) => theme.color.containerDarkBg};

	@media screen and (max-width: 360px) {
		padding: ${({ theme }) => theme.spacing.sm};
	}
`;
