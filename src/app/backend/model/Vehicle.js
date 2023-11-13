import { prisma } from '../db/dbClient';

export const getDeals = async () => {
    const data = await prisma.vehicle.findMany({
        where: {
            hotDealed: true
        }
    });

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