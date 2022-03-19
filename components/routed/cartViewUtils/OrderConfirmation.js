import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native'
import { RadioButton, TextInput } from 'react-native-paper';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

import CartServices from '../../../services/CartServices'
import LocationView from '../../shared/LocationView';
function OrderConfirmation({ setRefreshFlag, setTotalCharge, groupedCartList, setBottomSheetVisibility }) {
    const [locationType, setLocationType] = React.useState(0)
    const [orderLocation, setOrderLocation] = React.useState('')
    const [currentLocationGeoCode, setCurrentLocationGeoCode] = React.useState("Loading..")
    const [customLocation, setCustomLocation] = React.useState("")
    const [mapViewVisibility, setMapViewVisibility] = React.useState(false)
    const [currentLocationCoords, setCurrentLocationCoords] = React.useState(null)

    const [customLocationGeocode, setCustomLocationGeocode] = React.useState("Pick from map")

    React.useEffect(() => {
        (async function () {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                return;
            }
            let location = await Location.getCurrentPositionAsync({});

            let currentLocationGeoCode = await Location.reverseGeocodeAsync({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            })
            setCurrentLocationCoords({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            })
            setCurrentLocationGeoCode(`${currentLocationGeoCode[0].name}, ${currentLocationGeoCode[0].street}, ${currentLocationGeoCode[0].postalCode}, ${currentLocationGeoCode[0].city}`)

        })()
    }, [])
    return (
        <View style={{
            flex: 1
        }}>
            {currentLocationCoords && <LocationView onLocationSelect={() => {


                (async function () {

                    let newLocation = await Location.reverseGeocodeAsync({
                        latitude: currentLocationCoords.latitude,
                        longitude: currentLocationCoords.longitude
                    })
                    setCustomLocationGeocode(`${newLocation[0].name}, ${newLocation[0].street}, ${newLocation[0].postalCode}, ${newLocation[0].city}`)
                    setMapViewVisibility(1 == 0);
                })()
            }} mapVisibility={mapViewVisibility} setMapVisibility={setMapViewVisibility} tagnameLabel="You" shouldChangeOnDrag={1 == 1} target={currentLocationCoords} setTargetCoordinates={setCurrentLocationCoords} />}
            <ScrollView>
                <View style={{
                    padding: 10
                }}>
                    <Text style={{
                        fontSize: 20
                    }}>Choose delivery location</Text>
                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        alignContent: "center",
                        alignItems: "center",
                    }}>
                        <RadioButton
                            value={currentLocationGeoCode}
                            status={locationType === 1 ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setLocationType(1)
                                setOrderLocation(currentLocationGeoCode)
                            }}
                        />
                        <Text style={{
                            fontSize: 20,
                            flexWrap: "wrap"
                        }}>{currentLocationGeoCode}</Text>
                    </View>

                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        alignContent: "center",
                        alignItems: "center",
                    }}>
                        <RadioButton
                            value={customLocation}
                            status={locationType === 2 ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setLocationType(2)
                                setOrderLocation(customLocation)
                                setMapViewVisibility(1 == 1)
                            }}
                        />
                        <Text style={{ fontSize: 20 }}>{customLocationGeocode}</Text>
                    </View>

                </View>
            </ScrollView>
            <View style={styles.footer}>
                <TouchableOpacity onPress={() => {
                    CartServices.clearAll()
                        .then(() => {
                            setBottomSheetVisibility(false)
                        })
                        .then(() => {
                            setRefreshFlag(true)
                            setTotalCharge(0)
                        })
                        .then(() => {
                            ToastAndroid.showWithGravity(
                                "Order placed succesfully!",
                                ToastAndroid.SHORT,
                                ToastAndroid.CENTER
                            );
                        })

                }}>
                    <Text style={{
                        fontSize: 20
                    }}> Confirm Order </Text>

                </TouchableOpacity>

            </View>

        </View>
    );
}
const styles = StyleSheet.create({
    footer: {
        backgroundColor: "#FFA500",
        height: 60,
        justifyContent: "center",
        alignItems: "center"
    }
})
export default OrderConfirmation;