export default async function seedUser(prisma) {
  const user1 = await prisma.user.upsert({
    where: { email: 'user1@gmail.com', },
    update: {},
    create: { // minimum: only required fields
      uid: 'd2ikbaUUmZRi9d7KKhNT6cQZ4EY2',
      name: 'Tony',
      email: 'user1@gmail.com'
    },
  })

  const user2 = await prisma.user.upsert({
    where: { email: 'ccc@gmail.com', },
    update: {},
    create: { // minimum: only required fields
      uid: 'VuGAeZv8YDM4joIyMxwH4zfNuod2',
      name: 'Kate',
      email: 'ccc@gmail.com'
    },
  })

  return [user1, user2]
}
