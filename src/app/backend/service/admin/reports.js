import { isAdmin } from '@firebase/util';
import {getHistoryByDate} from '../models/loginHistory';
// import Order from '../models/order';


const getDates = () => {
    const today = new Date();
    const start = new Date(today - 7 * 24 * 60 * 60 * 1000);
    return {start, today};
}

export default function app_reports() {
    const {start, today} = getDates();
    const logins = getHistoryByDate(start, today);

    return {login: logins};
}


// export default function sale_reports() {
    // const {start, today} = getDates();
    // const orders = Order.getOrdersByDate(start, today);
    // return {order: orders};
// }


//export isAdmin()// better add under user model