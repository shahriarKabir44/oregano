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
        let addedItems = await LocalStorageService.get("carts")

        if (!addedItems) return null
        for (let foodItem of addedItems) {

            if (foodItem.cookId === cookId) {
                let foodItems = foodItem.items
                for (let food of foodItems) {
                    if (food.name === itemName) {
                        return food
                    }
                }
            }
        }
        return null
    },
    addItem: async function (cookId, item) {
        let addedItems = await LocalStorageService.get("carts");
        if (!addedItems) addedItems = []
        let items = []
        for (let foodItem of addedItems) {
            if (foodItem.cookId == cookId) {
                items = foodItem.items
            }
        }

        items = [...items, item]
        console.log([...addedItems, {
            cookId: cookId,
            items: items
        }]);
        await LocalStorageService.store("carts", [...addedItems, {
            cookId: cookId,
            items: items
        }])
    },
    delete: async function (cookId, itemName) {
        let addedItems = await LocalStorageService.get("carts")

        if (!addedItems) return null
        for (let foodItem of addedItems) {

            if (foodItem.cookId === cookId) {
                foodItem.items = foodItem.items.filter(food => food.name != itemName)

            }
        }
        await LocalStorageService.store("carts", addedItems)
    },
    getcartItems: async function () {
        return await LocalStorageService.get("carts")
    }
}
export default CartServices