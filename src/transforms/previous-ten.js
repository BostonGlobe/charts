import formatFilters from './../utils/formatFilters.js'
import numbersToWords from './../utils/numbersToWords.js'

const hed = ({ filters = {} }) => {

	// hed format is going to be:
	// {team/batter}, season year
	const filtersMap = formatFilters(filters)

	const { teamNickname } = filtersMap

	// we must have a teamNickname
	if (!teamNickname) return ''

	return `${teamNickname}`

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
