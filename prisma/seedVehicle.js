import { Brand, Shape } from '@prisma/client'
// const prisma = new PrismaClient()

export default async function seedVehicle(prisma) {
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
      description: 'this is a special version'
    },
  })

  console.log({ veh1, veh2 })
}