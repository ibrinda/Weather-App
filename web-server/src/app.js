const path = require('path');
const express = require('express');
const hbs = require('hbs');
const output = require('image-output');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

//apply this for nodemon to refresh!
const app = express();

// console.log(__dirname);
// console.log(path.join(__dirname,'../public'));

const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../views');
const partialsPath = path.join(__dirname,'../views/partials');

app.set('view engine', 'hbs');
app.set('views',viewsPath);

app.use(express.static(publicDirectoryPath));
hbs.registerPartials(partialsPath);

app.get('/about',(req, res)=>{
    res.render('about',{
        title: 'About',
        name: 'Brinda'
    });
   });

app.get('/help',(req, res)=>{
    res.render('help',{
        
        title: 'Help',
        name: 'Brinda',
        text: 'This is some helpful text.',
    });
   });
   
app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Brinda'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        });
    }
    
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>{
        if(error){
            return res.send({ error });
        }

        forecast(latitude, longitude, (error, forecastData )=>{
            if(error){
                return res.send({ error });
            }
            
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        });

    });
   
});

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Brinda',
        errorMessage: 'Help article not found'
    });
});

app.get('*',(req,res) => {
    res.render('404',{
        title: '404',
        name: 'Brinda',
        errorMessage: 'Page not found'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
});