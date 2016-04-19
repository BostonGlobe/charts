import formatFilters from './../utils/formatFilters.js'

const hed = ({ filters = {} }) => {

	// hed format is going to be:
	// {team/batter}, season year
	const filtersMap = formatFilters(filters)

	const { teamNickname } = filtersMap

	// we must have a teamNickname
	if (!teamNickname) return ''

	return `${teamNickname}`

}

const subhed = () => 'Previous [rows.length] game(s)'

export default {
	hed,
	subhed,
}
