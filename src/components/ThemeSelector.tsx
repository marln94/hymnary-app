// src/components/ThemeSelector.tsx
import { useEffect, useState } from "react";
import { Paintbrush } from "lucide-react";
import { themes } from "../themes";
import type { ThemeKey } from "../types";

type Props = {
	activeThemeKey: ThemeKey;
	onChange: (value: ThemeKey) => void;
};

function ThemeSelector({ activeThemeKey, onChange }: Props) {
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const stored = (localStorage.getItem("theme") as ThemeKey) || "light";
		onChange(stored);
	}, [onChange]);

	function handleChange(selected: ThemeKey) {
		onChange(selected);
		localStorage.setItem("theme", selected);
		setIsOpen(false); // Opcional: cerrar después de seleccionar
	}

	return (
		<div className="fixed bottom-4 right-4 z-50">
			<div className="relative flex flex-col items-center gap-2">
				{/* Círculos de tema */}
				<div
					className={`mb-2 flex flex-col-reverse items-end gap-2 transition-all duration-300 ${
						isOpen
							? "opacity-100 scale-100"
							: "opacity-0 scale-0 pointer-events-none"
					}`}
				>
					{(Object.keys(themes) as ThemeKey[]).map((key) => (
						<button
							key={key}
							onClick={() => handleChange(key)}
							className={`w-9 h-9 rounded-full transition-all cursor-pointer ${
								themes[key].background
							} ${
								activeThemeKey === key
									? `ring-2 ring-primary ring-offset-2 ring-offset-background`
									: `ring-1 ${themes[activeThemeKey].themeRingBorderColor} ring-offset-1 ring-offset-transparent`
							}`}
							aria-label={`Cambiar al tema ${themes[key].name}`}
						/>
					))}
				</div>

				{/* Botón FAB */}
				<button
					onClick={() => setIsOpen((prev) => !prev)}
					className="bg-white/80 p-4 rounded-full shadow-lg hover:scale-105 transition-transform cursor-pointer"
					aria-label="Seleccionar tema"
				>
					<Paintbrush size={20} />
				</button>
			</div>
		</div>
	);
}

export default ThemeSelector;
