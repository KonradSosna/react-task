import { Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import { format } from 'date-fns';
import { DATE_FORMAT } from '../../utils/models';
import { FC, memo } from 'react';
import { PostsProps } from './types';
import { GridStyle } from './styles';

export const Posts: FC<PostsProps> = memo(({ posts }) => {
	return posts?.map((post) => (
		<Grid item container rowGap={2} xs={4} key={post.ID} sx={GridStyle}>
			<CardHeader
				sx={{ '& .MuiCardHeader-title': { fontSize: '20px' } }}
				title={post.title}
			/>
			<Card style={{ overflow: 'auto' }}>
				<CardContent style={{ maxHeight: '500px' }}>
					<Typography
						color="textSecondary"
						gutterBottom
						dangerouslySetInnerHTML={{ __html: post.content }}
					/>
				</CardContent>
			</Card>

			<Grid item>
				<img src={post?.author?.avatar_URL} />
				<Typography
					fontWeight={700}
				>{` ${post?.author?.first_name} ${post?.author?.last_name}`}</Typography>
				<Typography>{format(new Date(post.date), DATE_FORMAT)}</Typography>
			</Grid>
		</Grid>
	));
});
