import { Brand, Shape } from '@prisma/client'
import seedUser from './seedUser.mjs'

export default async function seedVehicle(prisma) {
  const [user1, user2] = await seedUser(prisma)

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
    where: { name: 'Mach-E', },
    update: {},
    create: {
      name: 'Mach-E',
      brand: Brand.Ford,
      price: 35000.00,
      shape: Shape.L,
      description: 'this is a special version',
      reviews: {
        create: [
          { authorId: user1.uid, rating: 5, title: 'good car for 35k'},
          { authorId: user2.uid, rating: 4, title: 'it\'s too large'},
        ],
      }
    },
  })

  console.log({ veh1, veh2 })
  return [veh1,veh2]
}