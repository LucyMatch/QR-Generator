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

        //get all files in /input
        getInputFiles()
        .then( data => {

            //data is list of input files
            data.forEach( inputFile => {

                let iPath = '/' + inputDir + inputFile
                let oPath = '/' + outputDir + inputFile.split('.json')[0]

                //read input file
                getInputs( iPath ) 
                .then( data => {

                    //create named directory for codes to live in
                    utilities.createDir( oPath )
                    .then( dir => { 
                        console.log( 'hello' )
                        console.log( dir )

                        //loop thorugh each element in data & create a QR code to save in dir

                    })
                    .catch( err => reject(err) )
                })
                .catch( err => reject(err) )
            })

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
.then( data => console.log( '---- S U C C E S S ----' ))
.catch( err => {
    console.log( '---- A N  E R R O R  H A S  O C C U R E D ----' )
    if(err.msg)console.log( err.msg )
    console.log( err.error )
})



