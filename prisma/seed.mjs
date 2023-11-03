// https://www.prisma.io/docs/guides/migrate/seed-database
import { PrismaClient } from '@prisma/client'
import seedVehicle from './seedVehicle.mjs'  // must include extension
import { parseArgs } from 'node:util'
import seedLoginHistory from './seedLoginHistory.mjs'
import seedUser from './seedUser.mjs'
import seedShoppingCart from './seedShoppingCart.mjs'
import seedOrder from './seedOrder.mjs'

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
      //seedUser(prisma)
      //seedShoppingCart(prisma)
      //seedOrder(prisma)
      break
    case 'test':
      /** data for your test environment */
      // seedVehicle(prisma)
      //seedUser(prisma)
      //seedShoppingCart(prisma)
      //seedOrder(prisma)
      break
    case 'production':
      seedVehicle(prisma)
      seedUser(prisma)
      seedShoppingCart(prisma)
      seedOrder(prisma)
      seedLoginHistory(prisma);
      break
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