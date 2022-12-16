require('express-group-routes');
const {index, show, store, update} = require('./../controllers/depot.controller')
const {checkFind, checkStore, checkEdit} = require('./../validators/depot.validator')

const depotApi = (app)=>{
	app.group('/api/v1/', (router)=>{
		router.get('/almacen', index)
		router.get('/almacen/:id',checkFind, show)
		router.post('/almacen', checkStore, store)
		router.put('/almacen/:id', checkEdit, update)
	})
}

module.exports = depotApi