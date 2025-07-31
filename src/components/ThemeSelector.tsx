// src/components/ThemeSelector.tsx
import { useEffect } from "react";
import { themes } from "../themes";
import type { ThemeKey } from "../types";

type Props = {
	activeThemeKey: ThemeKey;
	onChange: (value: ThemeKey) => void;
};

function ThemeSelector({ activeThemeKey, onChange }: Props) {
	useEffect(() => {
		const stored = (localStorage.getItem("theme") as ThemeKey) || "light";
		onChange(stored);
	}, [onChange]);

	function handleChange(selected: ThemeKey) {
		onChange(selected);
		localStorage.setItem("theme", selected);
	}

	return (
		<div className="absolute top-4 right-4">
			<div className="flex items-center gap-2 rounded-full bg-card p-1">
				{(Object.keys(themes) as ThemeKey[]).map((key) => (
					<button
						key={key}
						onClick={() => handleChange(key)}
						className={`w-8 h-8 rounded-full transition-all ${
							themes[key].background
						} ${
							activeThemeKey === key
								? "ring-2 ring-primary ring-offset-2 ring-offset-background"
								: ""
						}`}
						aria-label={`Switch to ${themes[key].name} theme`}
					/>
				))}
			</div>
		</div>
	);
}

export default ThemeSelector;
