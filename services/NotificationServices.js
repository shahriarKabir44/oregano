export default class NotificationService {
    static async getNotifications(currentUserid) {
        return notifications.filter(notification => notification.recipient == currentUserid)
    }
}


let notifications = [
    {
        notificationType: 1,
        isSeen: 0,
        recipient: 1,
        relatedSchemaId: 1,
        time: 1647188597829,
        message: "Firoza khan has ordered some of your food items"
    },
    {
        notificationType: 2,
        isSeen: 1,
        recipient: 1,
        relatedSchemaId: null,
        time: 1647188597829,
        message: "Firoza khan is unable to accept your order"

    },
    {
        notificationType: 3,
        isSeen: 0,
        recipient: 1,
        relatedSchemaId: null,
        time: 1647188597829,
        message: "The rider has ppicked up your order"

    },
    {
        notificationType: 4,
        isSeen: 0,
        recipient: 1,
        relatedSchemaId: 2,
        time: 1647188597829,
        message: "You have been assigned for a delivery. View details"

    },

]