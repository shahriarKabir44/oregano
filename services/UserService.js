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
                    
                  }}`
            })
        }).then(res => res.json())


        res.data.findUser.facebookToken = JSON.parse(res.data.findUser.facebookToken)

        return res.data.findUser
    }
    static async findFollowingList(id) {
        return users
    }
    static async getLastPost(id) {
        return postList[0]
    }
    static async getPosts(userId) {
        console.log(userId)
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