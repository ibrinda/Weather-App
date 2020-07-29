const request = require('postman-request');
const forecast = (latitude, longitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=afba907fc1fae614400dbd43490bf89b&query='+ latitude + ',' + longitude +'&units=m';

    request({ url, json:true },(error, { body }) => {
            if(error){
                callback('Unable to connect to weather service !',undefined);
            }else if(body.error){
                callback('Unable to find the location', undefined);
            }else{
                callback(undefined, body.current.weather_descriptions[0] + '... It is currently ' + body.current.temperature + ' degrees out. And it feels like ' + body.current.feelslike + ' degrees out.');
            }
    });
};
module.exports = forecast; 