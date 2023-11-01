// https://www.prisma.io/docs/guides/migrate/seed-database
import { PrismaClient } from '@prisma/client'
import seedVehicle from './seedVehicle.mjs'  // must include extension
import { parseArgs } from 'node:util'

const prisma = new PrismaClient()
const options = {
  environment: { type: 'string' },
}

async function main() {
  const {
    values: { environment },
  } = parseArgs({ options })

  switch (environment) {
    case 'development':
      /** data for your development */
      // seedVehicle(prisma)
      break
    case 'test':
      /** data for your test environment */
      // seedVehicle(prisma)
      break
    case 'production':
      seedVehicle(prisma)
    default:
      break
  }
  
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })