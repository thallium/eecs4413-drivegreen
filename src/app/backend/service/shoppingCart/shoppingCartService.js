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
  console.log("shoppingCart:" + JSON.stringify(shoppingCart));
  return shoppingCart;
  
}

export const creatEmptyShoppingCart = async (email) => {
  const user = await prisma.user.findUnique({
    where:{
      email: email,
    },
  })
  const shoppingCart = await prisma.shoppingCart.create({
    data: {
      user: {
        connect: {
          uid: user.uid,
        },
      },
      totalPrice: 0, // Set the initial total price as needed
    },
  });
  console.log(`Shopping cart created for user with email: ${email}`);
  return shoppingCart;
}

export const addToShoppingCart = async (email, vehicleId) => {
    // Find the shoppingCart based on the provided email
    let shoppingCart = await getShoppingCart(email);

    if (!shoppingCart) {
      // If the user doesn't have a shopping cart, create a new empty one
      shoppingCart = await creatEmptyShoppingCart(email);
    }

    // Check if the vehicle is already in the shopping cart
    
    let existingItem = null;
    if (shoppingCart.vehicleItems){
      existingItem = shoppingCart.vehicleItems.find(item => item.vehicleId === vehicleId);
    } 
    
    let updatedItem;
    if (existingItem) {
      // If the vehicle is already in the cart, update quantity, subtotal, and total
      const updatedQuantity = existingItem.quantity + 1;
      const updatedSubtotal = existingItem.vehicle.price * updatedQuantity;
      const updatedTotalPrice = shoppingCart.totalPrice + existingItem.vehicle.price;
      
      [updatedItem, shoppingCart] = await updateCartItemQuatity(shoppingCart.scid, vehicleId, updatedQuantity, updatedSubtotal, updatedTotalPrice);
      console.log(`Vehicle with ID ${vehicleId} updated in the shopping cart.`);
    } else {
      // If the vehicle is not in the cart, add it with quantity 1
      const vehicle = await prisma.vehicle.findUnique({
        where: {
          vid: vehicleId,
        },
      });
      const newSubtotal = vehicle.price;
      const newTotalPrice = shoppingCart.totalPrice + vehicle.price;

      [updatedItem, shoppingCart] = await insertNewItemToCart(shoppingCart.scid, vehicleId, newSubtotal, newTotalPrice);
    }
    return shoppingCart;
};

const insertNewItemToCart = async (scId, vehicleId, subTotal, total) => {
  const newItem = await prisma.shoppingCartOnVehicle.create({
    data: {
      shoppingCart: {
        connect: {
          scid: scId,
        },
      },
      vehicle: {
        connect: {
          vid: vehicleId,
        },
      },
      quantity: 1,
      subTotal: subTotal,
    },
  });

  const updatedShoppingCart = await updateCartTotal(scId, total);

  console.log(`Vehicle with ID ${vehicleId} added to the shopping cart. Quantity 1`);
  return [newItem, updatedShoppingCart];
}

const updateCartItemQuatity = async (scId, vehicleId, quantity, subTotal, total) => {
    const updatedItemInShoppingCart = await prisma.shoppingCartOnVehicle.update({
        where: {
          shoppingCartId_vehicleId: {
            shoppingCartId: scId,
            vehicleId: vehicleId,
          },

        },
        data: {
          quantity: quantity,
          subTotal: subTotal,
        },
      })
    
    //update total price of shopping cart
    const updatedShoppingCart = await updateCartTotal(scId, total);

    return [updatedItemInShoppingCart, updatedShoppingCart];
}

const updateCartTotal = async (scId, total) => {
    const updatedShoppingCart = await prisma.shoppingCart.update({
        where: {
          scid: scId,
        },
        data: {
          totalPrice:total,
        },
        include:{
          vehicleItems: true,
        }
      })

    console.log("updated shopping cart:"+ JSON.stringify(updatedShoppingCart));
    return updatedShoppingCart;
    
}

export const removeOneFromItem = async (email, vehicleId) => {
  const shoppingCart = await getShoppingCart(email);
  const item = shoppingCart.vehicleItems.find(item => item.vehicleId == vehicleId);
  const newQuantity = item.quantity - 1;
  if (newQuantity){
    //if updated quantity is not 0, updated the quantity and related subtaol,total only
    const unitPrice = item.subTotal/item.quantity;
    const newSubTotal = unitPrice * newQuantity;
    const newTotalPrice = shoppingCart.totalPrice - unitPrice;
    const [updatedItemInShoppingCart, updatedShoppingCart] = await updateCartItemQuatity(shoppingCart.scid, vehicleId, newQuantity, newSubTotal, newTotalPrice);
    return updatedShoppingCart;
  }
  else{
    // if updated quantity is 0, then remove the whole item from shopping cart.
    const newTotalPrice = shoppingCart.totalPrice - item.subTotal;
    const [deletedItem, updatedShoppingCart] = await deleteCartItem(shoppingCart.scid, vehicleId, newTotalPrice);
    return updatedShoppingCart;
  }
  
  
}

export const removeWholeItem = async (email, vehicleId) => {
  const shoppingCart = await getShoppingCart(email);
  const item = shoppingCart.vehicleItems.find(item => item.vehicleId == vehicleId);
  const newTotalPrice = shoppingCart.totalPrice - item.subTotal;
  const [deletedItem, updatedShoppingCart] = await deleteCartItem(shoppingCart.scid, vehicleId, newTotalPrice);
  return updatedShoppingCart;
}

const deleteCartItem = async (scId, vehicleId, total) => {
    const deletedItem = await prisma.shoppingCartOnVehicle.delete({
        where: {
          shoppingCartId_vehicleId:{
            shoppingCartId: scId,
            vehicleId: vehicleId,
          },
        },
      });
    
    const updatedShoppingCart = await updateCartTotal(scId, total);

    return [deletedItem, updatedShoppingCart];
}

export const clearShoppingCart = async (scid) => {
  await prisma.shoppingCartOnVehicle.deleteMany({
    where: {
      shoppingCartId: scid,
    },
  });
  await updateCartTotal(scid, 0);
  console.log(`shoppingCart with id ${scid} cleared successfully!`);
}
