const request = require('postman-request')

const geocode = (address,callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoia2FzcmEwMiIsImEiOiJja2ozMXh6MWQzaGxnMnNuNDFsbGJ2NmNhIn0.iUwOFVv9R1zxqsLad4PyWA&limit=1`
    request({url,json:true},(error, {body})=>{
            if(error){
                callback('unable to connect to location service', undefined)
            }else if(body.features.length===0){
                callback('unable to find location', undefined)
            }else{
                callback(undefined,{
                    latitude: body.features[0].center[0],
                    longtitude: body.features[0].center[0],
                    name: body.features[0].place_name
                })
            }
        }
    )
}
module.exports = geocode