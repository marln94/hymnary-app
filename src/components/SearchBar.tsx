import type { Theme } from "../types";

type Props = {
	value: string;
	onChange: (value: string) => void;
	theme: Theme;
};

function SearchBar({ value, onChange, theme }: Props) {
	return (
		<div className="relative">
			<input
				type="text"
				placeholder="Buscar por título, número o letra..."
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className={`w-full p-4 pr-10 text-lg bg-input border border-border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none transition-colors ${theme.foreground} ${theme.placeholder}`}
			/>
			<svg
				className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 ${theme.foreground}`}
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
				/>
			</svg>
		</div>
	);
}

export default SearchBar;
