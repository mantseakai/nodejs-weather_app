const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const requestIp = require('request-ip');
const geoip = require('geoip-lite');

const app = express()

const port = process.env.PORT || 3000

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
		name: 'Mantse Akai'
	})
})

app.get('/about', (req, res) =>{
	res.render('about',{
		title: 'About App',
		name: 'Mantse Akai'
	})
})

app.get('/help', (req, res) =>{
	res.render('help',{
		title: 'Help',
		message: 'Enter a location in the text box and client on search to view weather information of the provided location.',
		name: 'Mantse Akai'
			})
})

app.get('/weather', (req, res) =>{

	if(!req.query.auto_location)
	{
		if(!req.query.address){
			return res.send({
				error: 'Please provide address'
			})
		}
		else
		{
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
		
					const clientIp = requestIp.getClientIp(req); 
		
					const geo = geoip.lookup(clientIp);
					res.send({
						location: location,
						forecast: forecastData,
						address: req.query.address,
						ip_address: clientIp,
						geo: geo
					})
		
				})
		
				
				
		
			})
		}
	}
	else
	{
		console.log('Getting Forecast')
		const clientIp = requestIp.getClientIp(req); 

		const geo = geoip.lookup(clientIp);

		console.log(clientIp)
		forecast(geo.ll[0], geo.ll[1], (error, forecastData) => {
			if(error)
			{
		  		return res.send({ error})
			}

			res.send({
				location: geo.city,
				forecast: forecastData,
				address: req.query.address,
				geo: geo
			})

		})

	}
	


	


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

app.listen(port, () => {
	console.log('Server is up on port '+port)
})