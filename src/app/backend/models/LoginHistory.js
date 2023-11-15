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
            user: {
                select: {
                    email: true,
                }
            }
        }
    });

    return data;
}



export const addHistory = async (u_id, ip, email, action) => {


  const data = await prisma.loginHistory.create({
    data: {
      userId: u_id,
      ip: ip,
      action: action,
      user: {
        connect: {
          uid: u_id,
          email: email,
        },
      },
    },
  });

  return data;
};
