const {Prisma} = require('@prisma/client')
const {respondFailServerError, respondFailValidationErrors} = require('./handleHttpResponse')

const respondException = (res, ex)=>{
	if(ex instanceof Prisma.PrismaClientKnownRequestError
		|| ex instanceof Prisma.PrismaClientUnknownRequestError
		|| ex instanceof Prisma.PrismaClientRustPanicError
		|| ex instanceof Prisma.PrismaClientInitializationError
		)
	{
		const errors = {
			code: ex.code,
			meta: ex.meta,
			message: ex.message,
			clientVersion: ex.clientVersion
		}
		console.error(errors)
		const message = getMessageError(ex.code) || ''
		return respondFailValidationErrors(res, message)
	}
	if(ex instanceof Prisma.PrismaClientValidationError)
	{
		console.error(ex)
		return respondFailValidationErrors(res,
			'Los tipos de datos ingresados, son inválidos.')
	}

	return respondFailServerError(res, 'Excepción no controlada')
}

const getMessageError= (code)=>{
	switch(code)
	{
		case 'P1000':
			return 'Credenciales de acceso inválidos.'
		case 'P1001':
			return 'Servidor no localizado.'
		case 'P1002':
			return 'Se agoto el tiempo de espera.'
		case 'P1003':
			return 'Base de datos, no localizado.' 
		case 'P1008':
			return 'Se agoto el tiempo de espera de operación.'
		case 'P1009':
			return 'La base de datos, ya existe.'
		case 'P1010':
			return 'Usuario denegado.'
		case 'P1011':
			return 'Error al abrir una conexión TLS.'
		case 'P1012':
			return 'Esquema inválido.'
		case 'P1013':
			return 'Cadena de conexión es inválida.'
		case 'P1014':
			return 'El tipo subyacente del modelo no existe.'
		case 'P1015':
			return 'Funciones no compatibles.'
		case 'P1016':
			return 'El número de parámetros es inválido.'
		case 'P1017':
			return 'La conexión esta cerrado.'
		case 'P2000':
			return 'La longitud del campo es demasiado grande.'
		case 'P2001':
			return 'La condición de la clausula where no existe.'
		case 'P2002':
			return 'Los datos ingresados ya existen.'
		case 'P2003':
			return 'Las claves foráneas fallaron.'
		case 'P2004':
			return 'Fallo la restricción en la base de datos'
		case 'P2005':
			return 'El valor ingresado es inválido.'
		case 'P2006':
			return 'El valor ingresado es inválido.'
		case 'P2007':
			return 'Error de validación de datos'
		case 'P2008':
			return 'Consulta inválida.'
		case 'P2009':
			return 'Error de análisis de datos en consulta.'
		case 'P2010':
			return 'Consulta fallida.'
		case 'P2011':
			return 'El valor no puede ser vació.'
		case 'P2012':
			return 'Falto un valor obligatorio.'
		case 'P2013':
			return 'El valor ingresado es inválido.'
		case 'P2014':
			return 'Los cambios son inválidos.'
		case 'P2015':
			return 'Datos no localizados.'
		case 'P2016':
			return 'Error de interpretación de consulta.'
		case 'P2017':
			return 'La relación en inválida.'
		case 'P2018':
			return 'No se encontró lo registros conectados.'
		case 'P2019':
			return 'Información ingresada es inválida'
		case 'P2020':
			return 'Exceder la longitud máxima.'
		case 'P2021':
			return 'La tabla no existe en la base de datos.'
		case 'P2022':
			return 'La columna no existe en la base de datos.'
		case 'P2023':
			return 'Las columnas son inconsistentes.'
		case 'P2024':
			return 'Se agoto el tiempo para esperar una nueva conexión.'
		case 'P2025':
			return 'Fallo de operación.'
		case 'P2026':
			return 'La base de datos no admite nuevas caracteristicas.'
		case 'P2027':
			return 'Multiples errores encontrados.'
		case 'P2028':
			return 'Error de transacción'
		case 'P2030':
			return 'No se puede encontrar un indice en texto'
		case 'P2031':
			return `Se necesita realizar una transacción, así que se requiere que
				MongoDB se ejecute como un conjunto de replicas`
		case 'P2033':
			return 'El número ingresado es demasiado grande.'
		case 'P2034':
			return 'Fallo de transacción.'
		case 'P3000':
			return 'No se pudo crear la base de datos.'
		case 'P3001':
			return 'Migración con cambios destructivos y posible cambio de datos.'
		case 'P3002':
			return 'El intento de migración se revirtió'
		case 'P3003':
			return 'El formato de migraciones fallo.'
		case 'P3004':
			return 'Base de datos inválidos.'
		case 'P3005':
			return 'La base de datos no esta vacía.'
		case 'P3006':
			return 'Error de migración'
		case 'P3007':
			return 'Algunas de las funciones de vista previa solicitadas aún no están permitidas en el motor de migración.'
		case 'P3008':
			return 'La migración ya ha sido aplicado.'
		case 'P3009':
			return 'Error de migración'
		case 'P3010':
			return 'El nombre de la migración es demasiado largo'
		case 'P3011':
			return 'La migración no se puede aplicar, ejecutar manualmente'
		case 'P3012':
			return 'La migración no se puede aplicar, porque tiene un estado fallido.'
		case 'P3013':
			return 'Las matrices de proveedores de fuentes de datos ya no se admiten en la migración.'
		case 'P3014':
			return 'No se puede crear la base de datos.'
		case 'P3015':
			return 'No se puede encontrar el archivo de migración.'
		case 'P3016':
			return 'El método alternativo para restablecer la base de datos falló.'
		case 'P3017':
			return 'No se pudo encontrar la migración.'
		case 'P3018':
			return 'No se pudo aplicar una migración. Las'
		case 'P3019':
			return 'El esquema no coincide con el especificado en el archivo migration_lock.toml'
		case 'P3020':
			return 'La creación automática de bases de datos ocultas está deshabilitada en Azure SQL.'
		case 'P3021':
			return 'No se pueden crear claves foráneas en esta base de datos. '
		case 'P3022':
			return 'La ejecución directa de instrucciones SQL DDL (lenguaje de definición de datos) está deshabilitada en esta base de datos.'
		case 'P4000':
			return 'La operación no pudo producir un archivo de esquema.'
		case 'P4001':
			return 'La base de datos esta vacía.'
		case 'P4002':
			return 'El esquema de la base de datos es inconsistente.'
		case 'P5000':
			return 'La solicitud es inválida.'
		case 'P5001':
			return 'La solicitud es inválida.'
		case 'P5002':
			return 'La solicitud es inválida.'
		case 'P5003':
			return 'El recurso solicitado no existe.'
		case 'P5004':
			return 'La función aún no está implementada.'
		case 'P5005':
			return 'El esquema debe cargarse.'
		case 'P5006':
			return 'Servidor desconocido.'
		case 'P5007':
			return 'Cadena de conexión desconocido.'
		case 'P5008':
			return 'Se excedió el uso, vuelva a intentarlo más tarde.'
		case 'P5009':
			return 'Tiempo de espera agotado.'
		case 'P5010':
			return 'No se pueden obtener datos del servicio'
		case 'P5011':
			return 'Los parámetros de la solicitud no son válidos.'
		case 'P5012':
			return 'La versión del motor no es compatible'
		case 'P5013':
			return 'Motor no arrancado: tiempo de espera de comprobación de estado.'
		case 'P5014':
			return 'Error de arranque del motor desconocido'
		case 'P5015':
			return 'Error de transacción interactiva'
	}
}

module.exports = respondException