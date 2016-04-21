import filtersToArray from '../utils/filtersToArray.js'
import getLatestDate from '../utils/getLatestDate'
import hasData from '../utils/hasData'
import getOrdinal from '../utils/getOrdinal'
import '../utils/find'

const hed = ({ rows = [], filters = {} }) => {
	const filtersArray = filtersToArray(filters)
	if (hasData(rows, filters)) {
		// get season
		const seasonStr = rows[0].season.toString()

		// if more than one player, show team name
		const teamObj = filtersArray.find(f => f.key === 'teamNickname')
		const playerObj = filtersArray.find(f => f.key === 'player')
		const who = teamObj ? teamObj.value : playerObj.value
		const when = `${seasonStr.substring(0, 4)}-${seasonStr.substring(4, 6)}`

		return `${who}, ${when}`
	}

	return ''
}

const subhed = ({ rows = [], filters = {} }) => {
	const filtersArray = filtersToArray(filters)

	const filterOutput = {
		home: v => (v ? 'at home' : 'on the road'),
		powerPlay: v => (v ? 'on a power play' : 'on even strength'),
		opponentNickname: v => (`against the ${v}`),
		period: v => (`in the ${getOrdinal(+v)} period`),
	}

	if (hasData(rows, filters)) {
		const date = getLatestDate(rows)

		const result = filtersArray.reduce((previous, { key, value }) => {
			if (key !== 'player' && key !== 'teamNickname') {
				const subhedVal = filterOutput[key](value)
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
