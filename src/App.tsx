import { useEffect, useState } from "react";

import "./App.css";
import type { Song } from "./types";

import SearchBar from "./components/SearchBar";
import SongViewer from "./components/SongViewer";
import ThemeSelector from "./components/ThemeSelector";

function App() {
	const [songs, setSongs] = useState<Song[]>([]);
	const [filter, setFilter] = useState<string>("");
	const [selectedSong, setSelectedSong] = useState<Song | null>(null);

	useEffect(() => {
		fetch("/data/hymns.json")
			.then((res) => res.json())
			.then((data: Song[]) => setSongs(data));
	}, []);

	const results = filter.trim()
		? songs.filter(
				(song) =>
					song.title.toLowerCase().includes(filter.toLowerCase()) ||
					song.number.toString().includes(filter), // TODO: implement content search
			)
		: [];

	return (
		<div className="">
			<ThemeSelector />

			{!selectedSong ? (
				<>
					<SearchBar value={filter} onChange={setFilter} />

					<ul className="mt-4">
						{results.map((song) => (
							<li
								key={song.number}
								className="cursor-pointer"
								onClick={() => setSelectedSong(song)}
							>
								{song.number} - {song.title}
							</li>
						))}
					</ul>
				</>
			) : (
				<SongViewer
					song={selectedSong}
					onBack={() => setSelectedSong(null)}
				/>
			)}
		</div>
	);
}

export default App;
