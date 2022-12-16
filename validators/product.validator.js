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
	check('nombre')
		.notEmpty()
			.withMessage('Es requerido.')
		.isLength({max:120})
			.withMessage('Excede el número máximo de caracteres.')
		.trim()
		.escape(),
	check('descripcion')
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
	check('nombre')
		.isLength({max:120})
			.withMessage('Excede el número máximo de caracteres.')
		.trim()
		.escape()
		.optional(),
	check('descripcion')
		.isLength({max:255})
			.withMessage('Excede el número máximo de caracteres.')
		.trim()
		.escape()
		.optional(),
	(req,res,next)=>{ return handleValidation(req,res,next) }
]

module.exports = {checkFind, checkStore, checkEdit}
