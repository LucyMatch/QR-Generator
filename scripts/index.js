const { QRCodeStyling } = require("@ckho/qr-code-styling/lib/qr-code-styling.common.js");
const nodeCanvas = require("canvas");
const Promise = require('bluebird')
const utilities = require('./utilities.js')
const path = require('path')
const fs = require('fs')

/* path variables */
const inputDir = path.join( __dirname, '..', 'input/' )
const outputDir = path.join( __dirname, '..', 'output/' )
const designOptsDir = path.join( __dirname, '..', 'design/' )

/* create output directory if doesnt exist */
if( !fs.existsSync( outputDir ) )
    fs.mkdirSync( outputDir )

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

                let iPath = path.join( inputDir, inputFile )
                let oPath = path.join( outputDir, inputFile.split('.csv')[0] )

                //read input file
                getInputs( iPath ) 
                .then( data => {

                    //create named directory for codes to live in
                    utilities.createDir( oPath )
                    .then( dir => { 

                        //loop thorugh each element in data & create a QR code to save in dir
                        data.forEach( d => {

                            let p = path.join( dir, d.id + '.png' )
                            let url = d.url

                            //get the design options
                            //we send the inputname as "batch name" - 
                            //to see if we have unique settings for this batch
                            getOptions( inputFile.split('.csv')[0], url )
                            .then( opts => {
                                createCode( p, opts )
                                .then( res => console.log( res + ' : ' + d.id ) )
                                .catch( err => reject(err) )
                            })
                            .catch( err => reject(err) )

                        } )
                        //complete promise if reaches here
                        resolve()
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
    checks if CSV or JSON
*/
const getInputs = ( path ) => {
    return new Promise( (resolve, reject) => {
        if(path.includes('.csv')){
            utilities.getLocalCSV( path )
            .then( data => resolve(data) )
            .catch(err => reject(err))
        }
    })
}

/* 
    get the design options

*/
const getOptions = ( batch_name, url ) => {
    return new Promise( (resolve, reject) => {

        //first determine if there is a specific design file
        //or if we are just using default options - i.e. render-options.json
        let p = designOptsDir + batch_name + '.json'
        if( !fs.existsSync( p ) ){
            p = designOptsDir + 'render-options.json'
        }

        utilities.getLocalFile( p )
        .then( options => {
            options.data = url;
            if(options.image)options.image = designOptsDir + options.image
            resolve(options)
        })
        .catch( err => reject({msg: 'Failed read settings file', error: err}))
    })
}


/* 
    create the codes!

*/

const createCode = ( path, opts ) => {
    return new Promise( (resolve, reject) => {

        const qr = new QRCodeStyling({ nodeCanvas, ...opts})

        qr.getRawData("png")
        .then( buffer => {
            try {
                fs.writeFileSync( path, buffer );
            } catch (err) {
                reject({msg: 'Failed to write local file', error: err})
            }
            resolve("Successfully Created")
        })
        .catch( err => reject({msg: 'Failed to write local file', error: err}))

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



