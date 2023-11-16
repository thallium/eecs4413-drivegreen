import {prisma} from '../db/dbClient';


export const getHistoryByDate = async (start, end) => {
    const data = await prisma.loginHistory.findMany({
        where: {
            loginAt: {
                gte: start, // Date object
                lte: end
            }
        },
        select: {
            ip: true,
            action: true,
            loginAt: true,
            email: true,
        }
    });

    return data;
}



export const addHistory = async (ip, eml, action) => {
  const now = new Date();
  const data = await prisma.loginHistory.upsert({
    where: { email_loginAt: { email: eml, loginAt: now} },
    update: {
      ip: ip,
      action: action,
    },
    create: {
      ip: ip,
      action: action,
      user: { connect: { email: eml } },
    },
  });

  return data;
};
