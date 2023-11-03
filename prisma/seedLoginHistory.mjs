

export default async function seedLoginHistory(prisma) {
    const h1 = await prisma.loginHistory.upsert({
      where: { userId_loginAt: {userId: "a1234", loginAt: new Date('2023-11-01T12:00:00Z')} },
      update: {},
      create: {
        ip: '101.0.0.1',
        user: {connect: { uid: "a1234" }}
      },
    });

    const h2 = await prisma.loginHistory.upsert({
      where: {
        userId_loginAt: {
          userId: 'b1234',
          loginAt: new Date('2023-11-01T12:00:05Z'),
        },
      },
      update: {},
      create: {
        ip: '101.0.2.0',
        user: { connect: { uid: 'b1234' } },
      },
    });

    const h3 = await prisma.loginHistory.upsert({
      where: { userId_loginAt: {userId: "b1234", loginAt: new Date('2023-10-30T10:00:00Z') }},
      update: {},
      create: {
        ip: '101.0.2.0',
        user: {connect: { uid: "b1234" }}
      },
    });
    console.log("login history seed:", h1, h2, h3);
}
