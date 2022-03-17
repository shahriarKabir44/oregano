import postList from "../components/postList";

export default class PostService {
    static async searchPostByTags(tagName) {
        console.log(tagName)
        let res = await fetch('http://192.168.43.90:3000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `query{
                    searchByTags(tagName:"${tagName}"){
                        findPost{
                            id
                            itemName
                            unitPrice
                            owner{
                                facebookToken
                                id
                            }
                            images
                            
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
        let res = await fetch('http://192.168.43.90:3000/graphql', {
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
        }).then(res => res.json())
        return res

    }
}