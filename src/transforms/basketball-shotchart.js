import { getZoneFromShot } from 'nba-shot-zones'
import _ from 'lodash'
import zoneGroups from '../utils/basketball-zone-groups'
import getAverages from '../utils/basketball-averages'

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

const getZoneGroup = (zone) =>
	_(zoneGroups)
		.filter(group => _.includes(group.zones, zone))
		.map('name')
		.value()

const clean = (data) => {
	// the row is column definitions, so must get season from second row
	const season = data[1].season
	return _.filter(data, d => d.season === season)
}

const createShotObj = (datum) => {
	// everything we (might) need
	const season = datum.season
	const gameDate = datum.gamedate
	const team = datum.team.toLowerCase()
	const opponent = datum.opponent.toLowerCase()
	const home = datum['home-away'] === 'home'
	const quarter = +datum.quarter
	const time = datum.time
	const player = datum.player
	const x = +datum['shot-x']
	const y = +datum['shot-y']


	const distance = +calculateDistance(x, y)
	const zone = getZoneFromShot({ x, y })
	const zoneGroup = getZoneGroup(zone)
	const made = datum.event.toLowerCase().indexOf('missed') < 0

	return {
		season,
		gameDate,
		team,
		opponent,
		home,
		quarter,
		time,
		player,
		x,
		y,
		made,
		distance,
		zone,
		zoneGroup,
	}
}

const transform = (data) => {
	if (data.length) {
		const averages = getAverages(data)
		const rows = clean(data).map(createShotObj)
		return { metadata: { averages }, rows }
	}
	return { rows: [] }
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
	transform,
	hed,
	subhed,
	trimData,
}
