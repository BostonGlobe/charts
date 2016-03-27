import _ from 'lodash'

const trimData = (data) => ({
	...data,
	rows: data.rows.map(row =>
		_.pick(row, [
			'description',
			'distance',
			'gamedate',
			'index',
			'zone',
		])),
})

const hed = ({ rows = [], filters }) => {

	// hed format is going to be:
	// {team/batter}, season year

	const { team, batter } = filters

	const { gamedate } = rows[0] || {}

	// we must have either a team or batter, and gamedate
	if (!((team || batter) && gamedate)) return ''

	const year = gamedate && gamedate.slice(0, 4)

	return `${batter || team}, ${year}`

}

const subhed = ({ rows = [], filters }) => {

	// subhed format is going to be the list of filters
	// with optional prefixes

	const { team, batter, description } = filters

	const { gamedate } = rows[0] || {}

	// we must have either a team or batter, and gamedate
	if (!((team || batter) && gamedate)) return ''

	const descriptions = {
		Double: 'Doubles',
		'Home run': 'Home runs',
		Out: 'Outs',
		Sacrifice: 'Sacrifices',
		'Sacrifice fly': 'Sacrifice flies',
		Single: 'Singles',
		Triple: 'Triples',
		none: 'All hits',
	}

	return descriptions[description || 'none']

}

export default {
	hed,
	subhed,
	trimData,
}
