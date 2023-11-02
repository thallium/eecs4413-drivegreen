import seedVehicle from './seedVehicle.mjs'
import seedUser from './seedUser.mjs'

export default async function seedShoppingCart(prisma) {
  const [veh1,veh2] = await seedVehicle(prisma)
  const [user1,user2] = await seedUser(prisma)

  const o1 = await prisma.order.create({
    data: {
      user: {
        connect:{
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
    include: {
      orderItems: true
    },
  });

  const o2 = await prisma.order.create({
    data: {
      user: {
        connect:{
          uid: user2.uid
        }, 
      },
      orderItems: {
        create: [
          {
            vehicle: {
              connect: { vid: veh2.vid }, 
            },
            quantity: 1, 
            subTotal: 1 * veh2.price,
          }
        ],
      },
      totalPrice: 1 * veh2.price,
    },
    include: {
      orderItems: true
    },
  });
  
  console.log(o1,o2)

}