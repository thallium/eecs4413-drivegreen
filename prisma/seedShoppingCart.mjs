// import seedVehicle from './seedVehicle.mjs'
// import seedUser from './seedUser.mjs'

export default async function seedShoppingCart(prisma, vehicles, users) {
  const [veh1, veh2, veh3] = vehicles
  const [user1, user2, user3, user4] = users

  const sc1 = await prisma.shoppingCart.upsert({
    where: { userId: user1.uid, },
    update: {},
    create: {
      user: {
        connect: {
          uid: user1.uid
        },
      },
      vehicleItems: {
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
      vehicleItems: true
    },
  })

  const sc2 = await prisma.shoppingCart.upsert({
    where: { userId: user2.uid, },
    update: {},
    create: {
      user: {
        connect:{
          uid: user2.uid
        }, 
      },
      vehicleItems: {
        create: [
          {
            vehicle: {
              connect: { vid: veh2.vid }, 
            },
            quantity: 1, 
            subTotal: 1 * veh2.price,
          },
          {
            vehicle: {
              connect: { vid: veh1.vid }, 
            },
            quantity: 2, 
            subTotal: 2 * veh1.price,
          }
        ],
      },
      totalPrice: 1 * veh2.price + 2 * veh1.price,
    },
    include: {
      vehicleItems: true
    },
  })

  const sc3 = await prisma.shoppingCart.upsert({
    where: { userId: 'fl0UguRw5YhLuR8JGX8j1QWor072', },
    update: {
      vehicleItems: {
        create: [
          {
            vehicle: {
              connect: { vid: veh2.vid }, 
            },
            quantity: 1, 
            subTotal: 1 * veh2.price,
          },
          {
            vehicle: {
              connect: { vid: veh1.vid }, 
            },
            quantity: 2, 
            subTotal: 2 * veh1.price,
          }
        ],
      },
      totalPrice: 1 * veh2.price + 2 * veh1.price,
    },
    create: {
      user: {
        connect:{
          uid: 'fl0UguRw5YhLuR8JGX8j1QWor072'
        }, 
      },
      vehicleItems: {
        create: [
          {
            vehicle: {
              connect: { vid: veh2.vid }, 
            },
            quantity: 1, 
            subTotal: 1 * veh2.price,
          },
          {
            vehicle: {
              connect: { vid: veh1.vid }, 
            },
            quantity: 2, 
            subTotal: 2 * veh1.price,
          }
        ],
      },
      totalPrice: 1 * veh2.price + 2 * veh1.price,
    },
    include: {
      vehicleItems: true
    },
  })

  return [sc1, sc2, sc3]

}
