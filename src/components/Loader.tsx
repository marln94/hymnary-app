import type { Theme } from "../types";
// import { Loader } from "lucide-react";

type Props = {
	theme: Theme;
};

function Loader({ theme }: Props) {
	return (
		<div className={`flex-grow flex flex-col items-center justify-center `}>
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
