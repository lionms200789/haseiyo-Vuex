module.exports = {
	'env': [
		'eslint:recommended',
		'plugin:vue/essential',
		'@vue/standard'
	],

	'extends': [
		'eslint:recommended',
		'plugin:vue/essential'
	],

	'globals': {
		'Atomics': 'readonly',
		'SharedArrayBuffer': 'readonly'
	},

	'parserOptions': {
		'ecmaVersion': 2018
	},

	'plugins': [
		'vue'
	],

	'rules': {
		'quotes': [
			'error',
			'double'
		],
		'semi': [
			'error',
			'always'
		]
	},

	root: true,

	env: {
		browser: true,
		es6: true,
		node: true
	},

	parserOptions: {
		ecmaVersion: 2018,
		parser: 'babel-eslint'
	},

	rules: {
		quotes: [
			'error',
			'double'
		],
		semi: [
			'error',
			'always'
		],
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
	}
};
