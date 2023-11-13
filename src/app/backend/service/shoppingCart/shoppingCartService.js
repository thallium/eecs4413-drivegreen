import { prisma } from "@/app/backend/db/dbClient.js";

export const getShoppingCart = async (email) => {
  const user = await prisma.user.findUnique({
    where:{
      email: email,
    },
  })
  const shoppingCart = await prisma.shoppingCart.findUnique({
    where:{
      userId: user.uid,
    },
    include: {
      vehicleItems: {
        include: {
          vehicle: true,
        },
      },
    },
    
  });
  console.log("shoppingCart:" + shoppingCart);
  return shoppingCart;
  
}

export const updateCartItemQuatity = async (scId, vehicleId, price, quantity, total) => {
    const updatedItemInShoppingCart = await prisma.shoppingCartOnVehicle.update({
        where: {
          shoppingCartId_vehicleId: {
            shoppingCartId: scId,
            vehicleId: vehicleId,
          },

        },
        data: {
          quantity: quantity,
          subTotal: price * quantity,
        },
      })
    
    const updatedShoppingCart = await updateCartTotal(scId, total);

    return [updatedItemInShoppingCart, updatedShoppingCart];
}

export const updateCartTotal = async (scId, total) => {
    const updatedShoppingCart = await prisma.shoppingCart.update({
        where: {
          shoppingCartId: scId,
        },
        data: {
          totalPrice:total,
        },
      })


    return updatedShoppingCart;
}

export const deleteCartItem = async (scId, vehicleId, total) => {
    const deletedItem = await prisma.shoppingCartOnVehicle.delete({
        where: {
          shoppingCartId: scId,
          vehicleId: vehicleId,
        },
      });
    
    const updatedShoppingCart = await updateCartTotal(scId, total);

    return [deletedItem, updatedShoppingCart];
}
