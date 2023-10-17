import { Card, CardContent, Grid, Typography } from '@mui/material';
import { format } from 'date-fns';
import { FC, memo } from 'react';
import { DATE_FORMAT } from '../../utils/models';
import { CommentsSkeleton } from '../atoms/CommentsSkeleton';
import { EmptyComment } from '../atoms/EmptyComment';
import { CommentsProps } from './types';

export const Comments: FC<CommentsProps> = memo(
	({ comments, loadingCom, postIds }) => {
		if (loadingCom) {
			return <CommentsSkeleton postIds={postIds} />;
		}

		return (
			comments &&
			comments.map((comment) =>
				comment ? (
					<Grid
						item
						xs={4}
						key={comment.ID}
						sx={{
							background: '#333',
							padding: ' 30px',
						}}
					>
						<Typography fontWeight={700}>Comment</Typography>
						<Card>
							<CardContent style={{ maxHeight: '800px' }}>
								<Typography
									color="textSecondary"
									gutterBottom
									dangerouslySetInnerHTML={{ __html: comment.content }}
								/>

								<img src={comment.author?.avatar_URL} />
								<Typography fontWeight={700}>{comment.author?.name}</Typography>
								<Typography>
									{format(new Date(comment?.date), DATE_FORMAT)}
								</Typography>
							</CardContent>
						</Card>
					</Grid>
				) : (
					<EmptyComment />
				)
			)
		);
	}
);
