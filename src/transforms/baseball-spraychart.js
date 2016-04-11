const requiredFields = [
	'event',
	'distance',
	'gamedatetime',
	'direction',
	'id',
]

const hed = ({ rows = [], filters = {} }) => {

	// hed format is going to be:
	// {team/batter}, season year

	const { batter } = filters
	const batterTeamNickname = filters['batter-team-nickname']

	const { gamedatetime } = rows[0] || {}

	// we must have either a team or batter, and gamedatetime
	if (!((batterTeamNickname || batter) && gamedatetime)) return ''

	const year = (new Date(gamedatetime)).getFullYear()

	return `${batter || batterTeamNickname}, ${year}`

}

const subhed = ({ filters = {} }) => {

	// subhed format is going to be the list of filters
	// with optional prefixes

	const { event } = filters

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
