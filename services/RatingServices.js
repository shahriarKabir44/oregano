import Global from "./Globals"
export default class RatingServices {
    static async getMyRating(productId, userId) {
        let { data } = await fetch(`${Global.SERVER_URL}/ratings/getUserRating`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                postId: productId,
                ratedBy: userId
            })
        }).then(response => response.json())
        return data
    }
    static async getTagRatings(ownerId) {
        let { data } = await fetch(Global.SERVER_URL + '/ratings/getTagRatings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ownerId: ownerId })
        }).then(res => res.json())
        return data
    }
    static async rateItem(postId, userid, rating, ownerid, tagList) {
        let { data } = await fetch(`${Global.SERVER_URL}/ratings/rateItem`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                postId: postId,
                ownerId: ownerid,
                ratedBy: userid,
                tagLIst: (tagList),
                rating: rating

            })
        }).then(response => response.json())
        return data

    }
}