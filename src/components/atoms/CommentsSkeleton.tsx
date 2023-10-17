import { Card, CardContent, Grid, Skeleton, Typography } from '@mui/material';
import { FC, memo } from 'react';
import { CommentsSkeletonProps } from './types';

export const CommentsSkeleton: FC<CommentsSkeletonProps> = memo(
	({ postIds }) => {
		return postIds.map((postId) => (
			<Grid
				item
				xs={4}
				key={postId}
				sx={{
					background: '#333',
					padding: ' 30px',
				}}
			>
				<Typography fontWeight={700}>Comment</Typography>
				<Card>
					<CardContent style={{ padding: 'unset', margin: 'unset' }}>
						<Skeleton variant="rectangular" width={365} height={270} />
					</CardContent>
				</Card>
			</Grid>
		));
	}
);
