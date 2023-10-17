import { CardContent, styled } from '@mui/material';
import { LoadingButton } from '@mui/lab';

export const StyledCard = styled(CardContent)`
	height: '300px';
	display: 'flex';
	flex-direction: 'column';
	align-items: 'center';
	justify-content: 'center';
`;

export const StyledLoadingButton = styled(LoadingButton)(() => ({
	color: 'inherit',
	borderColor: '#fff',

	'& .MuiCircularProgress-root': {
		color: 'white',
	},

	'& .MuiDialog-paper': {
		width: '700px',
		alignItems: 'center',
	},

	'&:disabled': {
		border: '1px solid white',
	},

	'&:hover': {
		borderColor: '#fff',
		backgroundColor: 'rgba(125, 125, 125, 0.6)',
	},
}));
