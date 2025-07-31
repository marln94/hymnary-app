import { useEffect, useState } from "react";

import "./App.css";
import type { Song, Theme, ThemeKey } from "./types";
import { themes } from "./themes";

import SearchBar from "./components/SearchBar";
import SongViewer from "./components/SongViewer";
import ThemeSelector from "./components/ThemeSelector";

function App() {
	const [themeKey, setThemeKey] = useState<ThemeKey>("light");
	const [theme, setTheme] = useState<Theme>(themes[themeKey]);

	const [songs, setSongs] = useState<Song[]>([]);
	const [filter, setFilter] = useState<string>("");
	const [selectedSong, setSelectedSong] = useState<Song | null>(null);

	useEffect(() => {
		fetch("/data/hymns.json")
			.then((res) => res.json())
			.then((data: Song[]) => setSongs(data));
	}, []);

	useEffect(() => {
		setTheme(themes[themeKey]);
	}, [themeKey]);

	const results = filter.trim()
		? songs.filter(
				(song) =>
					song.title.toLowerCase().includes(filter.toLowerCase()) ||
					song.number.toString().includes(filter), // TODO: implement content search
			)
		: [];

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
							value={filter}
							onChange={setFilter}
							theme={theme}
						/>

						<ul className="mt-6 space-y-2">
							{results.map((song) => (
								<li
									key={song.number}
									className="p-4 bg-card rounded-lg cursor-pointer hover:bg-card/80 transition-colors"
									onClick={() => setSelectedSong(song)}
								>
									<p
										className={`font-semibold ${theme.foreground}`}
									>
										{song.number} - {song.title}
									</p>
								</li>
							))}
						</ul>
					</>
				) : (
					<SongViewer
						song={selectedSong}
						onBack={() => setSelectedSong(null)}
						theme={theme}
					/>
				)}
			</main>
		</div>
	);
}

export default App;
