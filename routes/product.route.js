require('express-group-routes');
const {index, show, store, update} = require('./../controllers/product.controllers')
const {checkFind, checkStore, checkEdit} = require('./../validators/product.validator')

const productApi = (app)=>{
	app.group('/api/v1/', (router)=>{
		router.get('/producto', index)
		router.get('/producto/:id',checkFind, show)
		router.post('/producto', checkStore, store)
		router.put('/producto/:id', checkEdit, update)
	})
}

module.exports = productApi