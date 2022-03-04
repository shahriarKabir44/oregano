import users from "./users";

export default class UserService{
    static async findUser(id){
        return users.filter(user=>user.id==id)[0]
    }
}