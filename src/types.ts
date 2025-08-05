export type Section = {
	section_type: "chorus" | "verse";
	sort_index: number;
	content: string;
};

export type Song = {
	number: number;
	title: string;
	sections: Section[];
};

export type ThemeKey = "light" | "dark" | "space";

export type Theme = {
	name: string;
	background: string;
	foreground: string;
	placeholder: string;
	li: string;
	liHover: string;
	liHighlight: string;
	themeRingBorderColor: string;
	themeRingBackground: string;
	themeRingForeground: string;
	gradientStops: string;
};
