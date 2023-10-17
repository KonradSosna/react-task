import { Card, Grid, Typography } from '@mui/material';
import { memo } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { StyledCard } from './styles';

export const EmptyComment = memo(() => {
	return (
		<Grid
			item
			xs={4}
			sx={{
				background: '#333',
				padding: ' 30px',
			}}
		>
			<Typography fontWeight={700}>Comment</Typography>
			<Card>
				<StyledCard>
					<Typography margin="20px 0">
						No comments yet. Be the first to comment on this post!
					</Typography>
					<SearchIcon fontSize="large" />
				</StyledCard>
			</Card>
		</Grid>
	);
});
