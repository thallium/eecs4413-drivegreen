export default async function seedUser(prisma) {
  const user1 = await prisma.user.upsert({
    where: { email: 'aaa@gmail.com', },
    update: {},
    create: { // minimum: only required fields
      uid: 'a1234',
      name: 'aaa',
      email: 'aaa@gmail.com'
    },
  })

  const user2 = await prisma.user.upsert({
    where: { email: 'bbb@gmail.com', },
    update: {},
    create: { // minimum: only required fields
      uid: 'b1234',
      name: 'bbb',
      email: 'bbb@gmail.com'
    },
  })

  console.log({ user1, user2 })
  return [user1, user2]
}