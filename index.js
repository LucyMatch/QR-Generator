const QRCode = require('qrcode')
const Promise = require('bluebird')
const utilities = require('./utilities.js')

/* path variables */
const inputDir = 'input/'
const outputDir = 'output/'

/* 
    main function to call - to start chain of functions
*/
const createCodes = () => {
    return new Promise( (resolve, reject) => {

        getInputFiles()
        .then( data => {

            //data is list of input files
            data.forEach( inputFile => {

                //now we must read the actual inputFile
                let iPath = '/' + inputDir + inputFile
                let oPath = '/' + outputDir + inputFile.split('.json')[0]
                
                getInputs( iPath ) 
                .then( data => {

                    //loop thorugh each element in data & create a QR code to save

                })
                .catch( err => reject(err) )
            });
        })
        .catch( err => reject(err) )

    })
}

/* 
    retrieve list of "input groups"
    i.e. all input data files
*/
const getInputFiles = () => {
    return new Promise( (resolve, reject) => {
        utilities.getDirList( inputDir )
        .then( data => resolve(data) )
        .catch(err => reject(err))
    })
}

/* 
    retrieve list of data from input file
*/
const getInputs = ( path ) => {
    return new Promise( (resolve, reject) => {
        utilities.getLocalFile( path )
        .then( data => resolve(data) )
        .catch(err => reject(err))
    })
}

//start build flow
createCodes()
.then( data => console.log( 'SUCCESS' ))
.catch( err => console.log( err.error ))



