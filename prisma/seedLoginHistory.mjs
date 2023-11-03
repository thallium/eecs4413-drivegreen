

export default async function seedLoginHistory(prisma) {
    const h1 = await prisma.loginHistory.upsert({
      where: { userId: 1, loginAt: new Date('2023-11-01T12:00:00Z') },
      update: {},
      create: {
        ip: '101.0.0.1',
      },
    });

    const h2 = await prisma.loginHistory.upsert({
      where: { userId: 2, loginAt: new DateTime('2023-11-01T12:00:05Z') },
      update: {},
      create: {
        ip: '101.0.2.0',
      },
    });

    const h3 = await prisma.loginHistory.upsert({
      where: { userId: 2, loginAt: new DateTime('2023-10-30T10:00:00Z') },
      update: {},
      create: {
        ip: '101.0.2.0',
      },
    });
    console.log("login history seed:", h1, h2, h3);
}
