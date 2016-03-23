const expect = require('chai').expect
const basketballShotchart = require('./../build/index.js').basketballShotchart
const fs = require('fs')

// test('', (assert) => {



// 	assert.deepEqual(basketballShotchart(input), output)

// 	assert.end()

// })


describe('basketball transforms', () => {
	const input = JSON.parse(fs.readFileSync('./test/fixtures/input/basketball-shotchart.json', 'utf8'))
	const output = JSON.parse(fs.readFileSync('./test/fixtures/output/basketball-shotchart.json', 'utf8'))

	it('should match input', () => {
		expect(basketballShotchart(input)).to.deep.equal(output)
	})
})
