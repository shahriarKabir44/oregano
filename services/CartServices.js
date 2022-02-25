import {Subject} from 'rxjs'
const carts=new Subject()

const  CartServices={
    setCartList:(tagList)=>carts.next(tagList),
    getCartList:()=>carts.asObservable()
} 
export default CartServices