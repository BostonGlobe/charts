const transform = (data, cb) => {

	console.log({
		...data,
		i: 1,
	})
	cb(null, 'this is baseball')

}

export default transform
