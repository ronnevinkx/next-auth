import { StyledInput } from './Input.styled';

export const Input = ({
	disabled,
	type = 'text',
	placeholder,
	id,
	name,
	value,
	autoComplete,
	onChange,
	round = false,
	flex = false,
	contained = false,
	required
}) => {
	return (
		<StyledInput
			disabled={disabled}
			type={type}
			placeholder={placeholder}
			id={id}
			name={name}
			value={value}
			autoComplete={autoComplete}
			onChange={onChange}
			round={round}
			flex={flex}
			contained={contained}
			required={required}
		/>
	);
};
