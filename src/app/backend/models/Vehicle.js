import { prisma } from '../db/dbClient';

export const getDeals = async () => {
    const data = await prisma.vehicle.findMany({
        where: {
            hotDealed: true
        },
        select: {
            vid: true,
            name: true,
            price: true,
            brand: true,
            modelYear: true,
            shape: true
        }
    });
    // console.log("get deals", data);
    return data;
}


export const setHotDeal = async (id, hotDealed) => {
    const data = await prisma.vehicle.update({
        where: {
            vid: id
        },
        data: {
            hotDealed: hotDealed
        }
    });
    // console.log(data);
    return data;
}


export const getVehicle = async () => {
    return await prisma.vehicle.findMany();
}


export const getVehicleByID = async (id) => {
  const data = await prisma.vehicle.findUnique({
    where: {
      vid: id,
    },
  });

  return data;
};


export const getVehicleByBrand = async (brand) => {
  const data = await prisma.vehicle.findMany({
    where: {
      brand: brand,
    },
  });

  return data;
}


export const getVehicleByModel = async (model) => {
  const data = await prisma.vehicle.findMany({
    where: {
      model: model,
    },
  });

  return data;
}


export const getVehicleByShape = async (shape) => {
    const data = await prisma.vehicle.findMany({
        where: {
        shape: shape,
        },
    });
    
    return data;
}


export const getVehicleByYear = async (year) => {
    const data = await prisma.vehicle.findMany({
        where: {
        modelYear: year,
        },
    });
    
    return data;
}


export const getVehicleByPrice = async (top, buttom) => {
    const data = await prisma.vehicle.findMany({
        where: {
        price: {
            gte: buttom,
            lte: top
        }
        },
    });
    
    return data;
}

