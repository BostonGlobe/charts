import fs from 'fs'

const readJSON = (name) =>
	JSON.parse(fs.readFileSync(name, 'utf8'))

export { readJSON }
