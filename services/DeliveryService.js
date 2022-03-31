export default class DeliveyService {
    static async markDelivered(orderId, buyerId) {
        let { data } = await fetch(`http://192.168.43.90:3000/orders/markDelivered`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                orderId: orderId,
                buyerId: buyerId
            })
        }).then(res => res.json())
        return data
    }
    static async markPickedUp(orderId, buyerId) {
        let { data } = await fetch(`http://192.168.43.90:3000/orders/markPickedUp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                orderId: orderId,
                buyerId: buyerId
            })
        }).then(res => res.json())
        return data
    }
    static async getAssignedDeliveries(userId) {
        let { data } = await fetch('http://192.168.43.90:3000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `query{
                            getAssignedOrders(id:"${userId}"){
                                id
                                time
                                status
                                pickupLocationGeocode
                                dropLocationGeocode
                                itemsCount
                            }
                        }`
            })
        }).then(res => res.json())
        return data.getAssignedOrders
    }
}