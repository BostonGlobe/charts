import filtersToArray from './../utils/filtersToArray.js'
import { encode } from 'ent'

const hed = ({ filters = {} }) => {

	// hed format is going to be:
	// player vs player
	const filtersArray = filtersToArray(filters)

	const players = filtersArray.filter(f => f.key === 'player')

	// we must have players
	if (!players.length) return ''

	return encode(players
		.map(p => `<span>${p.value}</span>`)
		.join("<span class='vs'>vs</span>"))

}

export default {
	hed,
}

