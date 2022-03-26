import * as Location from 'expo-location';

export default class LocationService {
    static async getCurrentLocation() {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        return {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        };
    }
    static async getLocationGeocode(location) {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            return;
        }
        return await Location.reverseGeocodeAsync({
            latitude: location.latitude,
            longitude: location.longitude
        })

    }
}