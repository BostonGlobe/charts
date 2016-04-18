import { expect } from 'chai'
import path from 'path'

import { hockeyShotchart } from './../src/index.js'
import { readJSON } from './utils.js'

const base = 'fixtures'

const input = readJSON(
	path.join(__dirname, base, 'hockey-shotchart-payload.json'))

describe('hockey', () => {

	it('hed should handle no data or filters', () =>
		expect(hockeyShotchart.hed({}))
			.to.deep.equal(''))

	it('hed should handle no filters', () =>
		expect(hockeyShotchart.hed({ rows: input.rows }))
			.to.deep.equal(''))

	it('hed should handle team filter', () =>
		expect(hockeyShotchart.hed({
			rows: input.rows,
			filters: {
				team: {
					key: 'teamNickname',
					value: 'Bruins',
				},
			},
		})).to.deep.equal('Bruins, 2015-16'))

	it('hed should handle player filter', () =>
		expect(hockeyShotchart.hed({
			rows: input.rows,
			filters: {
				player: {
					key: 'player',
					value: 'Torey Krug',
				},
			},
		})).to.deep.equal('Torey Krug, 2015-16'))

	it('subhed should handle no data or filters', () =>
		expect(hockeyShotchart.subhed({}))
			.to.deep.equal(''))

	it('subhed should handle team or player', () =>
		expect(hockeyShotchart.subhed({
			rows: input.rows,
			filters: {
				team: {
					key: 'teamNickname',
					value: 'Bruins',
				},
			},
		})).to.deep.equal('All shots through Oct. 8'))

	it('subhed should handle home/away', () =>
		expect(hockeyShotchart.subhed({
			rows: input.rows,
			filters: {
				home: {
					key: 'home',
					value: false,
				},
			},
		})).to.deep.equal('All shots on the road through Oct. 8'))

	it('subhed should handle power play', () =>
		expect(hockeyShotchart.subhed({
			rows: input.rows,
			filters: {
				powerPlay: {
					key: 'powerPlay',
					value: true,
				},
			},
		})).to.deep.equal('All shots on a power play through Oct. 8'))

	it('subhed should handle opponent', () =>
		expect(hockeyShotchart.subhed({
			rows: input.rows,
			filters: {
				opponent: {
					key: 'opponentNickname',
					value: 'Jets',
				},
			},
		})).to.deep.equal('All shots against the Jets through Oct. 8'))
})
