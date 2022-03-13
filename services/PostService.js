import postList from "../components/postList";

export default class PostService {
    static async searchPost(params) {
        return postList
    }
    static async findPost(id) {
        return postList.filter(post => post.id == id)[0]
    }
}