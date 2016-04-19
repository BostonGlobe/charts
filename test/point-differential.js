/* global describe, it, afterEach */

import { expect } from 'chai'
import { pointDifferential } from './../src/index.js'

describe('pointDifferential', () => {

	it('hed should handle no filters', () =>
		expect(pointDifferential.hed({}))
			.to.deep.equal(''))

	it('hed should handle baseball teams', () =>
		expect(pointDifferential.hed({
			sport: 'baseball',
			filters: {
				team: {
					key: 'teamNickname',
					value: 'Red Sox',
				},
			},
		})).to.deep.equal('Red Sox: run differential'))

	it('hed should handle other teams', () =>
		expect(pointDifferential.hed({
			sport: 'basketball',
			filters: {
				team: {
					key: 'teamNickname',
					value: 'Celtics',
				},
			},
		})).to.deep.equal('Celtics: point differential'))

	it('subhed should handle zero games', () =>
		expect(pointDifferential.subhed({}))
			.to.deep.equal('Last zero games'))

	it('subhed should handle one game', () =>
		expect(pointDifferential.subhed({ rows: [1] }))
			.to.deep.equal('Last game'))

	it('subhed should handle two games', () =>
		expect(pointDifferential.subhed({ rows: [1, 2] }))
			.to.deep.equal('Last two games'))

	it('subhed should handle ten games', () =>
		expect(pointDifferential.subhed({
			rows: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }))
		.to.deep.equal('Last 10 games'))

})
