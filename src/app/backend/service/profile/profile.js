import { prisma } from "../../db/dbClient"

export const getUserProfile = async (email) => {
    return await prisma.user.findUnique({
        where: {
            email: email
        },
        select: {
            name: true,
            address: true,
        },
    });
}
