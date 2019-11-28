const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather App',
		name: 'Chris',
	})
})

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Page',
		name: 'Chris',
	})
})

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help Page',
		name: 'Chris',
		message: 'A Help Message'
	})
})

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'You must provide an address'
		})
	}

	// res.send({
	// 	location: 'Atlanta',
	// 	forecast: 'Sunny and Clear',
	// 	address: req.query.address
	// })

	geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
		if (error) {
			// return console.log('Error', error)
			return res.send({ error })
		}

		forecast(latitude, longitude, (error, forecastData) => {
		  	if (error) {
		  		// return console.log('Error', error)
		  		return res.send({ error })
		  	}

		  	// console.log(location)
		  	// console.log(forecastData)

		  	res.send({
		  		location,
		  		forecast: forecastData,
		  		address: req.query.address
		  	})
		})

	})


})


app.get('/products', (req, res) => {
	if (!req.query.search) {
		return res.send({
			error: 'You must provide a search term'
		})
	}

	console.log(req.query)
	res.send({
		products: []
	})
})

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404 page',
		name: 'Chris',
		message: 'Help article not found'
	})
})

app.get('*', (req, res) => {
	res.render('404', {
		title: '404 page',
		name: 'Chris',
		message: 'Page not found'
	})
})

app.listen(3000, () => {
	console.log('Server is up on port 3000.')
})