const weather = require('./utils/weather.js')
const geocode = require('./utils/geocode.js')

const hbs = require('hbs');
const path = require('path')
const express = require('express')

//console.log(__dirname)


//console.log(path.join(__dirname, '../public'))
 
const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join( __dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)


app.use(express.static(publicDirectoryPath))

//set up route handlers

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Oluwaseyi'

    })
})

// app.get('/', (req, res) => {
//     //allows us send something back to the requester 
//     res.send('<h1>wet</h1>')
// })

app.get('/help', (req, res) => { 
    res.render('help', {
        helpText: 'This is the help page',
        title: 'help',
        name: 'Aimudo Oluwaseyi'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about me',
        name: 'Aimudo Oluwaseyi'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please put in an address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
        }else{
            weather(latitude, longitude, (error, forecastData, img) => {
                if(error){
                    return res.send({error})
                }
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address,
                    img
                })
            })
        }
    })
})

app.get('/products', (req,res) => {
    if(!req.query.search ){
       return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('*', {
        title: '404 Page',
        name: 'Aimudo Oluwaseyi',
        errorMessage: 'This is an error page for help'
    })
})

app.get('*', (req, res) => {
    res.render('*', {
        title: '404 Page',
        name: 'Aimudo Oluwaseyi',
        errorMessage: 'This is an error page'
    })
})



//Start the server up

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

