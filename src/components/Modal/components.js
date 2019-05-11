import styled from 'styled-components';

export const Wrapper = styled.div`
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.7);
	position: absolute;
	display: flex;
	align-items: center;

	@keyframes fadeIn {
		0% { opacity: 0; }
		100% { opacity: 1; }
	}

	animation: fadeIn ${props => props.speed || 0.6}s;
	z-index: 999;
`;

export const ModalContent = styled.div`
	width: 50%;
	max-width: 700px;
	min-height: 100px;
	margin: 0 auto;
	background-color: white;
	border-radius: 4px;
	display: flex;
	flex-direction: column;
`;

export const ModalHeaderArea = styled.div`
	border-bottom: 1px solid black;
	padding: 0 10px;
	height: 30px;
	font-weight: 900;
	display: flex;
	align-items: center;
`;

export const ModalMainContent = styled.div`
	height: 100%;
	min-height: 60px;
	padding: 10px 10px;
`;

export const ModalContentRow = styled.div`
	display: block;
	padding: 5px;
`;