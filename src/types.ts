export type Song = {
	number: number;
	title: string;
	sections: Array<{
		section_type: string;
		sort_index: number;
		content: string;
	}>;
};
