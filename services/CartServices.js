import AsyncStorage from '@react-native-async-storage/async-storage';
import LocalStorageService from './LocalStorageService'
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
        await AsyncStorage.setItem('cartList', JSON.stringify([]))
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
        await this.setCartList(carts)
    },
    restructureCartGroups: function (cartGroups) {

    },
    isAddedToCart: async function (cookId, itemName) {
        let items = await LocalStorageService.get(cookId)
        for (let item of items) {
            if (item.name == itemName) {
                return item
            }
        }
        return false
    },
    addItem: async function (cookId, item) {
        let addedItems = await LocalStorageService.get(cookId);
        if (!addedItems) addedItems = []
        addedItems = [...addedItems, item]
    },
    delete: async function (cookId, itemName) {
        let addedItems = await LocalStorageService.get(cookId);
        if (!addedItems) addedItems = []
        addedItems = addedItems.filter(item => item.name != itemName)
        await LocalStorageService.store(cookId, addedItems)
    }
}
export default CartServices