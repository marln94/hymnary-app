import type { Song } from "../types";
type Props = {
	song: Song;
	onBack: () => void;
};

function SongViewer({ song, onBack }: Props) {
	return (
		<div className="">
			<button onClick={onBack} className="">
				← Volver a la búsqueda
			</button>
			<div>
				<h1>
					{song.number} - {song.title}
				</h1>
				<pre>{song.sections.map((section) => section.content)}</pre>
			</div>
		</div>
	);
}

export default SongViewer;
