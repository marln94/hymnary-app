// src/components/ThemeSelector.tsx
import { useEffect, useState } from "react";

type ThemeKey = "light" | "dark" | "sepia";

const themes: Record<ThemeKey, { name: string; class: string }> = {
	light: {
		name: "Claro",
		class: "bg-white text-black",
	},
	dark: {
		name: "Oscuro",
		class: "bg-black text-white",
	},
	sepia: {
		name: "Sepia",
		class: "bg-sepia text-sepiaText",
	},
};

function ThemeSelector() {
	const [theme, setTheme] = useState<ThemeKey>("light");

	useEffect(() => {
		const stored = (localStorage.getItem("theme") as ThemeKey) || "light";
		setTheme(stored);
		applyTheme(stored);
	}, []);

	function applyTheme(selected: ThemeKey) {
		document.documentElement.className = "";
		const classes = themes[selected].class.split(" ");
		classes.forEach((cls) => document.documentElement.classList.add(cls));
	}

	function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
		const selected = e.target.value as ThemeKey;
		setTheme(selected);
		localStorage.setItem("theme", selected);
		applyTheme(selected);
	}

	return (
		<div className="mb-4">
			<label className="mr-2 font-medium">Tema:</label>
			<select
				value={theme}
				onChange={handleChange}
				className="p-2 border rounded"
			>
				{Object.entries(themes).map(([key, t]) => (
					<option key={key} value={key}>
						{t.name}
					</option>
				))}
			</select>
		</div>
	);
}

export default ThemeSelector;
