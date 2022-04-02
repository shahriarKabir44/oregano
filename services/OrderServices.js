import PostService from "./PostService"
import UserService from './UserService'
export default class OrderServices {
    static async getMyOrders(id) {
        return orders.filter(order => order.buyerId == id)
    }

    static async getPreviousOrders(buyerId) {
        let { data } = await fetch('http://192.168.43.90:3000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `query{
                    getPreviousOrders(buyerId:"${buyerId}"){
                      status
                      id
                      time
                      seller{
                        personalInfo{
                          profileImageURL
                          name
                          
                        }
                      }
                      orderedItems{
                        amount
                        post{
                          id
                          itemName
                          images
                          unitType
                        }
                      }
                    }
                  }`
            })
        }).then(res => res.json())
        return data.getPreviousOrders
    }

    static async rejectOrderItem(orderId, postId, shouldGenerateNotification, itemName, sellerName, buyerId) {
        let { data } = await fetch(`http://192.168.43.90:3000/orders/rejectOrderItem`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                orderId: orderId,
                postId: postId,
                shouldGenerateNotification: shouldGenerateNotification,
                buyerId: buyerId,
                notificationMessage: `${sellerName} is unable to provide the ${itemName} you've ordered.`
            })
        }).then(response => response.json())
        return data;
    }
    static async rejectOrder(orderId, items, sellerName, buyerId) {
        let promises = []
        for (let item of items) {
            promises.push(OrderServices.rejectOrderItem(orderId, item.postid, 0, item.itemName, sellerName, buyerId))
        }
        await Promise.all([...promises, fetch('http://192.168.43.90:3000/orders/rejectOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                orderId: orderId,
                buyerId: buyerId,
                notificationMessage: `Unfortunately, ${sellerName} is unable to accept your orders.`
            })
        }).then(res => res.json())])

        return

    }
    static async getOrderInfo(orderId) {
        let { data } = await fetch('http://192.168.43.90:3000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `query{
                    getOrderInfo(id:"${orderId}"){
                        buyer{
                            facebookToken
                            id
                            personalInfo{
                                name
                                profileImageURL
                                coverPhotoURL
                            }
                            phone
                        }
                        seller{
                            facebookToken
                            id
                            personalInfo{
                                name
                                profileImageURL
                                coverPhotoURL
                            }
                            phone
                        }
                        orderedItems{
                            post{
                                itemName
                                images
                                id
                                city
                                district
                            }
                            amount
                            status
                        }
                        drop_lat
                        drop_long
                        status
                        dropLocationGeocode
                        id
                        pickupLat
                        pickupLong
                        pickupLocationGeocode
                        time
                    }
                }`
            })
        }).then(res => res.json())
        return data.getOrderInfo
    }



    static async acceptOrders(orderId, rejectedItems, acceptedItems, sellerName, buyerId) {
        let promises = [];
        for (let item of rejectedItems) {
            promises.push(OrderServices.rejectOrderItem(orderId, item.postid, 1, item.itemName, sellerName, buyerId))
        }
        promises.push(fetch('http://192.168.43.90:3000/orders/acceptOrder/' + orderId)
            .then(response => response.json())
            .catch(e => {
            })
        )
        await Promise.all(promises)
        return
    }


    static async createOrder(cookId, orderLocationInfo, buyerName, buyerId, itemsCount) {
        let userData = await UserService.findUser(cookId)
        let notificationMessage = `${buyerName} has ordered some of your products. Please check.`
        let orderInfo = await fetch('http://192.168.43.90:3000/orders/createNewOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                drop_lat: orderLocationInfo.latitude,
                drop_long: orderLocationInfo.longitude,
                dropLocationGeocode: orderLocationInfo.dropLocationGeocode,
                buyerId: buyerId,
                sellerId: cookId,
                riderId: null,
                status: 0,
                charge: 30,
                time: (new Date()) * 1,
                pickupLat: userData.currentLatitude,
                pickupLong: userData.currentLongitude,
                pickupLocationGeocode: `${userData.locationInfoJson.city} , ${userData.locationInfoJson.district} , ${userData.locationInfoJson.subregion} , ${userData.locationInfoJson.region}`,
                notificationMessage: notificationMessage,
                itemsCount: itemsCount
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
                      amount:${orderItem.amount},
                    ){
                      postId
                    }
                  }`
            })
        }).then(res => res.json())
        return orderItemData.data.createOrderItem
    }
    static async placeOrders(orderItems, orderLocationInfo, buyerName, buyerId) {
        let cooks = new Set()
        for (let orderItem of orderItems) {
            cooks.add(orderItem.cookId)
        }
        cooks = [...cooks]

        for (let cook of cooks) {
            let totalItems = 0
            for (let item of orderItems) {
                totalItems += item.amount

            }
            let newOrderId = await OrderServices.createOrder(cook, orderLocationInfo, buyerName, buyerId, totalItems)
            let promises = []
            for (let item of orderItems) {
                if (item.cookId == cook) {
                    promises.push(OrderServices.createOrderItem(item, newOrderId._id))
                }
            }
            await Promise.all(promises)
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