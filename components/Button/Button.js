import { StyledButton, StyledAnchorButton } from './Button.styled';

export function Button({
	href,
	backgroundColor,
	primary,
	notFullWidth = false,
	disabled,
	type = 'button',
	onClick,
	provider,
	children
}) {
	if (href) {
		return (
			<StyledAnchorButton
				href={href}
				backgroundColor={backgroundColor}
				primary={primary}
				notFullWidth={notFullWidth}
				disabled={disabled}
			>
				{children}
			</StyledAnchorButton>
		);
	}

	return (
		<StyledButton
			backgroundColor={backgroundColor}
			primary={primary}
			notFullWidth={notFullWidth}
			disabled={disabled}
			type={type}
			onClick={onClick}
			provider={provider}
		>
			{children}
		</StyledButton>
	);
}
