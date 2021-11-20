const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

//Define paths for Express Config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


//Setup Handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//Setup static directory
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) =>{
	res.render('index',{
		title: 'Weather App',
		name: 'Sky Skilo'
	})
})

app.get('/about', (req, res) =>{
	res.render('about',{
		title: 'About App',
		name: 'Sky Skilo'
	})
})

app.get('/help', (req, res) =>{
	res.render('help',{
		title: 'Help',
		message: 'Help message for the Weather App',
		name: 'Sky Skilo'
			})
})

app.get('/weather', (req, res) =>{

	if(!req.query.address){
		return res.send({
			error: 'Please provide address'
		})
	}


	geocode(req.query.address,(error, {latitude, longitude,location} = {}) => {
		if(error)
		{
			return res.send({
				error
			})
		}
		forecast(latitude, longitude, (error, forecastData) => {
			if(error)
			{
		  		return res.send({ error})
			}

			res.send({
				location: location,
				forecast: forecastData,
				address: req.query.address
			})

		})

		
		

	})


})


app.get('/products', (req, res) =>{

	if(!req.query.search)
	{
		return res.send({
			error: 'Search Term Missing'
		})
	}
	res.send({
		products:[]
	})
})

app.get('/help/*', (req, res) =>{
	res.render('404',{
		title: '404',
		name: 'Sky Skilo',
		message: 'Help Article Not Found',
	})
})

app.get('*', (req, res) =>{
	res.render('404',{
		title: '404',
		name: 'Sky Skilo',
		message: 'Looks like you are lost SPARKY!!!',
	})
})

app.listen(3000, () => {
	console.log('Server is up on port 3000')
})