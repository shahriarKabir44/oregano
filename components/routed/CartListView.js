import React, { useEffect, useState } from 'react';
import { Dimensions, Text, View, StyleSheet, ScrollView, TouchableOpacity, Image, Button } from 'react-native';
import CartServices from '../../services/CartServices'
import { BottomSheet } from 'react-native-btr';
import LocationService from '../../services/LocationService';
import ItemDetailsBottomSheet from '../../components/shared/ItemDetailsBottomSheet'
import { RootContext } from '../contexts/GlobalContext'
import { useIsFocused } from '@react-navigation/native';
import OrderConfirmation from './cartViewUtils/OrderConfirmation';
import getDistance from 'geolib/es/getDistance';
import SearchLocation from './cartViewUtils/SearchLocation';

function CartListView(props) {
    const [itemDetailsBottomSheet, popupItemDetailsBottomSheet] = React.useState(false)
    const rootContext = React.useContext(RootContext)

    const [groupedCartList, setCartList] = useState([])
    const [totalCharge, setTotalCharge] = useState(0)
    const [shouldRefresh, setRefreshFlag] = useState(false)
    const [isListEmpty, setEmptinessStatus] = useState(false)
    const [selectedcartItem, setSelectedCartItem] = useState(null)

    function setDeliveryCharge(coords, cartList) {
        let groupedList = JSON.parse(JSON.stringify(cartList))


        for (let group of groupedList) {
            let distance = Math.floor(getDistance({

                latitude: group.currentLatitude,
                longitude: group.currentLongitude
            }, coords, 1) / 100)
            group.distance = distance
            group.deliveryCharge = Math.ceil(distance) * 5 + 30
        }
        setCartList(groupedList)
        return groupedList
    }

    let updateCartList = async function () {
        let data = await CartServices.getcartItems()
        const { cooks, items } = data
        if (!items.length) setEmptinessStatus(true)
        for (let cook of cooks) {
            cook.items = []
            cook.distance = "Loading.."
            cook.deliveryCharge = "Loading.."
            for (let item of items) {
                if (item.vendorId == cook.id) {

                    cook.items.push(item)
                }
            }
        }

        setCartList(cooks)
        return cooks

    }

    const isFocused = useIsFocused()
    const [selectedLocationCoords, setSelectedLocationCoords] = React.useState(null)
    const [isCurrentLocationLoaded, setCurrentLocationLoadingStatus] = React.useState(false)
    const [locationSelectionType, setLocationSelectionType] = React.useState(1)
    const [orderCity, setOrderCity] = React.useState("")
    const [selectedLocationGeocode, setSelectedLocationGeocode] = React.useState("Loading..")

    async function loadCurrentLocationInfo() {
        setCurrentLocationLoadingStatus(false)
        setSelectedLocationGeocode("Loading..")
        let coords = await LocationService.getCurrentLocation()

        setSelectedLocationCoords({
            latitude: coords.latitude,
            longitude: coords.longitude
        })
        LocationService.getGeoApifyLocationInfo(coords)
            .then(currentLocationGeoCode => {

                setOrderCity(currentLocationGeoCode.city)
                setSelectedLocationGeocode(currentLocationGeoCode.geocode)

                setCurrentLocationLoadingStatus(true)
                setLocationSelectionType(1)
            })
        return coords
    }

    async function loadInformation() {
        let currentCoords = null;
        let cartLIst = null;
        let promises = [
            updateCartList().then(data => { cartLIst = data }),
            loadCurrentLocationInfo().then(coords => {
                currentCoords = coords
            })
        ]
        await Promise.all(promises)
        setDeliveryCharge(currentCoords, cartLIst)
    }

    const [customLocationSelectionBottomSheetVisibility, setCustomLocationSelectionBottomSheetVisibility] = React.useState(false)

    useEffect(() => {
        if (isFocused) {
            rootContext.setHeaderString("Cart")
            loadInformation()

        }

        else {
            setTotalCharge(0)
        }
    }, [isFocused, shouldRefresh])
    return (
        <View style={{
            flex: 1
        }}>
            <ScrollView >
                <View style={{

                    margin: 5
                }}>
                    {groupedCartList.map((group, index) => <View key={index} style={{
                        marginVertical: 5,
                        backgroundColor: "#C4C4C4",
                        borderRadius: 5,
                        padding: 10
                    }}>

                        <View style={{
                            display: 'flex',
                            flexDirection: "row",
                            alignItems: "center",
                            alignContent: "center",
                            margin: 10,
                            justifyContent: "space-around"
                        }}>
                            <Image style={{
                                height: 50,
                                aspectRatio: 1,
                                borderRadius: 50,
                            }} source={{ uri: group.personalInfo.profileImageURL }} />
                            <View>
                                <Text>From</Text>
                                <Text>{group.name}</Text>

                            </View>
                            <View>
                                <Text>Distance: {group.distance} kms </Text>
                            </View>
                        </View>
                        {group.items.map((item, index1) => <TouchableOpacity key={index1} onPress={() => {

                            setSelectedCartItem({
                                itemName: item.itemName.toLowerCase(),
                                vendorId: item.vendorId
                            })

                            popupItemDetailsBottomSheet(true)

                        }}>
                            <View style={[styles.container, styles.alighnHorizontal]}>
                                <Image style={{
                                    height: 50,
                                    aspectRatio: 1,
                                    borderRadius: 50,
                                }} source={{ uri: JSON.parse(item.relatedPost[0]?.images)[0] }} />

                                <Text>{item.itemName}</Text>
                                <Text>Amount:{item.amount}</Text>
                                <Text>Tk.{item.amount * item.unitPrice}</Text>

                            </View>
                        </TouchableOpacity>)}
                    </View >)}
                </View>
            </ScrollView>


            <View style={{
                borderWidth: 1,
                borderColor: "black",
                borderRadius: 5,
                padding: 10,

                margin: 5
            }}>
                <View>
                    <Text style={{ fontSize: 20 }} >Choose delivery location</Text>

                    <View style={{
                        display: "flex"
                    }}>
                        <Text>{locationSelectionType == 1 ? "Current location" : "Selected location"}</Text>
                        <Text>{selectedLocationGeocode} </Text>
                        {locationSelectionType == 1 && <Button title='Choose a custom location' onPress={() => {
                            setCustomLocationSelectionBottomSheetVisibility(true)
                        }} />}

                        {locationSelectionType == 2 && <Button title='Switch to current location' onPress={() => {
                            loadCurrentLocationInfo()
                        }} />}
                    </View>
                </View>
            </View>

            <SearchLocation visibility={customLocationSelectionBottomSheetVisibility} setVisibility={setCustomLocationSelectionBottomSheetVisibility} onSelect={(selectedLocation) => {
                setSelectedLocationGeocode(selectedLocation.name)
                setSelectedLocationCoords(selectedLocation.coords)
                setOrderCity(selectedLocation.city)
                setCustomLocationSelectionBottomSheetVisibility(false)
                setLocationSelectionType(2)

            }} />


            <ItemDetailsBottomSheet {...props} onChange={() => {
                updateCartList()
            }} bottomSheetVisibility={itemDetailsBottomSheet} popupBottomSheet={popupItemDetailsBottomSheet} selectedSearchResult={selectedcartItem} setSearchResultItem={setSelectedCartItem} />

        </View>

    );
}
const styles = StyleSheet.create({

    footer: {

        height: 60,
        justifyContent: "center",
        alignItems: "center"
    },
    bottomNavigationView: {
        backgroundColor: '#fff',
        width: '100%',
        height: Dimensions.get('window').height * 0.33,
        borderRadius: 10
    },
    alighnHorizontal: {
        display: "flex",
        flexDirection: "row",
        backgroundColor: "white",
        borderRadius: 10,
        justifyContent: "space-between",
        alignContent: "center",
        alignItems: "center"
    },
    container: {
        justifyContent: "space-between",
        alignContent: "center",
        alignItems: "center",
        margin: 5,
        padding: 5
    },
    info: {
        flex: 1,
        paddingHorizontal: 5
    },
    updateAmountBtn: {
        backgroundColor: "#FA01FF",
        height: 30,
        aspectRatio: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',

    }
})
export default CartListView;