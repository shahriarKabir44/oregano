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
                    profileImageURL
                    id
                    currentLocationName
                    phone
                    expoPushToken
                    currentLatitude
                    currentLongitude
                    currentCity
                     
                    
                }}`
            })
        }).then(res => res.json())
        return res.data.findUser
    }




    static async getPosts(userId) {
        let { data } = await fetch(Global.SERVER_URL + '/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `query{
                    getCreatedPosts(id:"${userId}"){
                        itemName
                        isAvailable
                        rating
                        unitPrice
                        region
                        numPeopleRated
                        relatedPost{
                            id
                            images
                            postedOn
                        }
                    }
                }`
            })
        }).then(res => res.json())
        return data.getCreatedPosts

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
                        currentLocationName
                      personalInfo{
                        profileImageURL
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