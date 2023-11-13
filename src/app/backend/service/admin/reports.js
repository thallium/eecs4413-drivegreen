
import {getHistoryByDate} from '../../model/LoginHistory';
import {getOrdersByDate} from '../../model/Order';
import {getVehicleByID } from '../../model/Vehicle';


const getDates = () => {
    const today = new Date();
    const start = new Date(today - 7 * 24 * 60 * 60 * 1000);
    return {start, today};
}


export async function app_reports() {
    const {start, today} = getDates();
    const logins = getHistoryByDate(start, today);

    return {login: logins};
}


export async function sale_reports() {
    const {start, today} = getDates();
    const orders = getOrdersByDate(start, today);
    let sale = {};
    for(o of orders) {
        const items = o.items;
        for(i of items) {
            const vid = i.vehicleId;
            const vehicle = getVehicleByID(vid);
            if (sale[vehicle.name]) {
                sale[vehicle.name] += 1;
            }
            else {
                sale[vehicle.name] = 1;
            }
        };
    };
    return {order: orders};
}


