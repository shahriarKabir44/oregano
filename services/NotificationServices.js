export default class NotificationService {
    static async getNotifications(currentUserid) {
        return notifications.filter(notification => notification.recipient == currentUserid)
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