/* global describe, it, afterEach */

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
					key: 'player',
					value: 'Player One',
				},
				playerB: {
					key: 'player',
					value: 'Player Two',
				},
			},
		}))).to.deep.equal("<span>Player One</span><span class='vs'>vs</span><span>Player Two</span>"))

})

