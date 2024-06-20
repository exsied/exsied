import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import tsconfigPaths from 'vite-tsconfig-paths'

const ext = {
	cjs: 'cjs',
	es: 'js',
} as const

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		dts({
			rollupTypes: true,
			staticImport: true,
			compilerOptions: {
				skipLibCheck: true,
			},
		}),
		tsconfigPaths(),
	],
	server: {
		// proxy: {
		// 	'/uploads': 'http://localhost:65432',
		// },
	},
	build: {
		minify: 'terser',
		cssMinify: false,
		lib: {
			entry: 'src/index.ts',
			formats: ['es'],
			fileName: (format, entryName) => {
				return `${entryName}.${ext[format as 'cjs' | 'es']}`
			},
		},
		rollupOptions: {
			output: {
				exports: 'named',
				preserveModules: true,
				preserveModulesRoot: 'src',
			},
		},
	},
	css: {
		modules: {
			scopeBehaviour: 'local',
			localsConvention: 'camelCaseOnly',
		},
	},
})
