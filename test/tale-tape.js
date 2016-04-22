/* global describe, it, afterEach */
/* eslint-disable max-len */

import { expect } from 'chai'
import { taleTape } from './../src/index.js'
import { decode } from 'ent'

describe('taleTape', () => {

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

