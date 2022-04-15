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
        let storedCooks = await LocalStorageService.get('storedCooks')
        let st = new Set(storedCooks)
        if (!st.has(cookId)) { return null }
        let items = await LocalStorageService.get('storedItems')
        for (let item of items) {
            if (item.cookId == cookId && item.name == itemName) {
                console.log(item)
                return item
            }
        }
        return null
    },
    addItem: async function (cookId, item) {
        let storedCooks = await LocalStorageService.get('storedCooks')
        if (!storedCooks) {
            storedCooks = []
        }
        storedCooks = [...new Set([...storedCooks, cookId])]
        let storedItems = await LocalStorageService.get('storedItems') ? await LocalStorageService.get('storedItems') : []
        storedItems.push({
            ...item,
            cookId: cookId,
        })
        await LocalStorageService.store('storedItems', storedItems)
        await LocalStorageService.store('storedCooks', storedCooks)
    },
    delete: async function (cookId, itemName) {
        let storedItems = await LocalStorageService.get("storedItems")
        storedItems = storedItems.filter(item => !(item.name == itemName && item.cookId == cookId))
        await LocalStorageService.store('storedItems', storedItems)
        let storedCooks = await LocalStorageService.get('storedCooks')
        for (let item of storedItems) {
            if (item.cookId == cookId) return
        }
        storedCooks = storedCooks.filter(item => !(item.cookId == cookId))
        await LocalStorageService.store('storedItems', storedItems)
    },
    getcartItems: async function () {
        return await LocalStorageService.get("carts")
    }
}
export default CartServices