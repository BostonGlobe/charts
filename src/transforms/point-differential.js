import formatFilters from './../utils/formatFilters.js'
import numbersToWords from './../utils/numbersToWords.js'

const options = {
	baseball: 'run',
}

const hed = ({ filters = {}, sport }) => {

	// hed format is going to be:
	// {team/batter}, season year
	const filtersMap = formatFilters(filters)

	const { teamNickname } = filtersMap

	// we must have a teamNickname
	if (!teamNickname) return ''

	const type = options[sport] || 'point'

	return `${teamNickname}: ${type} differential`

}

const subhed = ({ rows = [] }) => {

	const number = rows.length === 1 ? ' ' : ` ${numbersToWords(rows.length)} `
	const suffix = rows.length > 1 || rows.length === 0 ? 's' : ''

	return `Last${number}game${suffix}`

}

export default {
	hed,
	subhed,
}
