const Promise = require('bluebird')
const fs = require('fs')

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
                fs.mkdirSync(__dirname + newDir)
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

/* 
    outputs a formatted date string 
    to be used in file name + directory unique naming
*/
function createDateString( ){
    let d = new Date()
    return d.getMonth() + '_' + d.getDate() + '_' + d.getFullYear() + '_' + d.getHours()  + '_' + d.getMinutes()  + '_' + d.getSeconds()
}

module.exports = { getLocalFile, getDirList, createDir, createDateString }