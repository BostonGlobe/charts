/* global describe, it, afterEach */

import { expect } from 'chai'
import path from 'path'

import { basketballShotchart } from './../src/index.js'
import { readJSON } from './utils.js'

const base = 'fixtures'

const input = readJSON(
	path.join(__dirname, base, 'basketball-shotchart-payload.json'))

describe('basketball', () => {

	it('hed should handle no data or filters', () =>
		expect(basketballShotchart.hed({}))
			.to.deep.equal(''))

	it('hed should handle no filters', () =>
		expect(basketballShotchart.hed({ rows: input.rows }))
			.to.deep.equal(''))

	it('hed should handle team filter', () =>
		expect(basketballShotchart.hed({
			rows: input.rows,
			filters: {
				teamA: {
					key: 'teamNickname',
					value: 'Hawks',
				},
			},
		})).to.deep.equal('Hawks, 2015-16'))

	it('hed should handle player filter', () =>
		expect(basketballShotchart.hed({
			rows: input.rows,
			filters: {
				playerA: {
					key: 'player',
					value: 'Paul Millsap',
				},
			},
		})).to.deep.equal('Paul Millsap, 2015-16'))

	it('subhed should handle no data or filters', () =>
		expect(basketballShotchart.subhed({}))
			.to.deep.equal(''))

	it('subhed should handle team or player', () =>
		expect(basketballShotchart.subhed({
			rows: input.rows,
			filters: {
				teamA: {
					key: 'teamNickname',
					value: 'Hawks',
				},
			},
		})).to.deep.equal('Effectiveness on all shots through Oct. 27'))

	it('subhed should handle quarter', () =>
		expect(basketballShotchart.subhed({
			rows: input.rows,
			filters: {
				quarter: {
					key: 'quarter',
					value: '3',
				},
			},
		})).to.deep.equal('Effectiveness on all shots in the 3rd quarter through Oct. 27'))
})
