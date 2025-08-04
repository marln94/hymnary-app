import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import type { Song, Theme } from "../types";
import { ArrowUp, ArrowDown, ArrowLeft } from "lucide-react";

type Props = {
	song: Song;
	onBack: () => void;
	theme: Theme;
	presentationMode: boolean;
};

function SongViewer({ song, onBack, theme, presentationMode }: Props) {
	const [currentLine, setCurrentLine] = useState(0);
	const scrollRef = useRef<HTMLDivElement>(null);

	const allLines = useMemo(
		() =>
			song.sections
				.flatMap((section) => {
					const sectionTitle =
						section.section_type === "chorus"
							? "Coro"
							: `Estrofa ${section.sort_index}`;
					return [
						{ type: "section", content: sectionTitle },
						...section.content.split("\n").map((line) => ({
							type: "lyric",
							content: line,
						})),
					];
				})
				.filter((line) => line.content.trim() !== ""),
		[song.sections],
	);

	const scrollToLine = (lineNumber: number) => {
		if (scrollRef.current) {
			const lineElements = scrollRef.current.children;
			if (lineElements[lineNumber]) {
				const line = lineElements[lineNumber] as HTMLElement;
				scrollRef.current.scrollTop =
					line.offsetTop -
					scrollRef.current.offsetHeight / 2 +
					line.offsetHeight / 2;
			}
		}
	};

	const scrollUp = useCallback(() => {
		const prevLine = Math.max(currentLine - 1, 0);
		setCurrentLine(prevLine);
		scrollToLine(prevLine);
	}, [currentLine]);

	const scrollDown = useCallback(() => {
		const nextLine = Math.min(currentLine + 1, allLines.length - 1);
		setCurrentLine(nextLine);
		scrollToLine(nextLine);
	}, [currentLine, allLines]);

	useEffect(() => {
		if (!presentationMode) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "ArrowUp") {
				e.preventDefault();
				scrollUp();
			} else if (e.key === "ArrowDown") {
				e.preventDefault();
				scrollDown();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [presentationMode, currentLine, allLines.length, scrollUp, scrollDown]);

	useEffect(() => {
		setCurrentLine(0);
		if (scrollRef.current) {
			scrollRef.current.scrollTop = 0;
		}
	}, [song, presentationMode]);

	const handleScroll = () => {
		if (scrollRef.current) {
			const { scrollTop, offsetHeight } = scrollRef.current;
			const lineElements = scrollRef.current.children;
			const containerCenter = scrollTop + offsetHeight / 2;

			let closestLine = 0;
			let minDistance = Infinity;

			for (let i = 0; i < lineElements.length; i++) {
				const line = lineElements[i] as HTMLElement;
				const lineCenter = line.offsetTop + line.offsetHeight / 2;
				const distance = Math.abs(containerCenter - lineCenter);

				if (distance < minDistance) {
					minDistance = distance;
					closestLine = i;
				}
			}
			setCurrentLine(closestLine);
		}
	};

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
				className={`text-center w-full pt-4 sm:pt-0 ${theme.foreground}`}
			>
				{!presentationMode && (
					<div
						className={`text-3xl font-bold mb-4 ${theme.foreground}`}
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
					<div
						ref={scrollRef}
						onScroll={handleScroll}
						className="lyrics-container"
					>
						{allLines.map((line, index) => {
							if (line.type === "section") {
								return (
									<p
										key={index}
										className="font-semibold mt-8 md:text-xl opacity-50"
									>
										{line.content}
									</p>
								);
							}
							return (
								<p
									key={index}
									className={`lyrics-line text-3xl md:text-9xl leading-relaxed ${
										index === currentLine
											? "lyrics-line-active"
											: ""
									}`}
								>
									{line.content || "\u00A0"}
								</p>
							);
						})}
					</div>
				) : (
					song.sections.map((section, idx) => (
						<div key={idx}>
							<p className="font-semibold opacity-50 -mb-6">
								{section.section_type === "chorus"
									? "Coro"
									: `Estrofa ${section.sort_index}`}
							</p>
							<pre className="whitespace-pre-wrap mb-8 text-lg md:text-2xl leading-relaxed">
								{section.content}
							</pre>
						</div>
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
