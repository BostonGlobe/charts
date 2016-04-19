const options = [
	'zero',
	'one',
	'two',
	'three',
	'four',
	'five',
	'six',
	'seven',
	'eight',
	'nine',
]

export default (n) => ((n > -1 && n < 10) ? options[n] : n)
