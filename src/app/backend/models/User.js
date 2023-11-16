
import { prisma } from '../db/dbClient';


export async function isAdmin(email){
    const user = await prisma.user.findUnique({
        where: { email: email }
        })
    // console.log(user);
    return user?.isAdmin;
}