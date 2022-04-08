import AsyncStorage from '@react-native-async-storage/async-storage';

export default class LocalStorageService {
    async store(label, data) {
        AsyncStorage.setItem(label, JSON.stringify(data))
    }
    async get(label) {
        let item = await AsyncStorage.getItem(label)
        if (item) return JSON.parse(item)
        else return {}
    }
}