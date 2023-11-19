import { prisma } from '../db/dbClient';


export const getOrdersByDate = async (start, end) => {
    const data = await prisma.order.findMany({
      where: {
        createdAt: {
          gte: start, // Date object
          lte: end,
        },
        isPaid: true,
      },
      select: {
        orderItems: {
          select: {
            vehicleId: true,
            quantity: true,
          },
        },
      },
    });

    return data;
}

