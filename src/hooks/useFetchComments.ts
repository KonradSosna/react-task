import { useSnackbar } from 'notistack';
import { APIresponseComments } from '../utils/models';
import { Dispatch, SetStateAction } from 'react';

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

interface useFetchCommentsProps {
	setLoadingCom: (v: boolean) => void;
	setComments: Dispatch<SetStateAction<APIresponseComments[]>>;
	postIds: number[];
}

export const useFetchComments = ({
	setLoadingCom,
	setComments,
	postIds,
}: useFetchCommentsProps) => {
	const { enqueueSnackbar } = useSnackbar();

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
	return handleClick;
};
