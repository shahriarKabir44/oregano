import postList from "../components/postList";
import users from "./users";

export default class UserService {
    static async findUser(id) {
        let res = await fetch('http://192.168.43.90:3000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `query{findUser(id:"${id}"){
                    facebookToken
                    id
                    currentLatitude
                    currentLongitude
                    currentCity
                    locationInfoJson{
                        city
                        district
                        subregion 
                        region 
                    }
                    
                }}`
            })
        }).then(res => res.json())


        res.data.findUser.facebookToken = JSON.parse(res.data.findUser.facebookToken)

        return res.data.findUser
    }
    static async findFollowingList(id) {
        let data = await fetch('http://192.168.43.90:3000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `query{
                    getFollowees(followerId:"${id}"){
                        followee{
                        facebookToken
                        id
                        lastPost{
                          itemName
                          images
                          postedOn
                        }
                      }
                      }
                }`
            })
        }).then(res => res.json())
        data = data.data.getFollowees
        for (let entry of data) {
            entry.followee.facebookToken = JSON.parse(entry.followee.facebookToken)
            entry.followee.lastPost.images = JSON.parse(entry.followee.lastPost.images)
        }
        return data
    }
    static async getLastPost(id) {
        return postList[0]
    }
    static async getFollowers(id) {
        let data = await fetch('http://192.168.43.90:3000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `query{
                    getFollowers(followeeId:"${id}"){
                        follower{
                            facebookToken
                            id
                            lastPost{
                              itemName
                              id
                              images
                              amountProduced
                              unitPrice
                              postedOn
                              tags
                            }
                          }
                  }
                }`
            })
        }).then(res => res.json())

        let result = data.data.getFollowers
        for (let user of result) {
            user.follower.facebookToken = JSON.parse(user.follower.facebookToken)
            if (user.follower.lastPost) {
                user.follower.lastPost.images = JSON.parse(user.follower.lastPost.images)
                user.follower.lastPost.tags = JSON.parse(user.follower.lastPost.tags)
            }


        }
        return result
    }
    static async getFolloweesPosts(id) {

        let data = await fetch('http://192.168.43.90:3000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `query{
                    getFollowees(followerId:"${id}"){
                        followee{
                            facebookToken
                            id
                            lastPost{
                                itemName
                                id
                                images
                                amountProduced
                                unitPrice
                                postedOn
                                tags
                            }
                        }
                    }
                }`
            })
        }).then(res => res.json())
        let result = data.data.getFollowees
        for (let user of result) {
            user.followee.facebookToken = JSON.parse(user.followee.facebookToken)
            if (user.followee.lastPost) {
                user.followee.lastPost.images = JSON.parse(user.followee.lastPost.images)
                user.followee.lastPost.tags = JSON.parse(user.followee.lastPost.tags)
            }
        }

        let postList = []
        for (let data of result) {
            let post = data.followee.lastPost
            if (post) {
                post['owner'] = { facebookToken: data.followee.facebookToken, id: data.followee.id }
                postList.push(post)
            }

        }
        return postList
    }
    static async getPosts(userId) {
        let data = await fetch('http://192.168.43.90:3000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `query{
                    getCreatedPosts(id:"${userId}"){
                        images
                        itemName
                        tags
                        latitude
                        longitude
                        unitPrice
                        amountProduced
                        id
                        unitType
                  }
                }`
            })
        }).then(res => res.json())

        for (let post of data.data.getCreatedPosts) {
            post.images = JSON.parse(post.images)
            post.tags = JSON.parse(post.tags)
        }
        return data.data.getCreatedPosts
    }
}