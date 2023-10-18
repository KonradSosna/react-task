import { CircularProgress, Grid } from '@mui/material';
import useFetchPosts from '../../hooks/useFetchPosts.ts';
import { APIresponseComments, APIresponsePosts } from '../../utils/models.ts';
import { useState } from 'react';
import { Comments } from '../../components/organisms/Comments.tsx';
import { Posts } from '../../components/organisms/Posts.tsx';
import { FetchButton } from '../../components/atoms/FetchButton.tsx';
import { useFetchComments } from '../../hooks/useFetchComments.ts';

export const Dasboard = () => {
	// This component is a logic container
	const [comments, setComments] = useState<APIresponseComments[]>([]);
	const [loadingCom, setLoadingCom] = useState(false);

	const { data: posts, loading, isError } = useFetchPosts<APIresponsePosts>();
	const postIds = posts.map((post) => post.ID);

	const handleClick = useFetchComments({ setComments, setLoadingCom, postIds });

	if (loading) {
		return <CircularProgress color="inherit" />;
	}
	if (isError) {
		return <div>Oops! Error occured while fetching posts</div>;
	}

	return (
		<Grid container spacing={2} justifyContent="center">
			<Grid item container>
				<Posts posts={posts} />
			</Grid>

			<Grid item>
				<FetchButton handleClick={handleClick} loading={loadingCom} />
			</Grid>

			<Grid item container justifyContent="center">
				<Comments
					comments={comments}
					loadingCom={loadingCom}
					postIds={postIds}
				/>
			</Grid>
		</Grid>
	);
};
