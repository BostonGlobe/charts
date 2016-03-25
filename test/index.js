const expect = require('chai').expect
const basketballShotchart = require('./../build/index.js').basketballShotchart
const fs = require('fs')

describe('basketball transforms', () => {
	const input = JSON.parse(fs.readFileSync('./test/fixtures/input/basketball-shotchart.json', 'utf8'))
	const output = JSON.parse(fs.readFileSync('./test/fixtures/output/basketball-shotchart.json', 'utf8'))

	it('should match input', () => {
		expect(basketballShotchart.transform(input)).to.deep.equal(output)
	})
})
