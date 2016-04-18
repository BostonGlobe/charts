import map from 'lodash.map'

const requiredFields = [
	'event',
	'distance',
	'gameDateTime',
	'direction',
	'id',
]

const formatFilters = (filters) =>
	map(filters, value => value)
		.reduce((acc, value) => ({
			...acc,
			[value.key]: value.value,
		}), {})

const hed = ({ rows = [], filters = {} }) => {

	// hed format is going to be:
	// {team/batter}, season year
	const filtersMap = formatFilters(filters)

	const { batter, batterTeamNickname } = filtersMap

	const { gameDateTime } = rows[0] || {}

	// we must have either a team or batter, and gameDateTime
	if (!((batterTeamNickname || batter) && gameDateTime)) return ''

	const year = (new Date(gameDateTime)).getFullYear()

	return `${batter || batterTeamNickname}, ${year}`

}

const subhed = ({ filters = {} }) => {

	// subhed format is going to be the list of filters
	// with optional prefixes

	const filtersMap = formatFilters(filters)

	const { event } = filtersMap

	const events = {
		Double: 'Doubles',
		'Home run': 'Home runs',
		Out: 'Outs',
		Sacrifice: 'Sacrifices',
		'Sacrifice fly': 'Sacrifice flies',
		Single: 'Singles',
		Triple: 'Triples',
		none: 'All hits',
	}

	return events[event || 'none']

}

export default {
	hed,
	subhed,
	requiredFields,
}
