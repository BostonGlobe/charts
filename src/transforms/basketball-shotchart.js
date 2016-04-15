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
		const who = filters.player ? filters.player : filters.team
		const when = `${seasonStr.substring(0, 4)}-${seasonStr.substring(4, 6)}`

		return `${who} ${when}`
	}

	return ''
}

const subhed = ({ rows }) => {
	if (rows.length) {
		const date = getLatestDate(rows)
		return `Effectiveness on all shots through ${date}`
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
