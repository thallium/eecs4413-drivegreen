
import { prisma } from '../db/dbClient';


export async function isAdmin(email){
    const flag = await prisma.user.findUnique({
        where: { email: email }
        }).then(user => {
            if (user) {
                return user.isAdmin;
            }
            return false;
        })

    return flag;
}