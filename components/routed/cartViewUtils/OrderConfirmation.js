import React from 'react';
import { View, Text, ScrollView, StyleSheet, Modal, TouchableOpacity, ToastAndroid } from 'react-native'
import { RadioButton, TextInput } from 'react-native-paper';
import * as Location from 'expo-location';
import { RootContext } from '../../contexts/GlobalContext'
import CartServices from '../../../services/CartServices'
import LocationView from '../../shared/LocationView';
import OrderServices from '../../../services/OrderServices';
import SearchLocation from './SearchLocation';
import LocationService from '../../../services/LocationService';
function OrderConfirmation({ orderItems, setRefreshFlag, setTotalCharge, setBottomSheetVisibility }) {
    const [locationType, setLocationType] = React.useState(0)
    let { getCurrentUser } = React.useContext(RootContext)
    const [currentLocationGeoCode, setCurrentLocationGeoCode] = React.useState("Loading..")
    const [selectedLocationCoords, setSelectedLocationCoords] = React.useState(null)
    const [hasLocationGeocodeLoaded, setLoadingStatus] = React.useState(false)
    const [customLocationGeocode, setCustomLocationGeocode] = React.useState("Choose location")
    const [modalVisible, setModalVisible] = React.useState(false)
    const [orderCity, setOrderCity] = React.useState("")
    const [searchLocationBottomSheetVisibility, setSearchLocationBottomSheetVisibility] = React.useState(false)
    React.useEffect(() => {
        LocationService.getCurrentLocation()
            .then((coords) => {
                setSelectedLocationCoords({
                    latitude: coords.latitude,
                    longitude: coords.longitude
                })

                LocationService.getLocationGeocode(coords)
                    .then(currentLocationGeoCode => {
                        setOrderCity(currentLocationGeoCode[0].city)
                        setCurrentLocationGeoCode(`${currentLocationGeoCode[0].name}, ${currentLocationGeoCode[0].street}, ${currentLocationGeoCode[0].postalCode}, ${currentLocationGeoCode[0].city}`)
                        setLoadingStatus(1 == 1)
                    })
            })


    }, [])
    function limitText(text) {
        let res = ""
        let limit = 30
        for (let n = 0; n < Math.min(limit, text.length); n++) {
            res += text[n]
        }
        if (text.length > limit) res += "..."
        return res
    }
    return (
        <View style={{
            flex: 1
        }}>
            <Modal
                animationType="slide"
                transparent={1 == 1}
                visible={modalVisible}
                onRequestClose={() => {

                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Please wait...</Text>

                    </View>
                </View>
            </Modal>

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
                            disabled={!hasLocationGeocodeLoaded}
                            value={currentLocationGeoCode}
                            status={locationType === 1 ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setLocationType(1)
                            }}
                        />
                        <Text style={{
                            fontSize: 20,
                            flexWrap: "wrap"
                        }}>{limitText(currentLocationGeoCode)}</Text>
                    </View>

                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        alignContent: "center",
                        alignItems: "center",
                    }}>
                        <RadioButton
                            value={customLocationGeocode}
                            status={locationType === 2 ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setLocationType(2)
                                setSearchLocationBottomSheetVisibility(1 == 1)
                            }}
                        />
                        <Text style={{ fontSize: 20 }}>{limitText(customLocationGeocode)}</Text>
                    </View>

                </View>
            </ScrollView>
            <View style={styles.footer}>
                <TouchableOpacity onPress={() => {
                    setModalVisible(true)

                    OrderServices.placeOrders(orderItems, {
                        ...selectedLocationCoords,
                        dropLocationGeocode: (locationType == 1 ? currentLocationGeoCode : customLocationGeocode)
                    }, getCurrentUser().facebookToken.name, getCurrentUser().id, orderCity)
                        .then(() => {
                            CartServices.clearAll()
                                .then(() => {
                                    setBottomSheetVisibility(false)
                                })
                                .then(() => {
                                    setRefreshFlag(true)
                                    setTotalCharge(0)
                                })
                                .then(() => {
                                    setModalVisible(false)
                                    ToastAndroid.showWithGravity(
                                        "Order placed succesfully!",
                                        ToastAndroid.SHORT,
                                        ToastAndroid.CENTER
                                    );
                                })
                        })


                }}>
                    <Text style={{
                        fontSize: 20
                    }}> Confirm Order </Text>

                </TouchableOpacity>

            </View>
            <SearchLocation visibility={searchLocationBottomSheetVisibility} setVisibility={setSearchLocationBottomSheetVisibility} onSelect={(selectedLocation) => {
                setCustomLocationGeocode(selectedLocation.name)
                setSelectedLocationCoords(selectedLocation.coords)
                setOrderCity(selectedLocation.city)

            }} />
        </View>
    );
}
const styles = StyleSheet.create({
    footer: {
        backgroundColor: "#FFA500",
        height: 60,
        justifyContent: "center",
        alignItems: "center"
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
})
export default OrderConfirmation;