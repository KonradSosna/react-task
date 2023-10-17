import { FC, memo } from 'react';
import { FetchButtonProps } from './types';
import { StyledLoadingButton } from './styles';

export const FetchButton: FC<FetchButtonProps> = memo(
	({ handleClick, loading }) => {
		return (
			<StyledLoadingButton
				variant="outlined"
				loading={loading}
				onClick={() => handleClick()}
			>
				fetch comments
			</StyledLoadingButton>
		);
	}
);
