const request = require('postman-request');
const geocode = require('./geocode.js');
const forecast = require('./forecast.js');

const address = process.argv[2];
if(!address){
    console.log('Please provide an address');
}else{
    geocode(address, (error, {latitude, longitude, location}) =>{
        if(error){
            return console.log(error);
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return console.log(error);
            }
            console.log(location);
            console.log(latitude);
            console.log(forecastData);
        });
        
    });
}
console.log(process.argv);



