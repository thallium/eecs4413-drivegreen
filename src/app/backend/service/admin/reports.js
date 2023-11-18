
import {getHistoryByDate} from '../../models/LoginHistory';
import {getOrdersByDate} from '../../models/Order';
import {getVehicleByID } from '../../models/Vehicle';


const getDates = (days) => {
    const today = new Date();
    const start = new Date(today - days * 24 * 60 * 60 * 1000);
    return {start, today};
}


export async function app_reports() {
    const {start, today} = getDates(7); // last week
    // console.log(start, today);
    const logins = await getHistoryByDate(start, today);
    // console.log(logins);
    return logins;
}


export async function sale_reports() {
    const {start, today} = getDates(30); // last month
    const orders = await getOrdersByDate(start, today);
    let sale = new Map();
    // console.log(orders);
    for(let o of orders) {
        const items = o.orderItems;
        // console.log(items);
        for(let i of items) {
            const quantity = i.quantity;
            const vid = i.vehicleId;
            const vehicle = await getVehicleByID(vid);
            // console.log(vehicle);
            let cnt = sale.get(vehicle.name)
            if (cnt) {
              sale.set(vehicle.name, cnt + quantity);
            } else {
              sale.set(vehicle.name, quantity);
            }
        };
    };
    return sale;
}


