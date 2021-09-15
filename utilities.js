const Promise = require('bluebird')
const fs = require('fs')

function getDirList( path ){
    return new Promise( ( resolve, reject) => {
        let data
        try {
            data = fs.readdirSync( path )
        }catch (err){
            reject({
				msg: 'Failed to access local directory',
				error: err,
			})
        }
        resolve( data )
    })
}

//@TODO: change this to .csvs - so a spreadsheet can be exported + added
//for loading local json files
function getLocalFile( path ){
    return new Promise( ( resolve, reject) => {
        let raw
		try {
			raw = fs.readFileSync(__dirname + path)
		} catch (err) {
			reject({
				msg: 'Failed to access local file',
				error: err,
			})
		}
        let data = JSON.parse(raw)
		resolve(data)
    })
}

module.exports = { getLocalFile, getDirList }