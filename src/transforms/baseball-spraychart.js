import filtersToArray from './../utils/filtersToArray.js'

const requiredFields = [
	'event',
	'distance',
	'gameDateTime',
	'direction',
	'id',
]

const hed = ({ rows = [], filters = {} }) => {

	// hed format is going to be:
	// {team/batter}, season year
	const filtersArray = filtersToArray(filters)

	const batter = filtersArray
		.find(f => f.key === 'batter')

	const batterTeamNickname = filtersArray
		.find(f => f.key === 'batterTeamNickname')

	const { gameDateTime } = rows[0] || {}

	// we must have either a team or batter, and gameDateTime
	if (!((batterTeamNickname || batter) && gameDateTime)) return ''

	const year = (new Date(gameDateTime)).getFullYear()

	return [
		(batter && batter.value) ||
			(batterTeamNickname && batterTeamNickname.value),
		year,
	].join(', ')

}

const subhed = ({ filters = {} }) => {

	// subhed format is going to be the list of filters
	// with optional prefixes

	const filtersArray = filtersToArray(filters)

	const event = filtersArray
		.find(f => f.key === 'event')

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

	return events[(event && event.value) || 'none']

}

export default {
	hed,
	subhed,
	requiredFields,
}
