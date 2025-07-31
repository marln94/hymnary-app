import type { Theme, ThemeKey } from "./types";

export const themes: Record<ThemeKey, Theme> = {
	light: {
		name: "Claro",
		background: "bg-stone-50",
		foreground: "text-stone-900",
		placeholder: "placeholder-stone-400",
	},
	dark: {
		name: "Oscuro",
		background: "bg-stone-900",
		foreground: "text-stone-50",
		placeholder: "placeholder-stone-500",
	},
	space: {
		name: "Espacio",
		background: "bg-violet-900",
		foreground: "text-violet-50",
		placeholder: "placeholder-violet-400",
	},
};
