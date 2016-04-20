import getLatestDate from '../utils/getLatestDate'
import hasData from '../utils/hasData'
import getOrdinal from '../utils/getOrdinal'

const hed = ({ rows = [], filters = {} }) => {
	if (hasData(rows, filters)) {
		// get season
		const seasonStr = rows[0].season.toString()

		// if more than one player, show team name
		const who = filters.team ? filters.team.value : filters.player.value
		const when = `${seasonStr.substring(0, 4)}-${seasonStr.substring(4, 6)}`

		return `${who}, ${when}`
	}

	return ''
}

const subhed = ({ rows = [], filters = {} }) => {
	const filterValue = {
		home: v => (v ? 'at home' : 'on the road'),
		powerPlay: v => (v ? 'on a power play' : 'on even strength'),
		opponent: v => (`against the ${v}`),
		period: v => (`in the ${getOrdinal(+v)} period`),
	}

	if (hasData(rows, filters)) {
		const date = getLatestDate(rows)

		const keys = Object.keys(filters)
		const result = keys.reduce((previous, key) => {
			if (key !== 'player' && key !== 'team') {
				const val = filters[key].value
				const subhedVal = filterValue[key](val)
				return `${previous} ${subhedVal}`
			}
			return previous
		}, 'All shots')

		return `${result} through ${date}`
	}

	return ''
}

const requiredFields = [
	'playerX',
	'playerY',
	'made',
]

export default {
	hed,
	subhed,
	requiredFields,
}
