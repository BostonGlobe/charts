import mapValues from 'lodash.mapvalues'

const convertData = ({ data, types }) => {

	const convertedRows = data.map(row => mapValues(row, (value, key) => {

		const options = {
			boolean: Boolean,
			integer: Number,
			float: Number,
			date: (x) => new Date(x),
			string: (x) => x.toString(),
		}

		return options[types[key]](value)

	})).map((row, id) => ({
		// chartbuilder needs to send a unique id for data-binding purposes.
		// but we don't need id on production - so here we'll fake it.
		id,
		...row,
	}))

	return convertedRows

}

export default convertData
