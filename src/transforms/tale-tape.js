import filtersToArray from './../utils/filtersToArray.js'
import { encode } from 'ent'
import _ from 'lodash'

const hed = ({ filters = {} }) => {

	// hed format is going to be:
	// player vs player
	const filtersArray = filtersToArray(filters)

	const players = filtersArray.filter(f => f.key === 'playerName')

	// we must have players
	if (!players.length) return ''

	return encode(players
		.map(p => `<span class='player'>${p.value}</span>`)
		.join("<span class='vs'>vs</span>"))

}

const transform = ({ filters = {}, rows = [], groupBy = '' }) => {

	// get filter batters
	const names = _(filters)
		.map(value => value)
		.map('value')
		.value()

	return {
		rows: _.sortBy(rows, d => _.indexOf(names, d[groupBy])),
	}

}

export default {
	hed,
	transform,
}
