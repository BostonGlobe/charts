import { getZoneFromShot } from 'nba-shot-zones'
import getJSON from 'get-json-lite'
import zoneGroups from '../utils/basketball-zone-groups.js'

const calculateDistance = (x, y) => Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)).toFixed(2)

const getZoneGroup = (zone) => {
	const filtered = zoneGroups.filter(group => group.zones.indexOf(zone) > -1)
	return filtered.map(group => group.name)
}

// const getSeason = () => {
// 	const d = new Date()
// 	const year = d.getFullYear()
// 	const month = d.getMonth()

// 	// the season ends in june and starts in november, so checking before sept is safe
// 	const offset = month < 8 ? 1 : 0

// 	const startYear = year - offset

// 	const endYearSuffix = +(startYear.toString().substring(2, 4)) + 1

// 	return `${startYear}${endYearSuffix}`
// }

const createShotObj = (datum) => {
	// everything we (might) need
	const season = datum.season
	const gameDate = datum.gamedate
	const opponent = datum.opponent
	const home = datum['home-away'] === 'home'
	const quarter = +datum.quarter
	const time = datum.time
	const player = datum.player
	const shotX = +datum['shot-x']
	const shotY = +datum['shot-y']
	// can probably remove
	const fastbreak = datum.fastbreak
	const secondChance = datum['second-chance']
	const offTurnover = datum['off-turnover']

	const distance = +calculateDistance(shotX, shotY)
	const zone = getZoneFromShot({ x: shotX, y: shotY })
	const zoneGroup = getZoneGroup(zone)
	const made = datum.event.toLowerCase().indexOf('missed') < 0

	return {
		season,
		gameDate,
		opponent,
		home,
		quarter,
		time,
		player,
		shotX,
		shotY,
		fastbreak,
		secondChance,
		offTurnover,
		made,
		distance,
		zone,
		zoneGroup,
	}
}

const transform = (data, cb) => {
	const season = data[0].season
	const averagesURL = `path/to/basketball-shotchart-test-${season}.json`
	getJSON(averagesURL, (err, averages) => {
		if (err) cb(err)
		else {
			const shots = data.map(createShotObj)
			cb(null, { data: { averages, shots } })
		}
	})
}

export default transform
