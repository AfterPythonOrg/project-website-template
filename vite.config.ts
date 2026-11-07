import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';
import { svelteTesting } from '@testing-library/svelte/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

const outputDir = "build";

export default defineConfig(({ mode }) => {
	const isDev = mode === "development";
	return {
		plugins: [
			tailwindcss(),
			sveltekit({
				preprocess: [vitePreprocess(), mdsvex()],
				extensions: ['.svelte', '.svx'],
				adapter: adapter({
					// default options are shown. On some platforms
					// these options are set automatically — see below
					pages: outputDir,
					assets: outputDir,
					fallback: '200.html', // may differ from host to host
					precompress: false,
					strict: true
				}),
				prerender: {
					// Allow routes to be skipped if they have no entries
					// This handles cases where content types (blog, tutorial, etc.) don't exist
					handleUnseenRoutes: 'warn'
				},
				// GitHub Pages serves sites from a subdirectory (e.g., username.github.io/repo-name/)
				// Set base path via BASE_PATH env var so all routes and assets are correctly prefixed
				// Without this, routes like /doc would resolve to username.github.io/doc instead of username.github.io/afterpython/doc
				paths: { base: (process.env.BASE_PATH || '') as '' | `/${string}` }
				// Path aliases ($lib, $components, $static) are now subpath imports
				// (#lib/*, #static/*) declared in the "imports" field of package.json
			})
		],
		build: {
			minify: isDev ? false : "esbuild",
			sourcemap: isDev,
		},
		test: {
			projects: [
				{
					extends: './vite.config.ts',
					plugins: [svelteTesting()],
					test: {
						name: 'client',
						environment: 'jsdom',
						clearMocks: true,
						include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
						exclude: ['src/lib/server/**'],
						setupFiles: ['./vitest-setup-client.ts']
					}
				},
				{
					extends: './vite.config.ts',
					test: {
						name: 'server',
						environment: 'node',
						include: ['src/**/*.{test,spec}.{js,ts}'],
						exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
					}
				}
			]
		}
	};
});
