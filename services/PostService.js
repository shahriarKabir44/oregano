import Global from "./Globals";

export default class PostService {
    static async searchPostByTags(tagName) {
        let res = await fetch(Global.SERVER_URL + '/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `query{
                    searchByTags(tagName:"${tagName}"){
                        findPost{
                            id
                            unitType
                            itemName
                            unitPrice
                            owner{
                                facebookToken
                                id
                            }
                            images
                            postedOn
                        }
                       }
                   }`
            })
        }).then(res => res.json())
        let data = res.data.searchByTags

        let posts = []
        for (let post of data) {
            let postData = post.findPost
            postData.images = JSON.parse(postData.images)
            postData.owner.facebookToken = JSON.parse(postData.owner.facebookToken)
            posts.push(postData)
        }
        return posts
    }
    static async findLocalPosts(city) {

        let { data } = await fetch(Global.SERVER_URL + '/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `query{
                    findLocalPosts(city:"${city}"){
                      itemName
                      id
                        images
                        unitType
                        unitPrice
                        amountProduced
                        postedOn
                        tags
                        owner{
                        facebookToken
                        id
                        
                      }
                        
                      }
                }`
            })

        }).then(res => res.json())
        data = data.findLocalPosts
        for (let post of data) {
            post.images = JSON.parse(post.images)
            post.owner.facebookToken = JSON.parse(post.owner.facebookToken)
            post.tags = JSON.parse(post.tags)
        }
        return data

    }
    static async createPost(body) {
        let data = await fetch(Global.SERVER_URL + '/posts/createPost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(res => res.json())
        return data
    }
    static async findPost(id) {
        let res = await fetch(Global.SERVER_URL + '/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `query{findPost(id:"${id}"){
                    images
                    lowerCasedName
                    itemName
                    id
                    owner{
                      facebookToken
                      id
                      name
                    }
                    postedBy
                    tags
                    unitPrice
                    amountProduced
                    latitude
                    longitude
                    unitType
                    postedOn
                  }}`
            })
        }).then(res => res.json())
        res.data.findPost.images = JSON.parse(res.data.findPost.images)
        res.data.findPost.tags = JSON.parse(res.data.findPost.tags)
        res.data.findPost.owner.facebookToken = JSON.parse(res.data.findPost.owner.facebookToken)

        return res.data.findPost

    }
    static async uploadImages(images, postedBy, postid, postedOn) {
        let urls = []
        let index = 0
        for (let image of images) {
            if (image.index != 4) {
                let { data } = await PostService.updateImage(image, postedBy, postid, postedOn, index++)
                urls.push(data)
            }
        }
        return this.updateImageURLs(postid, urls)
    }
    static async updateImageURLs(postId, images) {
        let { data } = await fetch(Global.SERVER_URL + '/posts/updatePostImages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                postId: postId,
                images: JSON.stringify(images)
            })
        }).then(response => response.json())
        return data
    }
    static async updateImage(image, postedBy, postid, postedOn, index) {
        let formData = new FormData()
        formData.append('file', image.base64)

        let data = await fetch(Global.SERVER_URL + '/posts/upload', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                postedOn: postedOn,
                postedBy: postedBy,
                postid: postid,
                type: image.type,
                fileName: postid + "image-" + index
            },
            body: formData
        }).then(res => res.json())
        return data

    }
    static async getOrderList(postId) {
        let { data } = await fetch(Global.SERVER_URL + '/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `query{
                    getOrderListOfAPost(postId:"${postId}"){
                            amount
                            orderDetails{
                                buyerId
                                time
                                id
                                status
                                buyer{
                                    personalInfo{
                                        name
                                        profileImageURL
                                        
                                    }
                                }
                            }
                        }
                    }`
            })
        }).then(res => res.json())
        return data.getOrderListOfAPost
    }
    static async getPosts() {
        let res = await fetch(Global.SERVER_URL + '/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `query{
                    getPosts {
                        lowerCasedName
                        itemName
                        images
                        unitType
                        owner{
                          facebookToken
                          id
                          name
                        }
                        id
                        amountProduced
                        unitPrice
                        postedOn
                        tags
                      } 
                }`
            })
        }).then(res => res.json())
        return res

    }
    static async getPostRatings(lowerCasedName, postedBy) {
        let { data } = await fetch(Global.SERVER_URL + '/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `query{
                    getPostRatings(lowerCasedName:"${lowerCasedName}",ownerId:"${postedBy}") {
                      rating
                      getUser{
                        id
                        personalInfo{
                          profileImageURL
                          name
                        }
                      }
                    }
                  }`
            })
        }).then(res => res.json())
        return data.getPostRatings
    }
    static async removeTodayTags(userId) {
        return fetch(`${Global.SERVER_URL}/posts/removeTodayTags`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId,

            })
        }).then(response => response.json())
    }
    static async setAvailableItemsToday(userId, tagList, region) {
        await PostService.removeTodayTags(userId)
        let promises = []
        for (let tag of tagList) {
            promises.push(fetch(`${Global.SERVER_URL}/posts/updateTags`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userId,
                    tag: tag.tag,
                    day: Math.floor(((new Date()) * 1) / (24 * 3600 * 1000)),
                    unitPrice: tag.unitPrice,
                    region: region
                })
            }).then(response => response.json()))
        }
        await Promise.all(promises)
    }
    static async getAvailableItemsToday(userId) {
        let { data } = await fetch(`${Global.SERVER_URL}/posts/getTagsOfToday`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId,
                day: Math.floor(((new Date()) * 1) / (24 * 3600 * 1000))
            })
        }).then(response => response.json())
        let res = []
        for (let item of data) {
            res.push({ tag: item.tag, unitPrice: item.unitPrice })
        }
        return res
    }
    /**
     * 
     * @param {String} itemName 
     */
    static async isItemAvailable(itemName, ownerId) {
        let { data } = await fetch(Global.SERVER_URL + '/posts/isItemAvailable/' + itemName + ownerId)
            .then(response => response.json())
        return data;
    }
}