import mapValues from 'lodash.mapvalues'

const options = {
	boolean: Boolean,
	integer: Number,
	float: Number,
	date: (x) => new Date(x),
	string: (x) => x.toString(),
}

export default ({ data, types }) =>
	data.map(row => mapValues(row, (value, key) =>
		options[types[key]](value)
	))
