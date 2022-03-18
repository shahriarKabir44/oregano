import PostService from "./PostService"
import UserService from './UserService'
export default class OrderServices {
    static async getMyOrders(id) {
        return orders.filter(order => order.buyerId == id)
    }
    static async getOrderInfo(orderId) {
        let order = orders.filter(order => order.id == orderId)[0]
        order['buyer'] = await UserService.findUser(order.buyerId)
        order['seller'] = await UserService.findUser(order['sellerId'])
        return order
    }
    static async placeOrder(groupedOrderList) {

    }
}



let orders = [
    {
        id: 1,
        drop_lat: 23.33,
        drop_long: 120.00,
        dropLocationGeocode: "Khulna University",
        buyerId: 1,
        riderId: 3,
        status: 0,
        sellerId: 2,
        charge: 100,
        time: 1647188597829,
        orderItems: [
            {
                postId: 1,
                amount: 2
            }
        ]
    },
    {
        id: 2,
        drop_lat: 23.33,
        drop_long: 120.00,
        dropLocationGeocode: "Khulna University",
        buyerId: 2,
        sellerId: 3,
        riderId: 1,
        status: 0,
        charge: 100,
        time: 1647188597829,
        orderItems: [
            {
                postId: 1,
                amount: 2
            }
        ]
    }
]