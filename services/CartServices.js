import {Subject} from 'rxjs'
const carts=new Subject()
import  AsyncStorage  from '@react-native-async-storage/async-storage'; 
const  CartServices={
    setCartList:(cartList)=>{
        console.log(cartList)
        AsyncStorage.setItem('cartList',JSON.stringify(cartList))
    },
    getCartList:async ()=>{
        let item=await AsyncStorage.getItem('cartList')
        if(item)return JSON.parse(item)
        else return {}
        
    },
    clearAll: ()=> AsyncStorage.clear()
} 
export default CartServices