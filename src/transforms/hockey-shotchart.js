import _ from 'lodash'

const calculalateX = x => {
	const midway = 89
	const diff = x - midway
	return midway - diff
}

const calculalateY = y => {
	const midway = 42.5
	const diff = y - midway
	return midway - diff
}

const calculateDistance = (x, y) => Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)).toFixed(2)

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

const clean = (data) => {
	// the row is column definitions, so must get season from second row
	const season = data[1].season
	return _.filter(data, d => d.season === season)
}

const createShotObj = (datum) => {
	// everything we (might) need
	const season = datum.season
	const gameDate = datum.gamedate
	const teamLocation = datum['team-location']
	const teamNickname = datum['team-nickname']
	const opponentLocation = datum['opponent-location']
	const opponentNickname = datum['opponent-nickname']
	const home = datum['home-away'] === 'home'
	const period = +datum.period
	const time = datum.time
	const player = datum.player
	const x = calculalateX(datum['player-x'])
	const y = calculalateY(datum['player-y'])
	const powerPlay = datum.strength.toLowerCase() !== 'even'
	const distance = +calculateDistance(x, y)
	const made = datum.event.toLowerCase().indexOf('shot') < 0

	return {
		season,
		gameDate,
		teamLocation,
		teamNickname,
		opponentLocation,
		opponentNickname,
		home,
		period,
		time,
		player,
		x,
		y,
		powerPlay,
		made,
		distance,
	}
}

const transform = (data) => {
	if (data.length) {
		const rows = clean(data).map(createShotObj)
		return { rows }
	}
	return { rows: [] }
}

const hed = ({ rows, filters }) => {
	if (rows.length) {
		// get season
		const seasonStr = rows[0].season.toString()

		// if more than one player, show team name
		const who = filters.player ? filters.player : filters.teamLocation
		const when = `${seasonStr.substring(0, 4)}-${seasonStr.substring(4, 6)}`

		return `${who} ${when}`
	}

	return ''
}

const subhed = ({ rows }) => {
	if (rows.length) {
		const date = getLatestDate(rows)
		return `All shots through ${date}`
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
	transform,
	hed,
	subhed,
	trimData,
}
