import { createBrowserRouter } from "react-router-dom";
import App from "./App";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "/songs/:songNumber",
		element: <App />,
	},
]);
