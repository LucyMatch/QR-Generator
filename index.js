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
                let oPath = '/' + outputDir + inputFile.split('.csv')[0]

                //read input file
                getInputs( iPath ) 
                .then( data => {

                    //create named directory for codes to live in
                    utilities.createDir( oPath )
                    .then( dir => { 

                        //loop thorugh each element in data & create a QR code to save in dir
                        data.forEach( d => {

                            let path = __dirname + dir + '/' + d.id + '.png'
                            let url = d.url

                            //create code
                            createCode( path, url )
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
        QRCode.toFile( path, url, {

            color:{
                dark: '#111',   //dark grey
                light: '#0000'  //transparent
            }

        }, function (err) {
            if(err) reject(err)
            resolve("Successfully Created")
        })
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



