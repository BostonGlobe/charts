/* global describe, it, afterEach */

import { expect } from 'chai'
import { previousTen } from './../src/index.js'

describe('previousTen', () => {

	it('hed should handle no filters', () =>
		expect(previousTen.hed({}))
			.to.deep.equal(''))

	it('hed should display the team', () =>
		expect(previousTen.hed({
			sport: 'baseball',
			filters: {
				teamA: {
					key: 'teamNickname',
					value: 'Red Sox',
				},
			},
		})).to.deep.equal('Red Sox'))

	it('subhed should handle zero games', () =>
		expect(previousTen.subhed({}))
			.to.deep.equal('Last zero games'))

	it('subhed should handle one game', () =>
		expect(previousTen.subhed({ rows: [1] }))
			.to.deep.equal('Last game'))

	it('subhed should handle two games', () =>
		expect(previousTen.subhed({ rows: [1, 2] }))
			.to.deep.equal('Last two games'))

	it('subhed should handle ten games', () =>
		expect(previousTen.subhed({
			rows: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }))
		.to.deep.equal('Last 10 games'))

})

