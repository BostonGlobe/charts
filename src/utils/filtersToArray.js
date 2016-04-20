import map from 'lodash.map'

export default (filters) =>
	map(filters, (value, key) => ({
		key: value.key,
		value: value.value,
	}))
