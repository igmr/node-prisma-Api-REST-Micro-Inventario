const prisma = require('./prisma')

const findAll = async () =>{
	return await prisma.Producto.findMany({
		select:{
			id: true,
			nombre: true,
			descripcion: true,
		},
	})
}

const find = async (id)=>{
	return await prisma.Producto.findFirst({
		where: {id:id},
		select: {
			id: true,
			nombre: true,
			descripcion: true,
		},
	})
}

const store = async (data)=>{
	return prisma.Producto.create({data:data})
}

const update = async (id, data)=>{
	return prisma.Producto.update({
		where : {id:id},
		data:data
	})
}

module.exports = {findAll, find, store, update}
