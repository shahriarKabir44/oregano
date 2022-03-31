import React from 'react';
import { Text, View, StyleSheet, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { RootContext } from '../contexts/GlobalContext';
import { useIsFocused } from '@react-navigation/native';
import DeliveyService from '../../services/DeliveryService';
function DeliveryHistory(props) {
    const { contextObject, updateContext } = React.useContext(RootContext)
    const isFocused = useIsFocused()
    const [previousDeliveries, setDeliveryList] = React.useState([])
    React.useEffect(() => {
        if (isFocused) {
            updateContext({ ...contextObject, headerString: "Delivery history" })
            DeliveyService.getDeliveredOrders(contextObject.currentUser.id)
                .then(data => {
                    setDeliveryList(data);
                })
        }
    }, [isFocused])
    return (
        <View>
            {!previousDeliveries.length && <View style={{
                padding: 10
            }}>
                <Text style={{
                    fontSize: 20
                }}>No pending deliveries</Text>
            </View>}
            {previousDeliveries.length > 0 && <View>
                {previousDeliveries.map((item, index) => <TouchableOpacity key={index} onPress={() => {
                    props.stackNav.navigate('delivery_details', item.id)
                }} style={{
                    padding: 10,
                    backgroundColor: 'white',
                    margin: 10,
                    borderRadius: 10
                }}>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignContent: "center",
                        alignItems: "flex-end"
                    }}>
                        <View>
                            <Text>Pickup from:{item.pickupLocationGeocode}</Text>
                            <Text>Deliver to:{item.dropLocationGeocode}</Text>
                            <Text>Total items:{item.itemsCount}</Text>
                            <Text>
                                {(new Date(item.time * 1)).toLocaleString()}
                            </Text>
                        </View>

                        <View>

                            <Text style={{
                                fontWeight: "bold",
                                color: item.isPaid ? "green" : "red",
                                fontSize: 15
                            }}>{item.isPaid ? "Paid" : "Unpaid"}</Text>
                        </View>
                    </View>

                </TouchableOpacity>)}
            </View>}
        </View>
    );
}

export default DeliveryHistory;