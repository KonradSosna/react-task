import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';

const useFetchPosts = <T>(): {
	data: T[];
	loading: boolean;
	isError: boolean;
} => {
	const { enqueueSnackbar } = useSnackbar();

	const [data, setData] = useState(Array<T>);
	const [isError, setIsError] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Promise.all([
		// 	fetch(
		// 		'https://public-api.wordpress.com/rest/v1.1/sites/en.blog.wordpress.com/posts/7'
		// 	),
		// 	fetch(
		// 		'https://public-api.wordpress.com/rest/v1.1/sites/en.blog.wordpress.com/posts/7'
		// 	),
		// 	fetch(
		// 		'https://public-api.wordpress.com/rest/v1.1/sites/en.blog.wordpress.com/posts/53236'
		// 	),
		// ]);
		// I could use this approach to fetch 3 posts, but this is not a good practice,
		// because if one of the endpoints fails, the whole request will fail

		fetch(
			'https://public-api.wordpress.com/rest/v1.1/sites/en.blog.wordpress.com/posts/?number=3'
		)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setData(data.posts as Array<T>);
				setLoading(false);
			})
			.catch((error) => {
				setIsError(true);
				enqueueSnackbar(`Fetch error: ${error}`, { variant: 'error' });
				setLoading(false);
			});
	}, []);
	return { data, loading, isError };
};

export default useFetchPosts;
