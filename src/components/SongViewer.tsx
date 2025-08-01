import { useEffect, useState } from "react";
import type { Song, Theme } from "../types";
type Props = {
	song: Song;
	onBack: () => void;
	theme: Theme;
	presentationMode: boolean;
};

function SongViewer({ song, onBack, theme, presentationMode }: Props) {
	const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

	const scrollUp = () => {
		setCurrentSectionIndex((prev) => Math.max(prev - 1, 0));
	};

	const scrollDown = () => {
		setCurrentSectionIndex((prev) =>
			Math.min(prev + 1, song.sections.length - 1),
		);
	};

	useEffect(() => {
		if (!presentationMode) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "ArrowUp" && currentSectionIndex > 0) {
				setCurrentSectionIndex((i) => i - 1);
			} else if (
				e.key === "ArrowDown" &&
				currentSectionIndex < song.sections.length - 1
			) {
				setCurrentSectionIndex((i) => i + 1);
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [presentationMode, currentSectionIndex, song.sections.length]);

	useEffect(() => {
		setCurrentSectionIndex(0); // reset when song changes
	}, [song]);

	return (
		<div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-8">
			{!presentationMode && (
				<button
					onClick={onBack}
					className={`mb-6 cursor-pointer ${theme.foreground}`}
				>
					← Volver a la búsqueda
				</button>
			)}
			{/* <button
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
			</button> */}
			<div className={`text-center max-w-4xl w-full ${theme.foreground}`}>
				{!presentationMode && (
					<h2
						className={`text-3xl font-bold mb-4 ${theme.foreground}`}
					>
						{song.number} - {song.title}
					</h2>
				)}
				{presentationMode ? (
					<>
						<p className="font-semibold italic mb-2">
							{song.sections[currentSectionIndex]
								?.section_type === "chorus"
								? "Coro"
								: `Estrofa ${song.sections[currentSectionIndex]?.sort_index}`}
						</p>
						<pre className="whitespace-pre-wrap text-3xl md:text-5xl font-semibold leading-relaxed text-center">
							{song.sections[currentSectionIndex]?.content}
						</pre>
					</>
				) : (
					song.sections.map((section, idx) => (
						<>
							<p className="font-semibold italic mb-2">
								{section.section_type === "chorus"
									? "Coro"
									: `Estrofa ${section.sort_index}`}
							</p>
							<pre
								key={idx}
								className="whitespace-pre-wrap mb-6 text-lg leading-relaxed"
							>
								{section.content}
							</pre>
						</>
					))
				)}
				{/* <div className="mt-8 text-2xl leading-loose">
					{sortedSections.map((section, index) => (
						<div
							key={index}
							className={
								presentationMode
									? "flex flex-col justify-center items-center min-h-screen px-4 py-6"
									: ""
							}
						>
							<p className="font-semibold italic mb-2">
								{section.section_type === "chorus"
									? "Coro"
									: `Estrofa ${section.sort_index}`}
							</p>
							<pre
								className={`whitespace-pre-wrap font-sans ${
									presentationMode
										? "text-2xl md:text-4xl lg:text-5xl leading-loose text-center font-semibold"
										: "text-lg leading-relaxed"
								}`}
							>
								{section.content.trim()}
							</pre>
						</div>
					))}
				</div> */}
			</div>
			{presentationMode && (
				<div className="fixed bottom-6 right-4 flex flex-col space-y-3 sm:hidden z-50">
					<button
						onClick={scrollUp}
						className="bg-white/80 hover:bg-white text-black rounded-full p-3 shadow-lg backdrop-blur"
						aria-label="Sección anterior"
					>
						⬆️
					</button>
					<button
						onClick={scrollDown}
						className="bg-white/80 hover:bg-white text-black rounded-full p-3 shadow-lg backdrop-blur"
						aria-label="Siguiente sección"
					>
						⬇️
					</button>
				</div>
			)}
		</div>
	);
}

export default SongViewer;
