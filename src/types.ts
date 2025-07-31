export type Song = {
	number: number;
	title: string;
	sections: Array<{
		section_type: string;
		sort_index: number;
		content: string;
	}>;
};

export type ThemeKey = "light" | "dark" | "space";

export type Theme = {
	name: string;
	background: string;
	foreground: string;
	placeholder: string;
	li: string;
	liHover: string;
};
