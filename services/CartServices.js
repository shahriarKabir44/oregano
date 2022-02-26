import  AsyncStorage  from '@react-native-async-storage/async-storage'; 
const  CartServices={
    setCartList:(cartList)=>{
        AsyncStorage.setItem('cartList',JSON.stringify(cartList))
    },
    getCartList:async function(){
        let item=await AsyncStorage.getItem('cartList')
        if(item)return JSON.parse(item)
        else return {}
        
    },
    clearAll: function(){ AsyncStorage.clear()},
    removeItem:async function(itemId){
        let items= await this.getCartList()
        items=items.filter(item=> item.id!=itemId)
        await this.setCartList(items)
    }
} 
export default CartServices