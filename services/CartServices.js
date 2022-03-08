import AsyncStorage from '@react-native-async-storage/async-storage';
const CartServices = {
    setCartList: (cartList) => {
        AsyncStorage.setItem('cartList', JSON.stringify(cartList))
    },
    getCartList: async function () {
        let item = await AsyncStorage.getItem('cartList')
        if (item) return JSON.parse(item)
        else return {}

    },
    clearAll: async function () {
        await AsyncStorage.removeItem('cartList')
    },
    removeItem: async function (itemId) {
        let items = await this.getCartList()
        items = items.filter(item => item.id != itemId)
        await this.setCartList(items)
    },
    updateCartAmount: async function (id, amount) {
        let carts = await this.getCartList()
        for (let cart of carts) {
            if (cart.id == id) {
                cart.amount = amount
                break
            }
        }
    }
}
export default CartServices