import postList from "../components/postList";
import users from "./users";

export default class UserService {
    static async findUser(id) {
        return users.filter(user => user.id == id)[0]
    }
    static async findFollowingList(id) {
        return users
    }
    static async getLastPost(id) {
        return postList[0]
    }
}