import postList from './postList'

class Globals{
    static stack=null
    static drawer=null
    static async getAllPosts( ) {
        return postList
    }
    static async getPostOfAUser(){
        return postList
    }
    static async getPostInfo(id){
        let data=postList.filter(post=>post.id==id)
         return data[0]
    }
}

export default Globals