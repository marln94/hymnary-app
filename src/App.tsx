import { useEffect, useState, lazy, Suspense } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Maximize2, Minimize2 } from "lucide-react";

import "./App.css";
import type { Song, Theme, ThemeKey } from "./types";
import { themes } from "./themes";

import SearchBar from "./components/SearchBar";
import ThemeSelector from "./components/ThemeSelector";
import Loader from "./components/Loader";

import { useFuse } from "./hooks/useFuse";

const SongViewer = lazy(() => import("./components/SongViewer"));

const fuseOptions = {
	threshold: 0.3,
	ignoreLocation: true,
	includeScore: true,
	includeMatches: true,
	ignoreDiacritics: true,
	keys: ["number", "title", "sections.content"],
};

function App() {
	const [themeKey, setThemeKey] = useState<ThemeKey>("light");
	const [theme, setTheme] = useState<Theme>(themes[themeKey]);
	const [presentationMode, setPresentationMode] = useState(false);
	const [loading, setLoading] = useState(true);

	const [songs, setSongs] = useState<Song[]>([]);
	const { songNumber } = useParams<{ songNumber: string }>();
	const navigate = useNavigate();

	const { hits, onSearch, query, updateQuery } = useFuse(songs, fuseOptions);

	useEffect(() => {
		const fetchSongs = async () => {
			try {
				const response = await fetch("/hymns.json");
				const data = await response.json();
				setSongs(data as Song[]);
			} catch (error) {
				console.error("Error fetching songs:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchSongs();
	}, []);

	useEffect(() => {
		setTheme(themes[themeKey]);
	}, [themeKey]);

	const onSongBack = () => {
		navigate("/");
	};

	const selectSong = (song: Song) => {
		navigate(`/songs/${song.number}`);
		window.scrollTo({ top: 0, behavior: "smooth" });
		updateQuery("");
	};

	const selectedSong = songNumber
		? songs.find((s) => s.number.toString() === songNumber)
		: null;

	const renderContent = () => {
		if (loading) {
			return <Loader theme={theme} />;
		}

		if (selectedSong) {
			return (
				<Suspense fallback={<Loader theme={theme} />}>
					<SongViewer
						song={selectedSong}
						onBack={() => onSongBack()}
						theme={theme}
						presentationMode={presentationMode}
					/>
				</Suspense>
			);
		}

		return (
			<div className="flex-grow flex flex-col items-center transition-all duration-300 justify-center h-lvh">
				<header className={`text-center pb-8 ${theme.foreground}`}>
					<h1 className="text-5xl font-bold">Himnario</h1>
					<p className="text-muted-foreground text-lg">
						Encuentra tu himno favorito
					</p>
				</header>
				<div className="flex justify-center w-full max-w-3xl">
					<SearchBar
						value={query}
						onChange={(value) => onSearch(value)}
						theme={theme}
					/>
				</div>

				<div className="flex justify-center flex-col items-center w-full max-w-xl 2xl:max-w-3xl px-4 sm:px-0">
					<ul className="mt-4 space-y-2 w-full">
						{hits.map((song) => (
							<li
								key={song.number}
								className={`px-4 py-2 2xl:py-4 rounded-lg cursor-pointer transition-colors flex gap-5 justify-between ${theme.li} ${theme.liHover}`}
								onClick={() => selectSong(song)}
							>
								<p
									className={`font-semibold ${theme.foreground}`}
								>
									{song.number} - {song.title}
								</p>
								{song.highlights.length > 0 && (
									<p
										className={`font-light italic ${theme.liHighlight}`}
									>
										{song.highlights[0]}
									</p>
								)}
							</li>
						))}
					</ul>
				</div>
			</div>
		);
	};

	return (
		<div className={`${theme.background} font-sans`}>
			<main className="flex flex-col min-h-screen">
				{!presentationMode && (
					<ThemeSelector
						activeThemeKey={themeKey}
						onChange={(key) => setThemeKey(key)}
					/>
				)}

				{selectedSong && (
					<div className="fixed top-4 right-4 z-50">
						<button
							onClick={() =>
								setPresentationMode(!presentationMode)
							}
							className={`p-2 rounded-full hover:scale-105 transition-transform cursor-pointer opacity-80 ${theme.background}`}
							aria-label="Cambiar modo de presentación"
						>
							{presentationMode ? (
								<Minimize2
									size={22}
									className={theme.foreground}
								/>
							) : (
								<Maximize2
									size={22}
									className={theme.foreground}
								/>
							)}
						</button>
					</div>
				)}
				{renderContent()}
			</main>
		</div>
	);
}

export default App;
