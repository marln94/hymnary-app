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
	const [suggestAction, setSuggestAction] = useState(true);

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

	const scrollToLine = useCallback((lineNumber: number) => {
		if (scrollRef.current) {
			const lineElements = scrollRef.current.children;
			if (lineElements[lineNumber]) {
				const line = lineElements[lineNumber] as HTMLElement;

				// Use scrollIntoView for more reliable centering
				line.scrollIntoView({ block: "center", behavior: "smooth" });
			}
		}
	}, []);

	const scrollUp = useCallback(() => {
		let prevLine = Math.max(currentLine - 1, 0);
		if (allLines[prevLine].type === "section" && prevLine > 0) {
			prevLine--;
		}
		setCurrentLine(prevLine);
		scrollToLine(prevLine);
		setSuggestAction(false);
	}, [allLines, currentLine, scrollToLine]);

	const scrollDown = useCallback(() => {
		let nextLine = Math.min(currentLine + 1, allLines.length - 1);
		if (
			allLines[nextLine].type === "section" &&
			nextLine < allLines.length - 1
		) {
			nextLine++;
		}
		setCurrentLine(nextLine);
		scrollToLine(nextLine);
		setSuggestAction(false);
	}, [currentLine, allLines, scrollToLine]);

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
	}, [presentationMode, scrollUp, scrollDown]);

	useEffect(() => {
		setCurrentLine(0);
		if (scrollRef.current) {
			scrollRef.current.scrollTop = 0;
		}
	}, [song, presentationMode]);

	return (
		<div
			className={`relative min-h-screen flex flex-col items-center justify-center ${!presentationMode ? "py-4 sm:py-8" : ""}`}
		>
			{!presentationMode && (
				<div
					className={`fixed top-4 left-4 z-50 rounded-full opacity-80 ${theme.background}`}
				>
					<button
						onClick={onBack}
						className={`p-2 cursor-pointer ${theme.foreground}`}
						aria-label="Volver a la búsqueda"
					>
						<ArrowLeft size={22} />
					</button>
				</div>
			)}
			<div
				className={`text-center w-full pt-4 sm:pt-0 ${theme.foreground}`}
			>
				{!presentationMode && (
					<header
						className={`text-3xl font-bold my-10 ${theme.foreground}`}
					>
						<h2 className="mb-4">{song.number}</h2>
						<h2>{song.title}</h2>
					</header>
				)}
				{presentationMode ? (
					<div className="relative">
						<div
							ref={scrollRef}
							className="lyrics-container py-[20vh] sm:py-[50vh]"
						>
							{allLines.map((line, index) => {
								if (line.type === "section") {
									return (
										<p
											key={index}
											className="font-semibold mt-8 md:text-xl opacity-20"
										>
											{line.content}
										</p>
									);
								}
								return (
									<p
										key={index}
										className={`text-3xl  md:text-9xl leading-relaxed opacity-20 font-bold transition-opacity ${
											index === currentLine
												? "opacity-100"
												: ""
										}`}
									>
										{line.content || "\u00A0"}
									</p>
								);
							})}
						</div>
						<div
							className={`absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t ${theme.gradientStops}`}
						/>
					</div>
				) : (
					song.sections.map((section, idx) => (
						<div key={idx}>
							<p className="font-semibold opacity-50 -mb-6">
								{section.section_type === "chorus"
									? "Coro"
									: `Estrofa ${section.sort_index}`}
							</p>
							<pre className="mb-10 text-xl md:text-3xl leading-relaxed font-sans whitespace-pre-wrap">
								{section.content}
							</pre>
						</div>
					))
				)}
			</div>
			{presentationMode && (
				<div className="fixed bottom-4 flex flex-row gap-2 z-50">
					<button
						onClick={scrollUp}
						className={`rounded-full p-3 shadow-lg backdrop-blur opacity-80 cursor-pointer ${theme.themeRingBackground}`}
						aria-label="Sección anterior"
					>
						<ArrowUp
							size={20}
							className={theme.themeRingForeground}
						/>
					</button>
					<button
						onClick={scrollDown}
						className={`rounded-full p-3 shadow-lg backdrop-blur opacity-80 cursor-pointer ${theme.themeRingBackground} ${suggestAction ? "animate-bounce" : ""}`}
						aria-label="Siguiente sección"
					>
						<ArrowDown
							size={20}
							className={theme.themeRingForeground}
						/>
					</button>
				</div>
			)}
		</div>
	);
}

export default SongViewer;
