import type { Song, Theme } from "../types";
type Props = {
	song: Song;
	onBack: () => void;
	theme: Theme;
};

function SongViewer({ song, onBack, theme }: Props) {
	const sortedSections = [...song.sections].sort(
		(a, b) => a.sort_index - b.sort_index,
	);
	return (
		<div className="animate-fade-in">
			<button
				onClick={onBack}
				className={`mb-8 flex items-center gap-2 ${theme.foreground} hover:text-foreground transition-colors cursor-pointer`}
			>
				<svg
					className="w-5 h-5"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M15 19l-7-7 7-7"
					/>
				</svg>
				Volver a la búsqueda
			</button>
			<div className={`text-center ${theme.foreground}`}>
				<h1 className="text-3xl font-bold mb-2">
					{song.number} - {song.title}
				</h1>
				<div className="mt-8 text-2xl leading-loose">
					{sortedSections.map((section, index) => (
						<div key={index} className="mb-6">
							<p className="font-semibold italic mb-2">
								{section.section_type === "chorus"
									? "Coro"
									: `Estrofa ${section.sort_index}`}
							</p>
							<pre className="whitespace-pre-wrap font-sans">
								{section.content.trim()}
							</pre>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default SongViewer;
