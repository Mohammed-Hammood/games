// import { defineConfig } from 'vite';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import tsConfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tsConfigPaths(),
	],
	server: {
		port: 3000
	},
	test: {
		name: "node",
		globals: true,
		setupFiles: "./setup",
		root: "./src/tests",
		environment: "jsdom",
	}
})
