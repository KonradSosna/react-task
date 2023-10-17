export interface FetchButtonProps {
	handleClick: () => void;
	loading: boolean;
}

export interface CommentsSkeletonProps {
	postIds: number[];
}
