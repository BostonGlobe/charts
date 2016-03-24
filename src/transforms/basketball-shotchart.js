import { getZoneFromShot } from 'nba-shot-zones'
import zoneGroups from '../utils/basketball-zone-groups'
import getAverages from '../utils/basketball-averages'

const calculateDistance = (x, y) => Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)).toFixed(2)

const getZoneGroup = (zone) => {
	const filtered = zoneGroups.filter(group => group.zones.indexOf(zone) > -1)
	return filtered.map(group => group.name)
}

function clean(data) {
	// the row is column definitions, so must get season from second row
	const season = data[1].season
	return data
		.filter(d => d.season === season)
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

export default transform
