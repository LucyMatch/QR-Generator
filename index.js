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
        .then( inputs => {

            //data is list of input files
            inputs.forEach( inputFile => {

                let iPath = '/' + inputDir + inputFile
                let oPath = '/' + outputDir + inputFile.split('.json')[0]

                //read input file
                getInputs( iPath ) 
                .then( data => {

                    //create named directory for codes to live in
                    utilities.createDir( oPath )
                    .then( dir => { 

                        //loop thorugh each element in data & create a QR code to save in dir
                        //@TODO: this may require more formatting when we change to .csv
                        data.forEach( d => {

                            //create code

                        } )

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

/* 
    retrieve list of data from input file
*/
const createCode = ( dir ) => {
    return new Promise( (resolve, reject) => {

    })
}

/* 
    ---------------------------------------------
    Run the thing! 
    ---------------------------------------------
*/
createCodes()
.then( data => console.log( '---- S U C C E S S ----' ))
.catch( err => {
    console.log( '---- A N  E R R O R  H A S  O C C U R E D ----' )
    if(err.msg)console.log( err.msg )
    console.log( err.error )
})



