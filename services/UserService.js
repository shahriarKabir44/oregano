import Global from "./Globals";
import PostService from "./PostService";
import RatingServices from "./RatingServices";

export default class UserService {
    static async logout(userId) {
        let { data } = await fetch(Global.SERVER_URL + '/user/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: userId,

            })
        }).then(response => response.json())
        return data
    }
    static async unRegister(userId) {
        let { data } = await fetch(Global.SERVER_URL + '/user/unRegisterRider', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: userId,

            })
        }).then(response => response.json())
        return data
    }
    static async unFollow(followeeId, followerId) {
        let { data } = await fetch(Global.SERVER_URL + '/connection/unFollow', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                followerId: followerId,
                followeeId: followeeId
            })
        }).then(response => response.json())
        return data
    }
    static async isFollowing(followerId, followeeId) {
        let { data } = await fetch(Global.SERVER_URL + '/connection/isFollowing', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                followerId: followerId,
                followeeId: followeeId
            })
        }).then(response => response.json())
        return data
    }
    static async follow(followeeId, followerId, followerName, followeeExpoToken) {

        let { data } = await fetch(Global.SERVER_URL + '/connection/follow', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                followerId: followerId,
                followeeId: followeeId,
                followerName: followerName,
                followeeExpoToken: followeeExpoToken
            })
        }).then(response => response.json())
        return data


    }
    static async findUser(id) {
        let res = await fetch(Global.SERVER_URL + '/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `query{findUser(id:"${id}"){
                    facebookToken
                    id
                    phone
                    expoPushToken
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
        let data = await fetch(Global.SERVER_URL + '/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `query{
                    getFollowees(followerId:"${id}"){
                        followee{
                        facebookToken
                        expoPushToken
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

    static async getFollowers(id) {
        let data = await fetch(Global.SERVER_URL + '/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `query{
                    getFollowers(followeeId:"${id}"){
                        follower{
                            facebookToken
                            expoPushToken
                            id
                            lastPost{
                              itemName
                              id
                              images
                              amountProduced
                              unitPrice
                              postedOn
                              tags
                              unitType
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

        let data = await fetch(Global.SERVER_URL + '/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `query{
                    getFollowees(followerId:"${id}"){
                        followee{
                            facebookToken
                            expoPushToken
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
        let posts;
        let availableItems;
        let ratings = []
        let promises = [
            fetch(Global.SERVER_URL + '/graphql', {
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
                        postedOn
                  }
                }`
                })
            }).then(res => res.json())
                .then(({ data }) => {
                    posts = data
                }),
            PostService.getAvailableItemsToday(userId)
                .then(data => {
                    availableItems = data
                })
        ]
        await Promise.all(promises)




        for (let post of posts.getCreatedPosts) {
            post.images = JSON.parse(post.images)

        }
        posts = posts.getCreatedPosts
        let classedByName = []
        for (let item of posts) {
            let isFound = false
            let lastGroup = null;
            for (let group of classedByName) {
                if (isFound) break
                if (group.groupName == item.itemName) {
                    group.posts.push(item)
                    lastGroup = group
                    isFound = true

                }
            }
            if (!isFound) {
                let newGroup = {
                    groupName: item.itemName,
                    posts: [item]
                }
                lastGroup = newGroup
                classedByName.push(newGroup)
            }
            lastGroup.isAvailable = false
            lastGroup.rating = 0
            for (let availableItem of availableItems) {
                if (availableItem.tag == lastGroup.groupName) {
                    lastGroup.isAvailable = true
                    lastGroup.unitPrice = availableItem.unitPrice
                    break
                }
            }
            for (let ratedItem of ratings) {
                if (ratedItem.tagName == lastGroup.groupName) {
                    lastGroup.rating = ratedItem.rating
                    break
                }
            }
        }
        return classedByName

    }

    static async updateUserInfo(userId, facebookToken) {

        let { data } = await fetch(Global.SERVER_URL + '/user/updateFacebookToken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: userId,
                facebookToken: (facebookToken)
            })
        })

        return data
    }
    static async isSignedUp(facebookId) {
        let { data } = await fetch(Global.SERVER_URL + '/user/isRegistered', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ facebookId: facebookId })
        }).then(res => res.json())
        return data
    }
    static async getLocalUsers(region, userId) {
        let { data } = await fetch(Global.SERVER_URL + '/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `query{
                    findLocalUsers(region:"${region}",userId:"${userId}"){
                      name 
                      id
                      phone
                      personalInfo{
                        profileImageURL
                      }
                    }
                  }`
            })
        }).then(res => res.json())
        return data.findLocalUsers
    }
    static async searchUser(query) {
        let { data } = await fetch(Global.searchServerURL + '/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `query{
                    searchUser(query: "${query}") {
                      name
                      id
                      personalInfo{
                        profileImageURL
                      }
                      locationInfoJson{
                        city
                        region
                        district
                      }
                    }
                  }
                  `
            })
        }).then(res => res.json())
        return data.searchUser
    }
    static async registerRider(userId) {
        let { data } = await fetch(Global.SERVER_URL + '/user/registerRider', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId: userId })
        }).then(res => res.json())
        return data
    }
    static async unRegisterRider(userId) {
        let { data } = await fetch(Global.SERVER_URL + '/user/unRegisterRider', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId: userId })
        }).then(res => res.json())
        return data
    }
}