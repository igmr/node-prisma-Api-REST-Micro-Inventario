
/**
 * * HTTP: 200
 * @param {response} res 
 * @param {object || string} data 
 * @param {int} code 
 * @returns {response}
 */
const respond = (res, data, code = 200)=>{
	if(typeof data === 'string')
		return res.status(code).json( { messages: data, })
	if(!data)
		return res.status(code).json({})
	if(Array.isArray(data))
		return res.status(code).json(data)
	if (Object.entries(data).length > 0)
		return res.status(code).json(data)
	if (Object.entries(data).length == 0)
		return res.status(code).json({})
}

/**
 * * HTTP: 200
 * @param {response} res 
 * @param {object} data 
 * @param {int} code 
 * @returns {response}
 */
const respondDeleted = (res, data = 'Deleted', code = 200)=>{
	return res.status(code).json( { messages: data, })
}

/**
 * * HTTP: 201
 * @param {response} res 
 * @param {object} data 
 * @returns {response}
 */
const respondCreated = (res, data = {})=>{
	return res.status(201).json(data)
}

/**
 * * HTTP: 400
 * @param {response} res 
 * @param {string} errorMessage 
 * @param {int} code 
 * @param {string} codeError 
 * @returns {response}
 */
const respondFail = (res, errorMessage = 'Bad request', code = 400, codeError = '')=>{
	if(codeError == '')
		codeError = code
	const payload = {
		status: code,
		code: codeError,
		messages: errorMessage,
	}
	return res.status(code).json(payload)
}

/**
 * * HTTP: 400
 * @param {response} res 
 * @param {object} data 
 * @returns {response}
 */
const respondFailValidationErrors = (res, data = {})=>{
	let payload = {}
	if(Array.isArray(data))
		payload = data
	else
		payload = { message: data }
	return res.status(400).json(payload)
}

/**
 * * HTTP: 401
 * @param {response} res 
 * @param {string} message 
 * @returns {response}
 */
const respondUnauthorized = (res, message = 'Unauthorized')=>{
	const payload = { message, }
	return res.status(401).json(payload)
}

/**
 * * HTTP: 500
 * @param {response} res 
 * @param {string} message 
 * @param {int} code 
 * @returns {response}
 */
const respondFailServerError = (res, message = 'Internal Server Error', code = 500)=>{
	const payload = { message, }
	return res.status(code).json(payload)
}

//*	Exportamos funciones
module.exports = {
	respond, respondDeleted, respondCreated, respondFail,
	respondFailValidationErrors, respondUnauthorized,
	respondFailServerError
}