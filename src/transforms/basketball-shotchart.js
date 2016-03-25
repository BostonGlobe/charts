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
	_.chain(zoneGroups)
		.filter(group => group.zones.indexOf(zone) > -1)
		.map(group => group.name)
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
	const shotX = +datum['shot-x']
	const shotY = +datum['shot-y']


	const distance = +calculateDistance(shotX, shotY)
	const zone = getZoneFromShot({ x: shotX, y: shotY })
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
		shotX,
		shotY,
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

const hed = ({ rows }) => {
	if (!rows.length) return ''

	// get unique players
	const uniquePlayers = _.uniqBy(rows, d => d.player)
	// get season
	const season = rows[0].season

	// if more than one player, show team name
	const who = uniquePlayers.length > 1 ? rows[0].team : uniquePlayers[0].player
	const when = `${season.substring(0, 4)}-${season.substring(4, 6)}`

	return `${who} ${when}`
}

const subhed = ({ rows }) => {
	const date = getLatestDate(rows)
	return `Effectiveness on all shots through ${date}`
}

export default {
	transform,
	hed,
	subhed,
}
