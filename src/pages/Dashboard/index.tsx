import { CircularProgress, Grid } from '@mui/material';
import useFetchPosts from '../../hooks/useFetchPosts.ts';
import { APIresponseComments, APIresponsePosts } from '../../utils/models.ts';
import { useState } from 'react';
import { Comments } from '../../components/organisms/Comments.tsx';
import { Posts } from '../../components/organisms/Posts.tsx';
import { useSnackbar } from 'notistack';
import { FetchButton } from '../../components/atoms/FetchButton.tsx';

export const Dasboard = () => {
	// This component is a logic container
	const [comments, setComments] = useState<APIresponseComments[]>([]);
	const [loadingCom, setLoadingCom] = useState(false);

	const { enqueueSnackbar } = useSnackbar();

	const { data: posts, loading, isError } = useFetchPosts<APIresponsePosts>();
	const postIds = posts.map((post) => post.ID);

	// One way to solve the sequence calls would be to create separate component for every item.
	// First component would render second component only after data is fetched successfuly.
	// Then second component would fetch data and then render 3th component.

	// Second way is to fetch data in sequence and then render all components. But this is not good solution
	// because it is not scalable. If we have 100 posts, we would have to write 100 fetch calls.

	// const handleClick = async () => {
	// 	setLoadingCom(true);
	// 	await fetch(
	// 		`https://public-api.wordpress.com/rest/v1.1/sites/en.blog.wordpress.com/posts/${postIds[0]}/replies/?number=1`
	// 	)
	// 		.then((res) => res.json())
	// 		.then((result) => {
	// 			setComments([result.comments[0]]);
	// 			return fetch(
	// 				`https://public-api.wordpress.com/rest/v1.1/sites/en.blog.wordpress.com/posts/${postIds[1]}/replies/?number=1`
	// 			);
	// 		})
	// 		.then((res) => res.json())
	// 		.then((result) => {
	// 			setComments((prev) => [...prev, result.comments[0]]);
	// 			return fetch(
	// 				`https://public-api.wordpress.com/rest/v1.1/sites/en.blog.wordpress.com/posts/${postIds[2]}/replies/?number=1`
	// 			);
	// 		})
	// 		.then((res) => res.json())
	// 		.then((result) => {
	// 			setComments((prev) => [...prev, result.comments[0]]);
	// 			setLoadingCom(false);
	// 		})
	// 		.catch((error) => {
	// 			enqueueSnackbar(`Fetch error: ${error}`, { variant: 'error' });
	// 		});
	// };

	// Best solution is to use for loop to fetch data in sequence.

	const handleClick = async () => {
		setLoadingCom(true);
		setComments([]);

		for (let i = 0; i < postIds.length; i++) {
			await fetch(
				`https://public-api.wordpress.com/rest/v1.1/sites/en.blog.wordpress.com/posts/${postIds[i]}/replies/?number=1`
			)
				.then((res) => res.json())
				.then((result) => {
					setComments((prev) => [...prev, result.comments[0]]);
				})
				.catch((error) => {
					enqueueSnackbar(`Comment ${i + 1} fetch error: ${error}`, {
						variant: 'error',
					});
				});
		}
		setLoadingCom(false);
	};

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
