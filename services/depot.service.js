const prisma = require('./prisma')

const findAll = async () =>{
	return await prisma.Almacen.findMany({
		select:{
			id: true,
			nombre: true,
			descripcion: true,
		},
	})
}

const find = async (id)=>{
	return await prisma.Almacen.findFirst({
		where: {id:id},
		select: {
			id: true,
			nombre: true,
			descripcion: true,
		},
	})
}

const store = async (data)=>{
	return prisma.Almacen.create({data:data})
}

const update = async (id, data)=>{
	return prisma.Almacen.update({
		where : {id:id},
		data:data
	})
}

module.exports = {findAll, find, store, update}
