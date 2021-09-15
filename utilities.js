const Promise = require('bluebird')
const fs = require('fs')

//@TODO: what would be best file format for our inputs?
//      maybe csv? so can be exported from spreadsheet?

//for loading local json files

function getLocalFile( path, description ){
    return new Promise( ( resolve, reject) => {
        let raw
		try {
			raw = fs.readFileSync(__dirname + path)
		} catch (err) {
			reject({
				msg: 'Failed to access local file : ' + description,
				error: err,
			})
		}
        let data = JSON.parse(raw)
		resolve(data)
    })
}

module.exports = { getLocalFile }