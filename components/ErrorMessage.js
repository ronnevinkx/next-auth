import styled from 'styled-components';

const errors = {
	General: 'Please try a different account.',
	CredentialsSignin: 'Please check the details you provided are correct.',
	NoName: "There's no name associated with your social account. Please try a different method.",
	NoEmail:
		"We couldn't obtain an email address associated with your social account. Please try a different method.",
	FailedNewUser:
		"We couldn't create your account. Please try a different account.",
	InvalidEmail: 'Please enter a valid email address.',
	InvalidPassword: 'Your password should be at least 5 characters long.'
};

export default function ErrorMessage({ errorId }) {
	const error = errors[errorId];

	return <StyledErrorMessage>{error}</StyledErrorMessage>;
}

const StyledErrorMessage = styled.p`
	font-size: ${({ theme }) => theme.font.size.xs};
	color: ${({ theme }) => theme.color.error};
	margin-bottom: 15px;
`;
