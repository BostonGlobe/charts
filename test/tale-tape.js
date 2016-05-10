/* global describe, it, afterEach */
/* eslint-disable max-len */

import { expect } from 'chai'
import { taleTape } from './../src/index.js'
import { decode } from 'ent'
import path from 'path'

import { readJSON } from './utils.js'

const base = 'fixtures'

const input = readJSON(
	path.join(__dirname, base, 'tale-tape-payload.json'))

describe('taleTape', () => {

	it('transform should order rows by filters', () => {
		expect(taleTape.transform({
			...input,
			filters: {
				playerA: {
					key: 'batter',
					value: 'Dustin Pedroia',
					_type: 'baseball-spraychart',
				},
				playerB: {
					key: 'batter',
					value: 'David Ortiz',
					_type: 'baseball-spraychart',
				},
			},
		})).to.deep.equal({
			rows: [
				{
					_type: 'baseball-spraychart',
					balls: '1',
					batter: 'Dustin Pedroia',
					id: 'AVQ0UvNk9ilYSCdakois',
					outs: '1',
					strikes: '1',
				},
				{
					_type: 'baseball-spraychart',
					balls: '0',
					batter: 'David Ortiz',
					id: 'AVQ0UvNl9ilYSCdako3c',
					outs: '3',
					strikes: '1',
				},
			],
		})
	})

	it('hed should handle no players', () =>
		expect(taleTape.hed({
			filters: {
				eventA: {
					key: 'event',
					value: 'Out',
				},
			},
		})).to.deep.equal(''))

	it('hed should handle players', () =>
		expect(decode(taleTape.hed({
			filters: {
				playerA: {
					key: 'playerName',
					value: 'Player One',
				},
				playerB: {
					key: 'playerName',
					value: 'Player Two',
				},
			},
		}))).to.deep.equal("<span class='player'>Player One</span><span class='vs'>vs</span><span class='player'>Player Two</span>"))

})

