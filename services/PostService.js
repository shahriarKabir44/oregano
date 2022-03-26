import postList from "../components/postList";

export default class PostService {
    static async searchPostByTags(tagName) {
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
    static async findLocalPosts(district = "California") {
        let { data } = await fetch('http://192.168.43.90:3000/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `query{
                    findLocalPosts(district:"${district}"){
                      itemName
                      id
                        images
                        unitPrice
                        amountProduced
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
        let data = await fetch('http://192.168.43.90:3000/createPost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(res => res.json())
        return data
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
        let { data } = await fetch('http://192.168.43.90:3000/updatePostImages', {
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

        let data = await fetch('http://192.168.43.90:3000/upload', {
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