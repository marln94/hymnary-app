import { useEffect, useState } from "react";
import type { Song, Theme } from "../types";
import { ArrowUp, ArrowDown, ArrowLeft } from "lucide-react";

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
		<div className="relative min-h-screen flex flex-col items-center justify-center py-4 sm:py-8">
			{!presentationMode && (
				<div className="fixed top-4 left-4 flex flex-col space-y-3 z-50">
					<button
						onClick={onBack}
						className={`mb-6 cursor-pointer ${theme.foreground}`}
						aria-label="Volver a la búsqueda"
					>
						<ArrowLeft size={30} />
					</button>
				</div>
			)}
			<div
				className={`text-center max-w-4xl w-full pt-4 sm:pt-0 ${theme.foreground}`}
			>
				{!presentationMode && (
					<div
						className={`text-3xl font-bold mb-4${theme.foreground}`}
					>
						<h2
							className={`text-3xl font-bold mb-4${theme.foreground}`}
						>
							{song.number}
						</h2>
						<h2
							className={`text-3xl font-bold mb-4${theme.foreground}`}
						>
							{song.title}
						</h2>
					</div>
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
			</div>
			{presentationMode && (
				<div className="fixed top-6 right-4 flex flex-col space-y-3 sm:hidden z-50">
					<button
						onClick={scrollUp}
						className="bg-white/50 hover:bg-white text-black rounded-full p-3 shadow-lg backdrop-blur"
						aria-label="Sección anterior"
					>
						<ArrowUp size={20} />
					</button>
					<button
						onClick={scrollDown}
						className="bg-white/50 hover:bg-white text-black rounded-full p-3 shadow-lg backdrop-blur"
						aria-label="Siguiente sección"
					>
						<ArrowDown size={20} />
					</button>
				</div>
			)}
		</div>
	);
}

export default SongViewer;
