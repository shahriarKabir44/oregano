import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, Image, ToastAndroid } from 'react-native';
import LocationView from '../shared/LocationView';
import Collapsible from 'react-native-collapsible';
import { RootContext } from '../contexts/GlobalContext';
import OrderServices from '../../services/OrderServices';

function DeliveryInfo(props) {
    const { contextObject, updateContext } = React.useContext(RootContext)
    const [isPickedUp, setPickupStatus] = React.useState(false)
    const [deliveryDetails, setDeliveryDetails] = React.useState({})
    const [isLoaded, setLoadedStatus] = React.useState(false)
    React.useEffect(() => {
        updateContext({ ...contextObject, headerString: "Delivery Info" })
        OrderServices.getOrderInfo(props.route.params)
            .then(data => {
                setDeliveryDetails(data)
                if (data.status === 4) setPickupStatus(true)

            }).then(() => {
                setLoadedStatus(1 == 1)
            })
    }, [])

    const [pickupLocationMapVisibility, setPickupLocationMapVisibility] = React.useState(false)

    const [dropLocationMapVisibility, setDropLocationMapVisibility] = React.useState(false)
    const [collapsibleVisibility, setCollapsibleVisibility] = React.useState(1 == 0)
    return (
        <View style={styles.container}>
            {/* order pickup */}
            <TouchableOpacity style={{
                borderRadius: 20,
                borderColor: '#a783d6',
                borderWidth: 5,
                margin: 5
            }} onPress={() => {
                setCollapsibleVisibility(!collapsibleVisibility)
            }}>
                <View style={[styles.header]}>
                    <Text style={styles.headerText}>Order Pickup info</Text>
                </View>
            </TouchableOpacity>
            {isLoaded && <Collapsible collapsed={collapsibleVisibility} align="center">
                <View style={styles.content}>
                    <View style={{
                        display: 'flex',
                        flexDirection: "row",
                        justifyContent: "space-between",
                        padding: 10,
                        alignItems: "center",
                        alignContent: "center",
                    }}>
                        <Image style={{
                            width: 90,
                            borderRadius: 50,
                            aspectRatio: 1
                        }} source={{
                            uri: deliveryDetails.seller.personalInfo.profileImageURL
                        }} />
                        <View>
                            <Text style={{
                                fontSize: 15
                            }}>Customer name:{deliveryDetails.seller.personalInfo.name}</Text>
                            <Text style={{
                                fontSize: 15
                            }}>Phone:{deliveryDetails.seller.phone}</Text>
                        </View>
                    </View>
                    <View>
                        <Text>Location:</Text>
                        <Text style={{
                            fontSize: 15
                        }}>{deliveryDetails.pickupLocationGeocode}</Text>
                    </View>
                    <TouchableOpacity style={{
                        margin: 10,
                        padding: 10,
                        backgroundColor: '#c4c4c4',
                        display: 'flex',
                        alignItems: 'center',
                        borderRadius: 5
                    }} onPress={() => {
                        setPickupLocationMapVisibility(true)
                    }}>
                        <Text>View Location 🚩</Text>
                    </TouchableOpacity>
                    {!isPickedUp && <TouchableOpacity style={{
                        margin: 10,
                        marginVertical: 20,
                        padding: 10,
                        backgroundColor: '#c4c4c4',
                        display: 'flex',
                        alignItems: 'center',
                        borderRadius: 5
                    }} onPress={() => {
                        OrderServices.markPickedUp(deliveryDetails.id, deliveryDetails.buyer.id)
                            .then(data => {
                                ToastAndroid.showWithGravity(
                                    "The user has been notified",
                                    ToastAndroid.SHORT,
                                    ToastAndroid.CENTER
                                )
                                setPickupStatus(true)
                            })
                    }}>
                        <Text>Mark as picked up</Text>
                    </TouchableOpacity>}
                </View>

            </Collapsible>}

            <TouchableOpacity style={{
                borderRadius: 20,
                borderColor: '#a783d6',
                borderWidth: 5,
                margin: 5
            }} onPress={() => {
                setCollapsibleVisibility(!collapsibleVisibility)
            }}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Order Delivery info</Text>
                </View>
            </TouchableOpacity>
            {isLoaded && <Collapsible collapsed={!collapsibleVisibility} align="center">
                <View style={styles.content}>
                    <View style={{
                        display: 'flex',
                        flexDirection: "row",
                        justifyContent: "space-between",
                        padding: 10,
                        alignItems: "center",
                        alignContent: "center",
                    }}>
                        <Image style={{
                            width: 90,
                            borderRadius: 50,
                            aspectRatio: 1
                        }} source={{
                            uri: deliveryDetails.buyer.personalInfo.profileImageURL
                        }} />
                        <View>
                            <Text style={{
                                fontSize: 15
                            }}>Customer name:{deliveryDetails.buyer.personalInfo.name}</Text>
                            <Text style={{
                                fontSize: 15
                            }}>Phone:{deliveryDetails.buyer.phone}</Text>
                        </View>
                    </View>
                    <View>
                        <Text>Location:</Text>
                        <Text style={{
                            fontSize: 15
                        }}>{deliveryDetails.dropLocationGeocode}</Text>
                    </View>
                    <TouchableOpacity style={{
                        margin: 10,
                        padding: 10,
                        backgroundColor: '#c4c4c4',
                        display: 'flex',
                        alignItems: 'center',
                        borderRadius: 5
                    }} onPress={() => {
                        setDropLocationMapVisibility(true)
                    }}>
                        <Text>View Location 🚩</Text>
                    </TouchableOpacity>
                </View>
            </Collapsible>}
            {isLoaded && <View>
                <LocationView mapVisibility={dropLocationMapVisibility} setMapVisibility={setDropLocationMapVisibility} target={{
                    latitude: deliveryDetails.drop_lat,
                    longitude: deliveryDetails.drop_long
                }} tagnameLabel="Deliver to" onLocationSelect={() => { }} />

                <LocationView mapVisibility={pickupLocationMapVisibility} setMapVisibility={setPickupLocationMapVisibility} target={{
                    latitude: deliveryDetails.pickupLat,
                    longitude: deliveryDetails.pickupLong
                }} tagnameLabel="Pick up from" onLocationSelect={() => { }} />
            </View>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        paddingTop: 30,
    },
    title: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '300',
        marginBottom: 20,
    },
    header: {

        padding: 10,
    },
    headerText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
    },
    content: {
        padding: 20,
        backgroundColor: '#fff',
        borderColor: 'black',
        borderRadius: 5,
        borderWidth: 2,
        marginHorizontal: 5
    }
})

export default DeliveryInfo;