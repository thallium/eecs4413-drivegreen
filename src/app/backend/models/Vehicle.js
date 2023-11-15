import { prisma } from '../db/dbClient';

export const getDeals = async () => {
    const data = await prisma.vehicle.findMany({
        where: {
            hotDealed: true
        },
        select: {
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

export const getVehicleByID = async (id) => {
    const data = await prisma.vehicle.findUnique({
        where: {
            vid: id
        }
    });

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