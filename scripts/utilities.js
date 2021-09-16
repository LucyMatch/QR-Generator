const Promise = require('bluebird')
const fs = require('fs')
const neatCsv = require('neat-csv')

/* 
    retrieves an array of all files in input folder
*/
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

/* 
    creates a new unique directory 
    that is named provided path name + current date / time
*/
function createDir( path ){
    return new Promise( ( resolve, reject) => {
        let newDir = path + '_' + createDateString()
        try {
            if( fs.existsSync( newDir ) ){
                reject({ error: 'directory already exists: ' + newDir,})
            }else{
                fs.mkdirSync( newDir )
            }
        } catch( err ){ 
            reject({
				msg: 'Failed create local output directory : ' + newDir,
				error: err,
			})
        }
        resolve( newDir )
    })
}

/* 
    retrieves local JSON file from provided path
    parses the JSON data into obj before returning
*/
function getLocalFile( path ){
    return new Promise( ( resolve, reject) => {
        let raw
		try {
			raw = fs.readFileSync( path )
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

/* 
    retrieves local CSV file from provided path
    parses the CSV data into obj before returning
*/
function getLocalCSV( path ){
    return new Promise( ( resolve, reject ) => {
        let raw
		try {
			raw = fs.readFileSync( path )
		} catch (err) {
			reject({msg: 'Failed to access local file', error: err})
		}
        //if success use csvparser
        neatCsv( raw )
        .then( data => resolve(data) )
        .catch( err => reject({ msg: 'Failed to parse CSV', error : err}))
    })
}

/* 
    outputs a formatted date string 
    to be used in file name + directory unique naming
*/
function createDateString( ){
    let d = new Date()
    return d.getMonth() + '_' + d.getDate() + '_' + d.getFullYear() + '_' + d.getHours()  + '_' + d.getMinutes()  + '_' + d.getSeconds()
}

module.exports = { getLocalFile, getLocalCSV, getDirList, createDir, createDateString }