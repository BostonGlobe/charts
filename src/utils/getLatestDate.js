export default (rows) => {
	const sorted = rows
		.map(r => r)
		.filter(r => r.gameDateTime)
		.sort((a, b) => (new Date(b.gameDateTime)) - (new Date(a.gameDateTime)))
	const latest = sorted[0].gameDateTime

	const dateString = new Date(latest).toDateString()
	const split = dateString.split(' ')
	const output = `${split[1]}. ${+split[2]}`
	return output
}
