export default (rows) => {
	const sorted = rows
		.map(r => r)
		.sort((a, b) => (new Date(a.gameDateTime)) - (new Date(b.gameDateTime)))
	const latest = sorted.pop().gameDateTime

	const dateString = new Date(latest).toDateString()
	const split = dateString.split(' ')
	const output = `${split[1]}. ${+split[2]}`
	return output
}
