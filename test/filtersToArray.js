/* global describe, it, afterEach */

import { expect } from 'chai'
import path from 'path'

import filtersToArray from './../src/utils/filtersToArray.js'

describe('filtersToArray', () => {

	it('should deal with unique filters', () =>
		 expect(filtersToArray({
			 player: {
				 key: 'player',
				 value: 'David Ortiz',
			 },
			 team: {
				 key: 'teamNickname',
				 value: 'Red Sox',
			 },
		 }))
		 .to.deep.equal([
			 {
				 key: 'player',
				 value: 'David Ortiz',
			 },
			 {
				 key: 'teamNickname',
				 value: 'Red Sox',
			 },
		 ]))

	it('should deal with duplicate filters', () =>
		 expect(filtersToArray({
			 playerA: {
				 key: 'player',
				 value: 'David Ortiz',
			 },
			 playerB: {
				 key: 'player',
				 value: 'Dustin Pedroia',
			 },
			 team: {
				 key: 'teamNickname',
				 value: 'Red Sox',
			 },
		 }))
		 .to.deep.equal([
			 {
				 key: 'player',
				 value: 'David Ortiz',
			 },
			 {
				 key: 'player',
				 value: 'Dustin Pedroia',
			 },
			 {
				 key: 'teamNickname',
				 value: 'Red Sox',
			 },
		 ]))

})

