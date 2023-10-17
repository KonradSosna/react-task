export interface APIresponsePosts {
	ID: number;
	title: string;
	content: string;
	date: string;
	author: {
		avatar_URL: string;
		first_name: string;
		last_name: string;
	};
}

export interface APIresponseComments {
	ID: number;
	content: string;
	date: string;
	author: {
		avatar_URL: string;
		name: string;
	};
}

export const DATE_FORMAT = 'dd/mm/yyyy';
