const {matchedData} = require('express-validator')
const productService = require('./../services/product.service')
const {respond, respondFail} = require('./../utils/handleHttpResponse')
const respondException = require('./../utils/handleException')

const index = async (req, res, next) =>{
	try {
		const data = await productService.findAll()
		return respond(res,data)
	} catch (ex) {
		return respondException(res, ex)
	}
}

const show = async (req, res, next)=>{
	try {
		const {id} = matchedData(req, {locations:['params']})
		const data = await productService.find(Number(id))
		return respond(res,data)
	} catch (ex) {
		return respondException(res, ex)
	}
}

const store = async(req, res, next)=>{
	try {
		const payload = matchedData(req, {locations:['body']})
		const data = await productService.store(payload)
		const {id} = data
		const product = await productService.find(Number(id))
		return respond(res,product)
	} catch (ex) {
		return respondException(res, ex)
	}
}

const update = async(req, res, next)=>{
	try {
		const {id} = matchedData(req, { locations:['params']})
		const payload = matchedData(req, { locations:['body']})
		if(Object.entries(payload).length == 0)
		{
			return respondFail(res, 'Datos no encontrados.')
		}
		const data = await productService.find(Number(id))
		if(!data)
		{
			return respondFail(res, 'Producto no localizado.')
		}
		await productService.update(Number(id), payload)
		const depot = await productService.find(Number(id))
		return respond(res,depot)
	} catch (ex) {
		return respondException(res, ex)
	}
}

module.exports = {index, show, store, update}