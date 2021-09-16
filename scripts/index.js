const QRCode = require('qrcode')
const Promise = require('bluebird')
const utilities = require('./utilities.js')
const path = require('path')
const fs = require('fs')

/* path variables */
const inputDir = path.join( __dirname, '..', 'input/' )
const outputDir = path.join( __dirname, '..', 'output/' )
const settingsPath = path.join( __dirname, '..', 'settings', 'render-options.json' )

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

                            // let p = __dirname + dir + '/' + d.id + '.png'
                            let p = path.join( dir, d.id + '.png' )
                            let url = d.url

                            //create code
                            createCode( p, url )
                            .then( res => console.log( res + ' : ' + d.id ) )
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
    retrieve list of data from input file
*/
const createCode = ( path, url ) => {
    return new Promise( (resolve, reject) => {

        //retrieve settings file
        utilities.getLocalFile( settingsPath )
        .then( data => {
            QRCode.toFile( path, url, {

                color:{
                    dark: data.color.dark,
                    light: data.color.light
                },
                width: data.width,
                margin: data.margin,
                scale : data.scale
    
            }, function (err) {
                if(err) reject(err)
                resolve("Successfully Created")
            })
        })
        .catch( err => reject(err) )
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



