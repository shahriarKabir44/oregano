export default class NotificationService {
    static async getNotifications(currentUserid) {
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
                        id
                  }
                }`
            })

        }).then(res => res.json());

        return data.getNotifications
    }
    static async updateSeenStatus(notificationId) {
        let { data } = await fetch('http://192.168.43.90:3000/updateSeenStatus/' + notificationId)
            .then(res => res.json());
        return data;
    }
}

