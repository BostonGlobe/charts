const test = require('tape')
const basketballShotchart = require('./../build/index.js').basketballShotchart
const fs = require('fs')

test('', (assert) => {

	const input = JSON.parse(fs.readFileSync('./test/fixtures/input/basketball-shotchart.json', 'utf8'))

	const output = JSON.parse(fs.readFileSync('./test/fixtures/output/basketball-shotchart.json', 'utf8'))

	assert.deepEqual(basketballShotchart(input), output)

	assert.end()

})
