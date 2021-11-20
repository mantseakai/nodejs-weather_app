//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)
const request = require('request')

const forecast = (latitude, longitude, callback) =>{


  const url = 'http://api.weatherstack.com/current?access_key=df39467abefcf470e8f45d2efa6e519f&query='+longitude+','+latitude+'&units=f'

  request({ url , json: true}, (error,{body}) =>{

   if(error)
   {
     callback('Connection Error! Check internet!', undefined)
   }
   else if(body.error)
   {
     callback('Unable to get location!',undefined)
   }
   else
   {
     callback(undefined,{
      description: body.current.weather_descriptions[0],
      temperature: body.current.temperature,
      feelslike: body.current.feelslike
     })
   }
  })

}


module.exports = forecast