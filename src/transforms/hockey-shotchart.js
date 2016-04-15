import _ from 'lodash'

const getLatestDate = (rows) => {
	const sorted = rows.sort((a, b) => (+a.gameDate) - (+b.gameDate))
	const str = sorted[sorted.length - 1].gameDate
	const year = +str.substring(0, 4)
	const month = +str.substring(4, 6) - 1
	const day = +str.substring(6, 8)

	const d = new Date(year, month, day)
	const dateString = d.toDateString()
	const split = dateString.split(' ')
	const output = `${split[1]}. ${+split[2]}`
	return output
}

const hed = ({ rows, filters }) => {
	if (rows.length) {
		// get season
		const seasonStr = rows[0].season.toString()

		// if more than one player, show team name
		const who = filters.player ? filters.player : filters.teamNickname
		const when = `${seasonStr.substring(0, 4)}-${seasonStr.substring(4, 6)}`

		return `${who} ${when}`
	}

	return ''
}

const subhed = ({ rows, filters }) => {
	const filterValue = {
		home: v => (v ? 'at home' : 'on the road'),
		powerPlay: v => (v ? 'on a power play' : 'on even strength'),
		opponentNickname: v => (`against the ${v}`),
	}

	if (rows.length) {
		const date = getLatestDate(rows)

		const keys = Object.keys(filters)
		const result = keys.reduce((previous, current) => {
			if (current !== 'player' && current !== 'teamNickname') {
				console.log(current)
				const val = filters[current]
				const subhedVal = filterValue[current](val)
				return `${previous} ${subhedVal}`
			}
			return previous
		}, 'All shots')

		return `${result} through ${date}`
	}

	return ''
}

const trimData = (data) => ({
	...data,
	rows: data.rows.map(row =>
		_.pick(row, [
			'gameDate',
			'x',
			'y',
			'made',
		])),
})

export default {
	hed,
	subhed,
	trimData,
}
