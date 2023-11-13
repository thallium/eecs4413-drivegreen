import seedVehicle from './seedVehicle.mjs'
import seedUser from './seedUser.mjs'
import { PrismaClient } from '@prisma/client';

/**
 * @param {PrismaClient} prisma 
 */
export default async function seedShoppingCart(prisma) {
  const [veh1, veh2] = await seedVehicle(prisma)
  const [user1] = await seedUser(prisma)

  const o1 = await prisma.order.upsert({
    where: { userId: user1.uid },
    update: {},
    create: {
      user: {
        connect: {
          uid: user1.uid
        },
      },
      orderItems: {
        create: [
          {
            vehicle: {
              connect: { vid: veh1.vid },
            },
            quantity: 1,
            subTotal: 1 * veh1.price,
          },
          {
            vehicle: {
              connect: { vid: veh2.vid },
            },
            quantity: 2,
            subTotal: 2 * veh2.price,
          },
        ],
      },
      totalPrice: 1 * veh1.price + 2 * veh2.price,
    },
  });
}
