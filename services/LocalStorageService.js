import AsyncStorage from '@react-native-async-storage/async-storage';

export default class LocalStorageService {
    static async store(label, data) {
        console.log(data, label);
        AsyncStorage.setItem(label, JSON.stringify(data))
    }
    static async get(label) {
        let item = await AsyncStorage.getItem(label)
        console.log(item);
        if (item) return JSON.parse(item)
        else return {}
    }
    static async clearAll() {
        await AsyncStorage.clear()
    }
}