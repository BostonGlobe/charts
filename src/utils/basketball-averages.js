import { getZones, getZoneFromShot } from 'nba-shot-zones'

const distanceBinSize = 4
const maxDistanceBin = Math.floor(32 / distanceBinSize)

function calculateDistance(x, y) {
	return +Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)).toFixed(2)
}

function calculateDistanceBin(distance) {
	return +Math.min(maxDistanceBin, Math.floor(distance / distanceBinSize))
}

function createDistanceData() {
	const arr = []
	for (var i = 0; i < maxDistanceBin; i++) {
		arr.push(i)
	}
	return arr
}

function getZoneShots(zoneName, shots) {
	/*
		shots: [{zoneName: 'paint', distanceBin: 1, made: true, shotX: 5, ...},...],
	*/
	return shots
		.filter(shot => shot.zoneName === zoneName)
		.reduce((previous, datum) => ({
			made: previous.made + (datum.made ? 1 : 0),
			total: previous.total + 1,
		}), {made: 0, total: 0})
}

function getDistanceShots(distanceBin, shots) {
	/*
		shots: [{zoneName: 'paint', distanceBin: 1, made: true, shotX: 5, ...},...],
	*/
	return shots
		.filter(shot => shot.distanceBin === distanceBin)
		.reduce((previous, datum) => ({
			made: previous.made + (datum.made ? 1 : 0),
			total: previous.total + 1,
		}), {made: 0, total: 0})
}

function getZoneAverageThroughDay(days) {
	/* [{
		date: 20150101,
		shots: [{name: 'paint', made: 5, total: 10},...],
		},...]
	*/
	// add all days together
	// create zones obj

	const emptyZones = zoneNames.reduce((previous, z) => {
		previous[z] = { made: 0, total: 0 }
		return previous
	}, {})

	const reduced = days.reduce((previous, day) => {
		day.zones.forEach(zone => {
			previous[zone.zoneName].made += zone.values.made
			previous[zone.zoneName].total += zone.values.total
		})
		return previous
	}, emptyZones)
	
	for (let i in reduced) {
		const percent = +((reduced[i].made / reduced[i].total * 1000) / 10).toFixed(2)
		const made = reduced[i].made
		const total = reduced[i].total
		
		reduced[i].percent = percent
	}

	return reduced
}

function getDistanceAverageThroughDay(days) {
	/* [{
		date: 20150101,
		shots: [{distanceBin: 2, made: 5, total: 10},...],
		},...]
	*/
	// add all days together
	// create distances obj
	const distanceData = createDistanceData()
	const emptyDistances = distanceData.reduce((previous, distanceBin) => {
		previous[distanceBin] = { made: 0, total: 0 }
		return previous
	}, {})

	const reduced = days.reduce((previous, day) => {
		day.distances.forEach(distance => {
			previous[distance.distanceBin].made += distance.values.made
			previous[distance.distanceBin].total += distance.values.total
		})
		return previous
	}, emptyDistances)
	
	for (let i in reduced) {
		const percent = +((reduced[i].made / reduced[i].total * 1000) / 10).toFixed(2)
		const made = reduced[i].made
		const total = reduced[i].total
		
		reduced[i].percent = percent
	}

	return reduced
}

function getAllZoneAverages(days) {
	/* 
		days: [{
			date: 20150101,
			shots: [{zoneName: 'paint', distanceBin: 1, made: true, shotX: 5, ...},...],
		},...]
	*/
	// go thru each zone and compute made / total
	const shotTotalsEachDay = days.map(day => {
		const zones = zoneNames.map(z => ({ zoneName: z, values: getZoneShots(z, day.shots)}))
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
	return days.map(day => {
		// get all shots up until this date
		const filtered = shotTotalsEachDay.filter(shotDay => +shotDay.date <= +day.date)
		const zones = getZoneAverageThroughDay(filtered)
		return { date: day.date, zones }
	})
}

function getAllDistanceAverages(days) {
	 /*
		days: [{
			date: 20150101,
			shots: [{zoneName: 'paint', distanceBin: 1, made: true, shotX: 5, ...},...],
		},...]
	*/
	// go thru each distance and compute made / total

	const distanceData = createDistanceData()
	const shotTotalsEachDay = days.map(day => {
		const distances = distanceData.map((val, i) => ({ distanceBin: i, values: getDistanceShots(i, day.shots)}))
		return { date: day.date, distances }
	})

	/* 
		shotTotalsEachDay: [{
			date: 20150101,
			distances: {
				distanceBin: 0,
				values: {made: 5, total: 10}
			}
		},...]
	*/

	// go through each day, and calculate percent thru that date
	return days.map(day => {
		// get all shots up until this date
		const filtered = shotTotalsEachDay.filter(shotDay => +shotDay.date <= +day.date)
		const distances = getDistanceAverageThroughDay(filtered)
		return { date: day.date, distances }
	})
}

// reduce / clean fields and determine shot zone
function cleanShot(d) {
	const shotX = +d['shot-x']
	const shotY = +d['shot-y']
	const distance = calculateDistance(shotX, shotY)
	const distanceBin = calculateDistanceBin(distance)
	const zoneName = getZoneFromShot({ x: shotX, y: shotY })
	const made = d.event.toLowerCase().indexOf('missed') < 0
	const gameDate = d.gamedate

	return { shotX, shotY, made, distance, distanceBin, zoneName, gameDate }
}

// remove first row and filter to current season
function clean(data) {
	const season = d[1].season
	return data
		.filter(d => d[1].season === season)
		.map(cleanShot)
}

function getDates(data) {
	const dateObject = data.reduce((allDates, d) => {
		allDates[d.gameDate] = true
		return allDates
	}, {})

	// sort and flatten
	return Object.keys(dateObject).sort((a,b) => (+a) - (+b))
}

function calculate(data) {
	// calculate each average by games through that date
	const dates = getDates(data)
	// get all shots on each date
	const shotsOnEachDate = dates.map(date => {
		const shots = data.filter(d => d.gameDate === date)
		return {date, shots}
	})

	// calculate average for each zone on each date
	const zoneAverages = getAllZoneAverages(shotsOnEachDate)
	// const distanceAverages = getAllDistanceAverages(shotsOnEachDate)

	return zoneAverages
}

function getAverages(data, cb) {
	const cleaned = clean(parsed)
	const calculated = calculate(cleaned)
	cb(null, calculated)
}

export default getAverages
