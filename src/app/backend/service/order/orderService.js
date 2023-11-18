import { prisma } from "@/app/backend/db/dbClient.js";
import { clearShoppingCart } from "../shoppingCart/shoppingCartService";

export const createOrderFromShoppingCart = async (shoppingCart, shippingAddr, paymentSuccess) => {

  
      if (!shoppingCart || !shoppingCart.vehicleItems || shoppingCart.vehicleItems.length === 0) {
        console.error(`Shopping cart is empty`);
        return null;
      }

      const userId = shoppingCart.userId;
  
      // Create a new order for the user
      const newOrder = await prisma.order.create({
        data: {
          user: {
            connect: {
              uid: userId,
            },
          },
          shippingAddr: shippingAddr,
          totalPrice: shoppingCart.totalPrice,
          isPaid: paymentSuccess,
          orderItems:{
            create: shoppingCart.vehicleItems.map( item => {
                return {
                    vehicle: {
                    connect: {
                        vid: item.vehicleId,
                    },
                    },
                    quantity: item.quantity,
                    subTotal: item.subTotal,
                };
            }),
          },
        },
        include:{
            orderItems:{
                include: {
                    vehicle:true,
                },
            },
        },
      });
  
      // Clear the user's shopping cart after creating the order
      await clearShoppingCart(shoppingCart.scid);
  
      console.log(`Order created successfully for user with id: ${userId}`);
      return newOrder;
    
  };

  export const updateOrderPaymentStatus = async (orderId, paymentSuccess) => {
    let updatedOrder = await prisma.order.update({
        where: {
          oid: orderId,
        },
        data: {
          isPaid: paymentSuccess,
        },
      });
  
      console.log(`Payment status updated for order ID: ${orderId}`);

      updatedOrder = await getOrderById(orderId);

      return updatedOrder;
  }

  export const getOrders = async (email) =>  {
    const user = await prisma.user.findUnique({
        where:{
            email: email,
        },
        include:{
            orders:{
                include:{
                    orderItems:{
                        include: {
                            vehicle:true,
                        },
                    },
                },
            },
        },
    });
    console.log("user for orders: " + JSON.stringify(user));
    if(user){
      return user.orders;
    }
    return [];
  }

  export const getOrderById = async (orderId) => {
    const order = await prisma.order.findUnique({
        where: {
          oid: orderId,
        },
        include: {
          orderItems: {
            include: {
              vehicle: true,
            },
          },
        },
      });
      return order;
  }

