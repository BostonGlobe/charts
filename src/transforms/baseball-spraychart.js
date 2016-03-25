const hed = ({ rows = [], filters }) => {

	// hed format is going to be:
	// {team/batter}, season year

	const { team, batter } = filters

	const { gamedate } = rows[0] || {}

	// we must have either a team or batter, and gamedate
	if (!((team || batter) && gamedate)) return ''

	const year = gamedate && gamedate.slice(0, 4)

	return `${batter || team}, ${year}`

}

const subhed = ({ rows, filters }) => rows[0] + filters[0]

export default {
	hed,
	subhed,
}
