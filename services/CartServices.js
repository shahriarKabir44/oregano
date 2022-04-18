import AsyncStorage from '@react-native-async-storage/async-storage';
import LocalStorageService from './LocalStorageService'
const CartServices = {

    clearAll: async function () {
        await AsyncStorage.removeItem('storedCookDatas')
        await AsyncStorage.removeItem('storedItems')
    },

    restructureCartGroups: function (cartGroups) {

    },
    isAddedToCart: async function (cookId, itemName) {
        let storedItems = await LocalStorageService.get('storedItems')
        if (!storedItems) return null
        for (let item of storedItems) {
            if (item.itemName === itemName && item.vendor.Id == cookId) {
                return item.amount
            }
        }

        return null
    },
    addItem: async function (cook, item, amount) {
        let storedCookDatas = await LocalStorageService.get('storedCookDatas')
        if (!storedCookDatas) storedCookDatas = []
        let isFound = 0
        for (let cookInfo of storedCookDatas) {
            if (cookInfo.Id == cook.Id) {
                isFound = 1
                break
            }
        }
        if (!isFound) storedCookDatas.push(cook)

        let storedItems = await LocalStorageService.get('storedItems') ? await LocalStorageService.get('storedItems') : []
        storedItems.push({
            ...item,
            amount: amount
        })
        await LocalStorageService.store('storedItems', storedItems)
        await LocalStorageService.store('storedCookDatas', storedCookDatas)
    },
    delete: async function (cookId, itemName) {
        let storedItems = await LocalStorageService.get("storedItems")
        console.log(storedItems);
        storedItems = storedItems.filter(item => !(item.itemName == itemName && item.vendor.Id == cookId))
        await LocalStorageService.store('storedItems', storedItems)
        let storedCookDatas = await LocalStorageService.get('storedCookDatas')
        for (let item of storedItems) {
            if (item.vendor.Id == cookId) return
        }
        storedCookDatas = storedCookDatas.filter(item => !(item.Id == cookId))
        await LocalStorageService.store('storedCookDatas', storedCookDatas)
    },
    getcartItems: async function () {
        let coox = await LocalStorageService.get("storedCookDatas")
        let items = await LocalStorageService.get("storedItems")
        return {
            cooks: coox,
            items: items
        }
    }
}
export default CartServices