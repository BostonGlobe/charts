import { getZoneFromShot, getZones } from 'nba-shot-zones'
import _ from 'lodash'

const distanceBinSize = 4
const maxDistanceBin = Math.floor(32 / distanceBinSize)

function calculateDistance(x, y) {
	return +Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)).toFixed(2)
}

function calculateDistanceBin(distance) {
	return +Math.min(maxDistanceBin, Math.floor(distance / distanceBinSize))
}

function toPercent(numerator, denominator) {
	if (denominator === 0) return 0
	return +((numerator / denominator * 1000) / 10).toFixed(2)
}

function getZoneShots(zoneName, shots) {
	/*
		shots: [{zoneName: 'paint', distanceBin: 1, made: true, x: 5, ...},...],
	*/
	return _.chain(shots)
		.filter(shot => shot.zoneName === zoneName)
		.reduce((previous, datum) => ({
			made: previous.made + (datum.made ? 1 : 0),
			total: previous.total + 1,
		}), { made: 0, total: 0 })
		.value()
}

function getZoneAverageThroughDay(days) {
	/* [{
		date: 20150101,
		shots: [{name: 'paint', made: 5, total: 10},...],
		},...]
	*/
	// add all days together
	// create zones obj

	const zoneNames = getZones()

	// input: ['one', 'two', 'three']
	// output: {'one': { made: 0, total: 0 }, 'two': { made: 0, total: 0 } ...

	const emptyZones = _.reduce(zoneNames, (previous, current) => ({
		...previous,
		[current]: { made: 0, total: 0 },
	}), {})

	const reduced = _.reduce(days, (previous, day) => {
		_.forEach(day.zones, zone => {
			// eslint-disable-next-line no-param-reassign
			previous[zone.zoneName].made += zone.values.made
			// eslint-disable-next-line no-param-reassign
			previous[zone.zoneName].total += zone.values.total
		})
		return previous
	}, emptyZones)

	// eslint-disable-next-line guard-for-in
	for (const i in reduced) {
		const current = reduced[i]
		const percent = toPercent(current.made, current.total)

		current.percent = percent
	}

	return reduced
}

function getAllZoneAverages(days) {

	/*
		days: [{
			date: 20150101,
			shots: [{zoneName: 'paint', distanceBin: 1, made: true, x: 5, ...},...],
		},...]
	*/

	const zoneNames = getZones()

	// go thru each zone and compute made / total
	const shotTotalsEachDay = _.map(days, day => {
		const zones = _.map(zoneNames, z => ({ zoneName: z, values: getZoneShots(z, day.shots) }))
		return { date: day.date, zones }
	})

	/*
		shotTotalsEachDay: [{
			date: 20150101,
			zones: {
				name: 'paint',
				values: {made: 5, total: 10}
			}
		},...]
	*/

	// go through each day, and calculate percent thru that date
	return _.map(days, day => {
		// get all shots up until this date
		const filtered = shotTotalsEachDay.filter(shotDay => +shotDay.date <= +day.date)
		const zones = getZoneAverageThroughDay(filtered)
		return { date: day.date, zones }
	})
}

// reduce / clean fields and determine shot zone
function cleanShot(d) {
	const x = +d['shot-x']
	const y = +d['shot-y']
	const distance = calculateDistance(x, y)
	const distanceBin = calculateDistanceBin(distance)
	const zoneName = getZoneFromShot({ x, y })
	const made = d.event.toLowerCase().indexOf('missed') < 0
	const gameDate = d.gamedate

	return { x, y, made, distance, distanceBin, zoneName, gameDate }
}

// remove first row and filter to current season
function clean(data) {
	const season = data[0].season
	return _.chain(data)
		.filter(d => d.season === season)
		.map(cleanShot)
		.value()
}

function calculate(data) {

	// we want to get all shots on each date
	const shotsOnEachDate = _(data)
		// first: group shots by date
		.groupBy('gameDate')
		// next: make an array of { shots, date }
		.map((shots, date) => ({ shots, date }))
		.value()

	// calculate average for each zone on each date
	const zoneAverages = getAllZoneAverages(shotsOnEachDate)
	// const distanceAverages = getAllDistanceAverages(shotsOnEachDate)

	return zoneAverages
}

function getAverages(data) {
	const cleaned = clean(data)
	const calculated = calculate(cleaned)
	return calculated
}

export default getAverages
