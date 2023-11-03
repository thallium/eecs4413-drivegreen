import {prisma} from '../db/dbClient';


export const getHistoryByDate = async (start, end) => {
    const data = await prisma.loginHistory.findMany({
        where: {
            loginAt: {
                gte: start, // Date object
                lte: end
            }
        }
    });

    return data;
}



