export default class RatingServices {
    static async getMyRating(productId, userId) {
        let { data } = await fetch('http://192.168.43.90:3000/ratings/getUserRating', {
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
    static async rateItem(postId, userid, rating, ownerid, tagList) {
        let { data } = await fetch('http://192.168.43.90:3000/ratings/rateItem', {
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