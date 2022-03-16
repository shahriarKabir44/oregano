import postList from "../components/postList";

export default class PostService {
    static async searchPost(params) {
        return postList
    }
    static async findPost(id) {
        let res = await fetch('http://192.168.43.90:3000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `query{findPost(id:"${id}"){
                    images
                    itemName
                    id
                    owner{
                      facebookToken
                      id
                    }
                    tags
                    unitPrice
                    amountProduced
                    latitude
                    longitude
                    
                  }}`
            })
        }).then(res => res.json())
        res.data.findPost.images = JSON.parse(res.data.findPost.images)
        res.data.findPost.tags = JSON.parse(res.data.findPost.tags)
        res.data.findPost.owner.facebookToken = JSON.parse(res.data.findPost.owner.facebookToken)

        return res.data.findPost

    }
    static async getPosts() {
        return await fetch('http://192.168.43.90:3000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `query{
                    getPosts {
                        itemName
                        images
                        owner{
                          facebookToken
                          id
                        }
                        id
                        amountProduced
                        unitPrice
                         
                        tags
                      } 
                }`
            })
        }).then(res => res.json()).reverse()
    }
}