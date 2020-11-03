const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoib2x1d2FzZXlpMSIsImEiOiJja2V2eXhyOW4xdTBsMnduMGoyYTcyaTRwIn0.ERCgBbMvExyRSDh991amwA&limit=1`
    request({ url: url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect', undefined)
            //console.log('There is an error')
        }else if(body.message === 'Not Found'  || body.features.length === 0){
            callback('Unable to find Location. Try another search', undefined)
            //console.log('Sorry, we cant find the loaction')
        }else{
           
            callback(undefined, {
                 latitude: body.features[0].center[1],
                 longitude: body.features[0].center[0],
                 location: body.features[0].place_name
            })
        }
    })
}



module.exports = geocode