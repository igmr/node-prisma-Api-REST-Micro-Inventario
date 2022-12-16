require('express-group-routes');
const {index, show, store, update, destroy} = require('./../controllers/inventory.income.controller')
const {checkFind, checkStore, checkEdit, checkDestroy} = require('./../validators/inventory.validator')

const inventoryIncomeApi = (app)=>{
	app.group('/api/v1/', (router)=>{
		router.get('/inventory/income', index)
		router.get('/inventory/income/:id',checkFind, show)
		router.post('/inventory/income', checkStore, store)
		router.put('/inventory/income/:id', checkEdit, update)
		router.delete('/inventory/income/:id', checkDestroy, destroy)
	})
}

module.exports = inventoryIncomeApi