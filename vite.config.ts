import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
import { compression } from "vite-plugin-compression2";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		VitePWA({
			registerType: "autoUpdate",
			includeAssets: ["favicon.svg", "favicon.ico", "robots.txt"],
			manifest: {
				name: "Himnario",
				short_name: "Himnario",
				start_url: "/",
				display: "standalone",
				background_color: "#ffffff",
				theme_color: "#1c1919", // Cambia según tu tema principal
				icons: [
					{
						src: "/pwa-192x192.png",
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "/pwa-512x512.png",
						sizes: "512x512",
						type: "image/png",
					},
				],
			},
		}),
		compression(),
	],
	server: {
		allowedHosts: true,
	},
});
