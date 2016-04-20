import filtersToArray from './../utils/filtersToArray.js'
import numbersToWords from './../utils/numbersToWords.js'

const options = {
	baseball: 'run',
}

const hed = ({ filters = {}, sport }) => {

	// hed format is going to be:
	// {team/batter}, season year
	const filtersArray = filtersToArray(filters)

	const teamNickname = filtersArray
		.find(f => f.key === 'teamNickname')

	// we must have a teamNickname
	if (!teamNickname) return ''

	const type = options[sport] || 'point'

	return `${teamNickname.value}: ${type} differential`

}

const subhed = ({ rows = [] }) => {

	const number = rows.length === 1 ?
		' ' : ` ${numbersToWords(rows.length)} `

	const suffix = rows.length > 1 || rows.length === 0 ? 's' : ''

	return `Last${number}game${suffix}`

}

export default {
	hed,
	subhed,
}
