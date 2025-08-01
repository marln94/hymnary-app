import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "./App.css";
import type { Song, Theme, ThemeKey } from "./types";
import { themes } from "./themes";

import SearchBar from "./components/SearchBar";
import SongViewer from "./components/SongViewer";
import ThemeSelector from "./components/ThemeSelector";

import { useFuse } from "./hooks/useFuse";

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

	const [songs, setSongs] = useState<Song[]>([]);
	const { songNumber } = useParams<{ songNumber: string }>();
	const navigate = useNavigate();

	const { hits, onSearch, query, updateQuery } = useFuse(songs, fuseOptions);

	useEffect(() => {
		fetch("/data/hymns.json")
			.then((res) => res.json())
			.then((data: Song[]) => setSongs(data));
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

	return (
		<div className={`${theme.background} min-h-screen font-sans`}>
			<main className="container mx-auto p-4">
				<ThemeSelector
					activeThemeKey={themeKey}
					onChange={(key) => setThemeKey(key)}
				/>

				{selectedSong && (
					<div className="fixed bottom-4 left-4 z-50">
						<button
							onClick={() =>
								setPresentationMode(!presentationMode)
							}
							className="text-sm bg-blue-600 text-white px-3 py-1 rounded shadow"
						>
							{presentationMode
								? "Salir presentación"
								: "Modo presentación"}
						</button>
					</div>
				)}

				{!selectedSong ? (
					<>
						<header
							className={`text-center my-8 ${theme.foreground}`}
						>
							<h1 className="text-4xl font-bold">Himnario</h1>
							<p className="text-muted-foreground">
								Encuentra tu himno favorito
							</p>
						</header>
						<SearchBar
							value={query}
							onChange={(value) => onSearch(value)}
							theme={theme}
						/>

						<ul className="mt-6 space-y-2">
							{hits.map((song) => (
								<li
									key={song.number}
									className={`p-4 rounded-lg cursor-pointer transition-colors flex gap-5 justify-between ${theme.li} ${theme.liHover}`}
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
					</>
				) : (
					<SongViewer
						song={selectedSong}
						onBack={() => onSongBack()}
						theme={theme}
						presentationMode={presentationMode}
					/>
				)}
			</main>
		</div>
	);
}

export default App;
