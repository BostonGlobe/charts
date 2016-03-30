import _ from 'lodash'

const trimData = (data) => ({
	...data,
	rows: data.rows.map(row =>
		_.pick(row, [
			'index',
			'gamedate',
			'gameno',
			'run-differential',
		])),
})

const transform = (data) => ({
	rows: data.values.length ?
		data.values.slice(-10) :
		[],
})

const hed = () => 'Run differential: last 10 games'

export default {
	transform,
	trimData,
	hed,
}
