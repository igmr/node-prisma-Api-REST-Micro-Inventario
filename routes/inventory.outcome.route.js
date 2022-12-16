require('express-group-routes');
const {index, show, store, update, destroy} = require('./../controllers/inventory.outcome.controller')
const {checkFind, checkStore, checkEdit, checkDestroy} = require('./../validators/inventory.validator')

const inventoryOutcomeApi = (app)=>{
	app.group('/api/v1/', (router)=>{
		router.get('/inventory/outcome', index)
		router.get('/inventory/outcome/:id',checkFind, show)
		router.post('/inventory/outcome', checkStore, store)
		router.put('/inventory/outcome/:id', checkEdit, update)
		router.delete('/inventory/outcome/:id', checkDestroy, destroy)
	})
}

module.exports = inventoryOutcomeApi