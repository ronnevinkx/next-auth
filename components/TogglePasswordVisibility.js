import styled from 'styled-components';

export function TogglePasswordVisibility({ title, onClick, currentType }) {
	return (
		<StyledTogglePasswordVisibility
			title={title}
			onClick={onClick}
			currentType={currentType}
		/>
	);
}

const StyledTogglePasswordVisibility = styled.div`
	position: absolute;
	bottom: 0;
	right: 0;
	width: 40px;
	height: 38px;
	cursor: pointer;
	background-position: center;
	background-size: 15px;
	background-repeat: no-repeat;
	/* ${({ currentType }) =>
		currentType === 'password'
			? `background-image: url('/visible.svg');`
			: `background-image: url('/invisible.svg');`} */
	${({ currentType }) =>
		currentType === 'password'
			? `background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3Csvg version='1.1' id='Laag_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 17.5 11.9' style='enable-background:new 0 0 17.5 11.9;' xml:space='preserve'%3E%3Cstyle type='text/css'%3E.st0%7Bfill:%2351537C;%7D%3C/style%3E%3Cpath class='st0' d='M8.7,0C4.8,0,1.4,2.5,0,6c1.4,3.5,4.8,6,8.7,6s7.4-2.5,8.7-6C16.1,2.5,12.7,0,8.7,0z M8.7,9.9c-2.2,0-4-1.8-4-4 s1.8-4,4-4s4,1.8,4,4S10.9,9.9,8.7,9.9z M8.7,3.6c-1.3,0-2.3,1-2.3,2.4s1.1,2.4,2.4,2.4s2.4-1.1,2.4-2.4S10.1,3.6,8.7,3.6z'/%3E%3C/svg%3E");`
			: `background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 17.5 16.2' style='enable-background:new 0 0 17.5 16.2;' xml:space='preserve'%3E%3Cstyle type='text/css'%3E .st0%7Bfill:%2351537C;%7D .st1%7Bfill:%23FFFFFF;%7D%0A%3C/style%3E%3Cpath class='st0' d='M8.7,1.8c-3.9,0-7.3,2.4-8.8,6c1.9,4.8,7.3,7.2,12.2,5.3c2.4-1,4.4-2.9,5.3-5.3C16.1,4.2,12.6,1.8,8.7,1.8z M8.7,11.7c-2.2,0-4-1.8-4-4s1.8-4,4-4s4,1.8,4,4C12.7,9.9,10.9,11.7,8.7,11.7z M8.7,5.4c-1.3,0-2.4,1.1-2.4,2.4s1.1,2.4,2.4,2.4 s2.4-1.1,2.4-2.4l0,0C11.1,6.5,10.1,5.4,8.7,5.4C8.8,5.4,8.7,5.4,8.7,5.4z'/%3E%3Crect x='7.5' y='-1.2' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -3.6951 8.4163)' class='st0' width='1.6' height='19.8'/%3E%3Crect x='8.6' y='-2.3' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -2.5764 8.889)' class='st1' width='1.6' height='19.7'/%3E%3C/svg%3E%0A");`}
`;

export const togglePasswordInputType = (
	passwordInputType,
	setPasswordInputType
) => {
	const type = passwordInputType === 'password' ? 'text' : 'password';
	setPasswordInputType(type);
};
