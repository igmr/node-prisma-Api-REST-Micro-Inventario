const {matchedData} = require('express-validator')
const inventoryService = require('./../services/inventory.outcome.service')
const {respond, respondFail} = require('./../utils/handleHttpResponse')
const respondException = require('./../utils/handleException')

const index = async (req, res, next)=>{
	try{
		const data = await inventoryService.findAll()
		return respond(res,data)
	} catch (ex) {
		return respondException(res, ex)
	}
}

const show = async (req, res, next)=>{
	try{
		const {id} = matchedData(req, {locations:['params']})
		const data = await inventoryService.find(Number(id))
		return respond(res,data)
	} catch (ex) {
		return respondException(res, ex)
	}
}

const store = async (req, res, next)=>{
	try{
		req = matchedData(req, {locations:['body']})
		payload = {
			tipo: 'egreso',
			cantidad_capturado: Number(req.cantidad),
			cantidad: Number(req.cantidad)* -1,
			producto_id: Number(req.producto),
			almacen_id: Number(req.almacen),
		}
		const data = await inventoryService.store(payload)
		const {id} = data
		const inventario = await inventoryService.find(Number(id))
		return respond(res,inventario)
	} catch (ex) {
		console.log(ex)
		return respondException(res, ex)
	}
}

const update = async (req, res, next)=>{
	try{
		const {id} = matchedData(req, {locations:['params']})
		req = matchedData(req,{locations:['body']})
		const inventory = await inventoryService.find(Number(id))
		if(!inventory)
		{
			return respondFail(res, 'Movimiento no encontrado.')
		}
		if(Object.entries(req).length == 0)
		{
			return respondFail(res, 'Datos inválidos.')
		}
		let payload = req
		if(req.cantidad)
		{
			payload = {
				cantidad:Number(req.cantidad)*-1,
				cantidad_capturado:Number(req.cantidad),
			}
		}
		await inventoryService.update(Number(id), payload)
		const data = await inventoryService.find(Number(id))
		return respond(res,data)
	} catch (ex) {
		return respondException(res, ex)
	}
}

const destroy = async (req, res, next)=>{
	try{
		const {id} = matchedData(req, {locations:['params']})
		const inventory = await inventoryService.find(Number(id))
		if(!inventory)
		{
			return respondFail(res, 'Movimiento no encontrado.')
		}
		const data = await inventoryService.destroy(Number(id))
		return respond(res,data)
	} catch (ex) {
		return respondException(res, ex)
	}
}


module.exports= {index, show, store, update, destroy}