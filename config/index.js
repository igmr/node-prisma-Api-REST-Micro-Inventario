require('dotenv').config()

const config = {
	port : process.env.APP_PORT,
	settingsCors : {
		origin: '*',
		methods: 'GET,PUT,POST,DELETE',
		preflightContinue: false,
		optionsSuccessStatus: 200
	},
}

module.exports = config