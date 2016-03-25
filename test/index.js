const fs = require('fs')
const expect = require('chai').expect
const basketballShotchart = require('./../build/index.js').basketballShotchart
const base = './test/fixtures/'

describe('basketball transforms', () => {
	const transformFile = 'basketball-shotchart-transform'
	const transformIn = JSON.parse(fs.readFileSync(`${base}/input/${transformFile}.json`, 'utf8'))
	const transformOut = JSON.parse(fs.readFileSync(`${base}/output/${transformFile}.json`, 'utf8'))

	it('transform should match', () => {
		expect(basketballShotchart.transform(transformIn)).to.deep.equal(transformOut)
	})

	const hedFile = 'basketball-shotchart-hed'
	const hedIn = JSON.parse(fs.readFileSync(`${base}/input/${hedFile}.json`, 'utf8'))
	const hedOut = 'Paul Millsap 2015-16'

	it('hed should match', () => {
		expect(basketballShotchart.hed({ rows: hedIn.rows })).to.deep.equal(hedOut)
	})

	const subhedFile = 'basketball-shotchart-subhed'
	const subhedIn = JSON.parse(fs.readFileSync(`${base}/input/${subhedFile}.json`, 'utf8'))
	const subhedOut = 'Effectiveness on all shots through Oct. 27'

	it('subhed should match', () => {
		expect(basketballShotchart.subhed({ rows: subhedIn.rows })).to.deep.equal(subhedOut)
	})
})
