const prisma = require('./prisma')

const findAll = async () =>{
	return await prisma.Inventario.findMany({
		select:{
			id: true,
			cantidad: true,
			tipo: true,
			fecha: true,
			nota: true,
			Producto:{
				select: {
					id: true,
					nombre:true
				},
			},
			Almacen:{
				select: {
					id: true,
					nombre:true
				},
			},
		},
		where:{
			tipo:'egreso'
		}
	})
}

const find = async (id)=>{
	return await prisma.Inventario.findFirst({
		select: {
			id: true,
			cantidad: true,
			tipo: true,
			fecha: true,
			nota: true,
			Producto:{
				select: {
					id: true,
					nombre:true
				},
			},
			Almacen:{
				select: {
					id: true,
					nombre:true
				},
			},
		},
		where: {
			id:id,
			tipo:'egreso'
		},
	})
}

const store = async (data)=>{
	return prisma.Inventario.create({data:data})
}

const update = async (id, data)=>{
	return prisma.Inventario.update({
		where : {id:id},
		data:data
	})
}

const destroy = async (id)=>{
	return prisma.Inventario.delete({
		where: {
			id:id,
		}
	})
}

module.exports = {findAll, find, store, update, destroy}
