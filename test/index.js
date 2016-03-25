const fs = require('fs')
const expect = require('chai').expect
const basketballShotchart = require('./../build/index.js').basketballShotchart
const baseballSpraychart = require('./../build/index.js').baseballSpraychart
const base = './test/fixtures/'

const readJSON = (name) =>
	JSON.parse(fs.readFileSync(name, 'utf8'))

describe('basketball', () => {

	it('transform should match', () => {

		const file = 'basketball-shotchart-transform'
		const input = readJSON(`${base}/input/${file}.json`)
		const output = readJSON(`${base}/output/${file}.json`)

		expect(basketballShotchart.transform(input))
			.to.deep.equal(output)
	})

	it('hed should match', () => {

		const file = 'basketball-shotchart-hed'
		const input = readJSON(`${base}/input/${file}.json`)
		const output = 'Paul Millsap 2015-16'

		expect(basketballShotchart.hed({ rows: input.rows }))
			.to.deep.equal(output)
	})

	it('subhed should match', () => {

		const file = 'basketball-shotchart-subhed'
		const input = readJSON(`${base}/input/${file}.json`)
		const output = 'Effectiveness on all shots through Oct. 27'

		expect(basketballShotchart.subhed({ rows: input.rows }))
			.to.deep.equal(output)
	})

})
