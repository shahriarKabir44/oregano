export default class NotificationService {
    static async getNotifications(currentUserid) {
        console.log(currentUserid)
        let { data } = await fetch('http://192.168.43.90:3000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `query{
                    getNotifications(id:"${currentUserid}"){
                        type
                        isSeen
                        message
                        time
                        relatedSchemaId
                  }
                }`
            })

        }).then(res => res.json());

        return data.getNotifications
    }
    static async updateSeenStatus(notificationId) {
        for (let n of notifications) {
            if (n.id == notificationId) n.isSeen = 0
        }
    }
}


let notifications = [
    {
        id: 1,
        type: 1,
        isSeen: 0,
        recipient: 1,
        relatedSchemaId: 1,
        time: 1647188597829,
        message: "Firoza khan has ordered some of your food items"
    },
    {
        id: 2,
        type: 2,
        isSeen: 1,
        recipient: 1,
        relatedSchemaId: null,
        time: 1647188597829,
        message: "Firoza khan is unable to accept your order"

    },
    {
        id: 3,
        type: 3,
        isSeen: 0,
        recipient: 1,
        relatedSchemaId: null,
        time: 1647188597829,
        message: "The rider has ppicked up your order"

    },
    {
        id: 4,
        type: 4,
        isSeen: 0,
        recipient: 1,
        relatedSchemaId: 2,
        time: 1647188597829,
        message: "You have been assigned for a delivery. View details"

    },

]