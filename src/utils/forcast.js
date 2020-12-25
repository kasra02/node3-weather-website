const request = require('postman-request')
// const url2 = "http://api.weatherstack.com/current?access_key=6ffb6f5609ecb2fa5060f1c92bb121e3&query=37.2682,49.5891&units=f"

const forcast = (lat,long,callback) => {
    const url = `http://api.weatherstack.com/current?access_key=6ffb6f5609ecb2fa5060f1c92bb121e3&query=${lat},${long}&units=f`
    request({url:url,json:true},(error, {body})=>{
        if(error){
            callback(error.code,undefined)
        }else if(body.success === false){
            switch (body.error.code){
                case 601:
                    callback("Please specify a valid location identifier using the query parameter",undefined)
                case 615:
                    callback("another",undefined)
                default:
                    callback("error default",undefined)
            }
        }else{
            callback(undefined,body.current.temperature)

        }
    })
}

module.exports = forcast