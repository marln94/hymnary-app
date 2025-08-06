import type { Theme } from "../types";

type Props = {
	theme: Theme;
};

function Loader({ theme }: Props) {
	return (
		<div className={`flex-grow flex flex-col items-center justify-center `}>
			<p className="font-semibold mb-4">Cargando</p>
			<div className="flex items-center justify-center space-x-2">
				<div
					className={`w-4 h-4 rounded-full animate-pulse ${theme.themeRingBackground}`}
				/>
				<div
					className={`w-4 h-4 rounded-full animate-pulse delay-200 ${theme.themeRingBackground}`}
				/>
				<div
					className={`w-4 h-4 rounded-full animate-pulse delay-500 ${theme.themeRingBackground}`}
				/>
			</div>
		</div>
	);
}

export default Loader;
