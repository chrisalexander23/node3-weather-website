const request = require('request')

const forecast = (latitude, longitude, callback) => {
	const url = 'https://api.darksky.net/forecast/4f557c5254c67c2375b989689533694e/' + latitude + ',' + longitude

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to weather service!', undefined)
		} else if (body.error) {
			callback('Unable to find location', undefined)
		} else {
			const temperature = body.currently.temperature
			const precipProbability = body.currently.precipProbability
			const forecastString = body.daily.data[0].summary + " It is currently " + temperature + " degrees out. There is a " + precipProbability + "% chance of rain. The low for the day is " + body.daily.data[0].temperatureMin + " and the high is " + body.daily.data[0].temperatureMax + "."

			callback(undefined, forecastString)
		}
	})
}

module.exports = forecast