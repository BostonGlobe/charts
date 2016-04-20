const getLatestDate = (rows) => {
	const sorted = rows
		.map(r => r)
		.sort((a, b) => (new Date(a.gameDateTime)) - (new Date(b.gameDateTime)))
	const latest = sorted.pop().gameDateTime

	const dateString = new Date(latest).toDateString()
	const split = dateString.split(' ')
	const output = `${split[1]}. ${+split[2]}`
	return output
}

const hasData = (rows, filters) => rows.length && Object.keys(filters).length

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
	// const filterValue = {
	// 	home: v => (v ? 'at home' : 'on the road'),
	// 	powerPlay: v => (v ? 'on a power play' : 'on even strength'),
	// 	opponent: v => (`against the ${v}`),
	// }

	if (hasData(rows, filters)) {
		const date = getLatestDate(rows)

		// const keys = Object.keys(filters)
		// const result = keys.reduce((previous, key) => {
		// 	if (key !== 'player' && key !== 'team') {
		// 		const val = filters[key].value
		// 		const subhedVal = filterValue[key](val)
		// 		return `${previous} ${subhedVal}`
		// 	}
		// 	return previous
		// }, 'Effectiveness on all shots')

		return `Effectives on all shots through ${date}`
	}

	return ''
}

const requiredFields = [
	'shotX',
	'shotY',
	'made',
	'zone',
]

export default {
	hed,
	subhed,
	requiredFields,
}
