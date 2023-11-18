// import seedVehicle from './seedVehicle.mjs';
// import seedUser from './seedUser.mjs';
import { PrismaClient } from '@prisma/client';

/**
 * @param {PrismaClient} prisma
 */
export default async function seedOrder(prisma, vehicles, users) {
  const [veh1, veh2, veh3] = vehicles
  const [user1, user2, user3,user4] = users

  const o1 = await prisma.order.upsert({
    where: { oid: 1 },
    update: {
      shippingAddr: '100 abc Rd',
      isPaid: true,
      createdAt: new Date('2023-11-16'),
    },
    create: {
      user: {
        connect: {
          uid: user1.uid,
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
      isPaid: true,
      createdAt: new Date('2023-11-16'),
    },
  });


  const o2 = await prisma.order.upsert({
    where: { oid: 2 },
    update: {
      shippingAddr: '100 abc Rd',
      updatedAt: new Date('2023-12-01'),
    },
    create: {
      user: {
        connect: {
          uid: user1.uid,
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
      createdAt: new Date('2023-12-01'),
      isPaid: true,
    },
  });
  const o3 = await prisma.order.upsert({
    where: { oid: 3 },
    update: {
      shippingAddr: '200 abc Rd',
      updatedAt: new Date('2023-11-17'),
    },
    create: {
      user: {
        connect: {
          uid: user4.uid,
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
      createdAt: new Date('2023-12-17'),
      shippingAddr: '200 abc Rd',
      isPaid: true,
    },
  });
}
