
const request = require('request')

const weather = (longitude, latitude, callback) => {
    const url= `http://api.weatherstack.com/current?access_key=917dbdc8875584b3a9067aeee1e58359&query=${longitude},${latitude}&units=s`
    request({ url: url, json: true}, (error, {body}) => {
        if(error){
            callback('Something went wrong', undefined)
        }else if(body.error){
            callback('Location not found', undefined)
        }else{
            callback(undefined, {
                location: body.location.name,
                forecast: `It is currently ${body.current.temperature} degrees and it feels like ${body.current.feelslike} degrees outside and it is ${body.current.weather_descriptions[0]}`
            })
            
        }
    })
}

module.exports = weather