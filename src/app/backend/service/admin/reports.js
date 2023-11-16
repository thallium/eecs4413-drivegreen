
import {getHistoryByDate} from '../../models/LoginHistory';
import {getOrdersByDate} from '../../models/Order';
import {getVehicleByID } from '../../models/Vehicle';


const getDates = () => {
    const today = new Date();
    const start = new Date(today - 7 * 24 * 60 * 60 * 1000);
    return {start, today};
}


export async function app_reports() {
    const {start, today} = getDates();
    // console.log(start, today);
    const logins = await getHistoryByDate(start, today);
    // console.log(logins);
    return logins;
}


export async function sale_reports() {
    const {start, today} = getDates();
    const orders = await getOrdersByDate(start, today);
    let sale = new Map();
    // console.log(orders);
    for(let o of orders) {
        const items = o.orderItems;
        // console.log(typeof items);
        for(let i of items) {
            const vid = i.vehicleId;
            const vehicle = await getVehicleByID(vid);
            // console.log(vehicle);
            let cnt = sale.get(vehicle.name)
            if (cnt) {
              sale.set(vehicle.name, cnt + 1);
            } else {
              sale.set(vehicle.name, 1);
            }
        };
    };
    return sale;
}


