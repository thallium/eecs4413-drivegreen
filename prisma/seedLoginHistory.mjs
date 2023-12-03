
export default async function seedLoginHistory(prisma, users) {
  const [user1, user2, user3, user4] = users;
  const h1 = await prisma.loginHistory.upsert({
    where: {
      email_loginAt: {
        email: user3.email,
        loginAt: new Date('2023-11-20T12:00:00Z'),
      },
    },
    update: {},
    create: {
      ip: '101.0.0.1',
      loginAt: new Date('2023-11-20T12:00:00Z'),
      user: { connect: { email: user3.email } },
    },
  });

  const h2 = await prisma.loginHistory.upsert({
    where: {
      email_loginAt: {
        email: user3.email,
        loginAt: new Date('2023-11-27T12:00:05Z'),
      },
    },
    update: {},
    create: {
      ip: '101.0.2.0',
      loginAt: new Date('2023-11-27T12:00:05Z'),
      user: { connect: { email: user3.email } },
    },
  });

  const h3 = await prisma.loginHistory.upsert({
    where: {
      email_loginAt: {
        email: user3.email,
        loginAt: new Date('2023-12-03T10:00:00Z'),
      },
    },
    update: {},
    create: {
      ip: '101.0.2.0',
      loginAt: new Date('2023-12-03T10:00:00Z'),
      user: { connect: { email: user3.email } },
    },
  });

  const h4 = await prisma.loginHistory.upsert({
    where: {
      email_loginAt: {
        email: user3.email,
        loginAt: new Date('2023-12-10T10:00:00Z'),
      },
    },
    update: {},
    create: {
      ip: '101.0.2.0',
      loginAt: new Date('2023-12-10T10:00:00Z'),
      user: { connect: { email: user3.email } },
    },
  });

  const h5 = await prisma.loginHistory.upsert({
    where: {
      email_loginAt: {
        email: user3.email,
        loginAt: new Date('2023-12-17T10:00:00Z'),
      },
    },
    update: {},
    create: {
      ip: '101.0.2.0',
      loginAt: new Date('2023-12-17T10:00:00Z'),
      user: { connect: { email: user3.email } },
    },
  });
  
  // console.log('login history seed:', h1, h2, h3, h4, h5);
}
