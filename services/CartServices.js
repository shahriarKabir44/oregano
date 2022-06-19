
const CartServices = {
    storedCookDatas: [],
    storedItems: [],
    clearAll: async function () {
        this.storedCookDatas = []
        this.storedItems = []
    },

    restructureCartGroups: function (cartGroups) {

    },
    isAddedToCart: async function (cookId, lowerCasedName) {

        for (let item of this.storedItems) {
            if (item.lowerCasedName === lowerCasedName && item.vendor.Id == cookId) {
                return item.amount
            }
        }

        return null
    },
    addItem: async function (cook, item, amount) {
        let isFound = 0
        for (let cookInfo of this.storedCookDatas) {
            if (cookInfo.Id == cook.Id) {
                isFound = 1
                break
            }
        }
        if (!isFound) this.storedCookDatas.push(cook)

        this.storedItems.push({
            ...item,
            amount: amount
        })


    },
    delete: async function (cookId, lowerCasedName) {
        this.storedItems = this.storedItems.filter(item => !(item.lowerCasedName == lowerCasedName && item.vendor.Id == cookId))
        for (let item of this.storedItems) {
            if (item.vendor.Id == cookId) return
        }
        this.storedCookDatas = this.storedCookDatas.filter(item => !(item.Id == cookId))
    },
    getcartItems: async function () {

        return {
            cooks: this.storedCookDatas,
            items: this.storedItems
        }
    }
}
export default CartServices