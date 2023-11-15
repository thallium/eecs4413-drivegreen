

export default async function seedLoginHistory(prisma) {
    const h1 = await prisma.loginHistory.upsert({
      where: {
        userId_loginAt: {
          userId: 'd2ikbaUUmZRi9d7KKhNT6cQZ4EY2',
          loginAt: new Date('2023-11-01T12:00:00Z'),
        },
      },
      update: {},
      create: {
        ip: '101.0.0.1',
        loginAt: new Date('2023-11-01T12:00:00Z'),
        user: { connect: { uid: 'd2ikbaUUmZRi9d7KKhNT6cQZ4EY2' } },
      },
    });

    const h2 = await prisma.loginHistory.upsert({
      where: {
        userId_loginAt: {
          userId: 'b1234',
          loginAt: new Date('2023-11-11T12:00:05Z'),
        },
      },
      update: {},
      create: {
        ip: '101.0.2.0',
        loginAt: new Date('2023-11-11T12:00:05Z'),
        user: { connect: { uid: 'b1234' } },
      },
    });

    const h3 = await prisma.loginHistory.upsert({
      where: {
        userId_loginAt: {
          userId: 'b1234',
          loginAt: new Date('2023-11-04T10:00:00Z'),
        },
      },
      update: {},
      create: {
        ip: '101.0.2.0',
        loginAt: new Date('2023-11-04T10:00:00Z'),
        user: { connect: { uid: 'b1234' } },
      },
    });
    console.log("login history seed:", h1, h2, h3);
}
