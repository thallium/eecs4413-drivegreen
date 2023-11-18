export default async function seedUser(prisma) {
  const user1 = await prisma.user.upsert({
    where: { email: 'user1@gmail.com' },
    update: {

    },
    create: {
      // minimum: only required fields
      uid: 'd2ikbaUUmZRi9d7KKhNT6cQZ4EY2',
      name: 'Tony',
      email: 'user1@gmail.com',
      watchList: {       
        create: {
          vehicle: {
            connect: {
              name: 'Model S',
            },
          },
        },       
      },
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'bbb@gmail.com', },
    update: {},
    create: { // minimum: only required fields
      uid: 'b1234',
      name: 'bbb',
      email: 'bbb@gmail.com',
      isAdmin: false
    },
  })

  const user3 = await prisma.user.upsert({
    where: { email: 'admin2@drivegreen.com', },
    update: {},
    create: { // minimum: only required fields
      uid: 'admin2',
      name: 'admin2',
      email: 'admin2@drivegreen.com',
      isAdmin: true
    }
  })

  console.log({ user1, user2, user3 })
  return [user1, user2, user3]
}

