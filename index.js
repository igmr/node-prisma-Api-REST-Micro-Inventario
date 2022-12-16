const app = require('./app')
const con = require('./config')

const port = process.env.port || con.port

const runServer = ()=>{
	app.listen(port, () => console.info(`Server listening in http://localhost:${port}`))
}

const main = ()=>{
	runServer()
}


main()