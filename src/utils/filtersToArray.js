import map from 'lodash.map'

export default (filters) =>
	map(filters, ({ key, value }) => ({
		key,
		value,
	}))
