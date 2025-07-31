import { useEffect, useState } from "react";

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

	const [songs, setSongs] = useState<Song[]>([]);
	const [selectedSong, setSelectedSong] = useState<Song | null>(null);
	// const [results, setResults] = useState<Song[]>([]);

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
		setSelectedSong(null);
		updateQuery("");
	};

	const selectSong = (song: Song) => {
		setSelectedSong(song);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<div className={`${theme.background} min-h-screen font-sans`}>
			<main className="container mx-auto p-4 max-w-2xl">
				<ThemeSelector
					activeThemeKey={themeKey}
					onChange={(key) => setThemeKey(key)}
				/>

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
					/>
				)}
			</main>
		</div>
	);
}

export default App;
