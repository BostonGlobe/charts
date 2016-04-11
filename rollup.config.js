import babel from 'rollup-plugin-babel'

export default {
	plugins: [
		babel({
			babelrc: false,
			presets: ["es2015-rollup"],
			plugins: [
				"syntax-object-rest-spread",
				"transform-object-rest-spread",
			],
			exclude: 'node_modules/**'
		})
	]
}
