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
    static async createOrder(cartGroup, orderLocationInfo) {
        let userData = await UserService.findUser(cartGroup.cookId)
        let orderInfo = await fetch('http://192.168.43.90:3000/createNewOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                drop_lat: orderLocationInfo.latitude,
                drop_long: orderLocationInfo.longitude,
                dropLocationGeocode: orderLocationInfo.dropLocationGeocode,
                buyerId: orderLocationInfo.buyerId,
                sellerId: cartGroup.cookId,
                riderId: null,
                status: 0,
                charge: 30,
                time: (new Date()) * 1,
                pickupLat: userData.currentLatitude,
                pickupLong: userData.currentLongitude,
                pickupLocationGeocode: userData.currentCity
            })
        }).then(res => res.json())
        return orderInfo.data

    }
    static async createOrderItem(orderItem, orderId) {
        let orderItemData = await fetch('http://192.168.43.90:3000/graphql', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({
                query: `mutation{
                    createOrderItem(
                      orderId:"${orderId}",
                      postId:"${orderItem.postId}",
                      amount:${orderItem.amount}
                    ){
                      postId
                    }
                  }`
            })
        }).then(res => res.json())
        return orderItemData.data.createOrderItem
    }
    static async placeOrders(groupedOrderList, orderLocationInfo) {
        let orderGroup = []
        for (let group in groupedOrderList) {
            let data = {
                cookId: group,
                items: groupedOrderList[group]
            }
            orderGroup.push(data)
        }
        for (let orderGroupItem of orderGroup) {

            let newOrderId = await OrderServices.createOrder(orderGroupItem, orderLocationInfo)
            for (let items of orderGroupItem.items) {
                await OrderServices.createOrderItem(items, newOrderId._id)
            }
        }
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