const {check} = require('express-validator')
const handleValidation = require('./../utils/handleValidator')

const checkFind = [
	check('id')
		.notEmpty()
			.withMessage('Es requerido.')
		.isNumeric()
			.withMessage('Debe ser numérico')
		.custom(value =>{
			if(Number(value) <= 0)
			{
				throw new Error('Valor inválido.')
			}
			return true
		})
		.trim()
		.escape(),
	(req,res,next)=>{ return handleValidation(req,res,next) }
]

const checkStore = [
	check('producto')
		.notEmpty()
			.withMessage('Es requerido.')
		.isNumeric()
			.withMessage('Debe ser numérico')
		.custom(value =>{
			if(Number(value) <= 0)
			{
				throw new Error('Valor inválido.')
			}
			return true
		})
		.trim()
		.escape(),
	check('almacen')
		.notEmpty()
			.withMessage('Es requerido.')
		.isNumeric()
			.withMessage('Debe ser numérico')
		.custom(value =>{
			if(Number(value) <= 0)
			{
				throw new Error('Valor inválido.')
			}
			return true
		})
		.trim()
		.escape(),
	check('cantidad')
		.notEmpty()
			.withMessage('Es requerido.')
		.isNumeric()
			.withMessage('Debe ser numérico')
		.custom(value =>{
			if(Number(value) <= 0)
			{
				throw new Error('Valor inválido.')
			}
			return true
		})
		.trim()
		.escape(),
	check('nota')
		.isLength({max:255})
			.withMessage('Excede el número máximo de caracteres.')
		.trim()
		.escape()
		.optional(),
	(req,res,next)=>{ return handleValidation(req,res,next) }
]

const checkEdit = [
	check('id')
		.notEmpty()
			.withMessage('Es requerido.')
		.isNumeric()
			.withMessage('Debe ser numérico')
		.custom(value =>{
			if(Number(value) <= 0)
			{
				throw new Error('Valor inválido.')
			}
			return true
		})
		.trim()
		.escape(),
	check('cantidad')
		.isNumeric()
			.withMessage('Debe ser numérico')
		.custom(value =>{
			if(Number(value) <= 0)
			{
				throw new Error('Valor inválido.')
			}
			return true
		})
		.trim()
		.escape()
		.optional(),
	check('nota')
		.isLength({max:255})
			.withMessage('Excede el número máximo de caracteres.')
		.trim()
		.escape()
		.optional(),
	(req,res,next)=>{ return handleValidation(req,res,next) }
]

const checkDestroy = [
	check('id')
		.notEmpty()
			.withMessage('Es requerido.')
		.isNumeric()
			.withMessage('Debe ser numérico')
		.custom(value =>{
			if(Number(value) <= 0)
			{
				throw new Error('Valor inválido.')
			}
			return true
		})
		.trim()
		.escape(),
	(req,res,next)=>{ return handleValidation(req,res,next) }
]

module.exports = {checkFind, checkStore, checkEdit, checkDestroy}
