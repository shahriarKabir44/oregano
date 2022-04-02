export default class RatingServices {
    static async getMyRating(productId, userId) {
        let { data } = await fetch('http://192.168.43.90:3000/ratings/getUserRating', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                productId: productId,
                userId: userId
            })
        }).then(response => response.json())
        return data
    }
}