import seedUser from './seedUser.mjs';

export default async function seedLoginHistory(prisma) {
  const [user1, user2, user3] = await seedUser(prisma);
  const h1 = await prisma.loginHistory.upsert({
    where: {
      userId_loginAt: {
        userId: user2.uid,
        loginAt: new Date('2023-11-01T12:00:00Z'),
      },
    },
    update: {},
    create: {
      ip: '101.0.0.1',
      loginAt: new Date('2023-11-01T12:00:00Z'),
      user: { connect: { uid: user2.uid } },
    },
  });

  const h2 = await prisma.loginHistory.upsert({
    where: {
      userId_loginAt: {
        userId: user3.uid,
        loginAt: new Date('2023-11-11T12:00:05Z'),
      },
    },
    update: {},
    create: {
      ip: '101.0.2.0',
      loginAt: new Date('2023-11-11T12:00:05Z'),
      user: { connect: { uid: user3.uid } },
    },
  });

  const h3 = await prisma.loginHistory.upsert({
    where: {
      userId_loginAt: {
        userId: user3.uid,
        loginAt: new Date('2023-11-04T10:00:00Z'),
      },
    },
    update: {},
    create: {
      ip: '101.0.2.0',
      loginAt: new Date('2023-11-04T10:00:00Z'),
      user: { connect: { uid: user3.uid } },
    },
  });
  console.log('login history seed:', h1, h2, h3);
}
