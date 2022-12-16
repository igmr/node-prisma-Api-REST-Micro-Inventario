//* Dependencia y módulos
const {validationResult} = require('express-validator')
const {respondFailValidationErrors} = require('./handleHttpResponse')

/**
 * *Validar solicitud
 * @param {response} req 
 * @param {response} res 
 * @param {next} next 
 * @returns {?next}
 */
const handleValidation = (req,res,next)=>{
	try{
		validationResult(req).throw()
		return next()
	}catch(error){
		respondFailValidationErrors(res,listError(error.array()))
		return
	}
}

/**
 * *Lista de errors
 * @param {array} errors 
 * @returns {array} 
 */
const listError = (errors)=>{
	const result = errors.map(error=>{
		return {param:error.param, msg:error.msg}
	})
	return result
}

//* Exportamos función
module.exports = handleValidation