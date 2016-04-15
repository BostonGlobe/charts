// const fs = require('fs')
// const expect = require('chai').expect

// const basketballShotchart = require('./../build/index.js').basketballShotchart
// const hockeyShotchart = require('./../build/index.js').hockeyShotchart
// const pointDifferential = require('./../build/index.js').pointDifferential

// const base = './test/fixtures'

// describe('point-differential', () => {

// 	it('hed should be hardcoded for now', () => {

// 		expect(pointDifferential.hed())
// 			.to.deep.equal('Run differential: last 10 games')

// 	})

// 	it('transform should return the last 10 games', () => {

// 		const file = 'point-differential'
// 		const input = readJSON(`${base}/input/${file}.json`)
// 		const output = readJSON(`${base}/output/${file}.json`)

// 		expect(pointDifferential.trimData(pointDifferential.transform(input)))
// 			.to.deep.equal(output)

// 	})

// })

// describe('basketball', () => {

// 	it('transform should match', () => {

// 		const file = 'basketball-shotchart-transform'
// 		const input = readJSON(`${base}/input/${file}.json`)
// 		const output = readJSON(`${base}/output/${file}.json`)

// 		expect(basketballShotchart.transform(input))
// 			.to.deep.equal(output)
// 	})

// 	it('hed should match', () => {

// 		const file = 'basketball-shotchart-after'
// 		const input = readJSON(`${base}/input/${file}.json`)
// 		const output = 'Paul Millsap 2015-16'

// 		expect(basketballShotchart.hed({ rows: input.rows, filters: input.filters }))
// 			.to.deep.equal(output)
// 	})

// 	it('subhed should match', () => {

// 		const file = 'basketball-shotchart-after'
// 		const input = readJSON(`${base}/input/${file}.json`)
// 		const output = 'Effectiveness on all shots through Oct. 27'

// 		expect(basketballShotchart.subhed({ rows: input.rows }))
// 			.to.deep.equal(output)
// 	})

// })

// describe('hockey', () => {

// 	it('transform should match', () => {

// 		const file = 'hockey-shotchart-transform'
// 		const input = readJSON(`${base}/input/${file}.json`)
// 		const output = readJSON(`${base}/output/${file}.json`)

// 		expect(hockeyShotchart.transform(input))
// 			.to.deep.equal(output)
// 	})

// 	it('subhed should match', () => {

// 		const file = 'hockey-shotchart-after'
// 		const input = readJSON(`${base}/input/${file}.json`)
// 		const output = 'All shots on the road through Oct. 8'

// 		expect(hockeyShotchart.subhed({ rows: input.rows, filters: input.filters }))
// 			.to.deep.equal(output)
// 	})

// })
