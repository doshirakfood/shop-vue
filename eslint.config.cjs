/* eslint-env node */
module.exports = {
	root: true,
	env: {
		node: true,
		browser: true,
	},
	files: ['src/**/*.js', 'src/**/*.vue'],
	extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'prettier'],
	parserOptions: {
		ecmaVersion: 'latest',
	},
	ignorePath: [
		'vite.config.js',
		'node_modules/*',
		'dist/**/*',
		'src/assets/libs/*',
	],
}
