import { Brand, Shape } from '@prisma/client'
// import seedUser from './seedUser.mjs'

export default async function seedVehicle(prisma, users) {
  const [user1, user2, user3] = users

  const veh1 = await prisma.vehicle.upsert({
    where: { name: 'XLT', },
    update: {},
    create: { // minimum: only required fields
      name: 'XLT',
      brand: Brand.Ford,
      price: 40000.00
    },
  })

  const veh2 = await prisma.vehicle.upsert({
    where: { name: 'Mach-E' },
    update: {
      hotDealed: true,
    },
    create: {
      name: 'Mach-E',
      brand: Brand.Ford,
      price: 35000.0,
      shape: Shape.L,
      description: 'this is a special version',
      reviews: {
        create: [
          { authorId: user1.uid, rating: 5, title: 'good car for 35k' },
          { authorId: user2.uid, rating: 4, title: "it's too large" },
        ],
      },
    },
  });


  const veh3 = await prisma.vehicle.upsert({
    where: { name: 'Model S' },
    update: {
      hotDealed: true,
    },
    create: {
      name: 'Model S',
      brand: Brand.Tesla,
      price: 99990.0,
      shape: Shape.L,
      description: 'one of the most popular electric cars',
      hotDealed: true,
    },
  });

  console.log({ veh1, veh2, veh3 })
  return [veh1,veh2, veh3]
}