import { expect } from 'chai'
import path from 'path'

import { convertRows } from './../src/index.js'
import { readJSON } from './utils.js'

const base = 'fixtures'

const input = readJSON(
	path.join(__dirname, base, 'baseball-spraychart-payload.json'))

const output = readJSON(
	path.join(__dirname, base, 'baseball-spraychart-converted-rows.json'))

describe('convertRows', () => {

	it('should work', () =>
		expect(JSON.stringify(convertRows(input), null, 2))
			.to.deep.equal(JSON.stringify(output, null, 2)))

})
