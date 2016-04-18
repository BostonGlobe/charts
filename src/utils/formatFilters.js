import map from 'lodash.map'

export default (filters) =>
	map(filters, value => value)
		.reduce((acc, value) => ({
			...acc,
			[value.key]: value.value,
		}), {})
