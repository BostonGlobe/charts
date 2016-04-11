import { expect } from 'chai'
import path from 'path'

import { baseballSpraychart } from './../src/index.js'
import { readJSON } from './utils.js'

const base = 'fixtures/input'
const input = readJSON(
	path.join(__dirname, base, 'baseball-spraychart.json'))

describe('baseball', () => {

	it('hed should handle no data', () =>
		expect(baseballSpraychart.hed({}))
			.to.deep.equal(''))

	it('hed should handle data and no filters', () =>
		expect(baseballSpraychart.hed({ rows: input.rows }))
			.to.deep.equal(''))

	it('hed should handle team filter', () =>
		expect(baseballSpraychart.hed({
			rows: input.rows,
			filters: {
				team: 'Red Sox'
			},
		})).to.deep.equal('Red Sox, 2016'))

	it('hed should handle batter filter', () =>
		expect(baseballSpraychart.hed({
			rows: input.rows,
			filters: {
				batter: 'David Ortiz'
			},
		})).to.deep.equal('David Ortiz, 2016'))

	it('subhed should return blank for now', () =>
		expect(baseballSpraychart.subhed({}))
			.to.deep.equal(''))

})
