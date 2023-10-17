import { APIresponseComments, APIresponsePosts } from '../../utils/models';

export interface PostsProps {
	posts?: APIresponsePosts[];
}

export interface CommentsProps {
	comments?: APIresponseComments[];
	loadingCom: boolean;
	postIds: number[];
}
