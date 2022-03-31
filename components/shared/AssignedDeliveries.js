import React from 'react';
import { RootContext } from '../contexts/GlobalContext'
import DeliveyService from '../../services/DeliveryService'
import { useIsFocused } from '@react-navigation/native';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
function AssignedDeliveries(props) {
    const isFocused = useIsFocused()


    const [deliveries, setDeliveryList] = React.useState([])
    const { contextObject, updateContext } = React.useContext(RootContext)
    React.useEffect(() => {
        if (isFocused) {
            updateContext({ ...contextObject, headerString: "Assigned orders" })
            DeliveyService.getAssignedDeliveries(contextObject.currentUser.id)
                .then(data => {
                    setDeliveryList(data)
                })
        }

    }, [isFocused])
    return (
        <View>
            {!deliveries.length && <View style={{
                padding: 10
            }}>
                <Text style={{
                    fontSize: 20
                }}>No pending deliveries</Text>
            </View>}
            {deliveries.length > 0 && <View>
                {deliveries.map((item, index) => <TouchableOpacity key={index} onPress={() => {
                    props.stackNav.navigate('delivery_details', item.id)
                }} style={{
                    padding: 10,
                    backgroundColor: 'white',
                    margin: 10,
                    borderRadius: 10
                }}>
                    <View>
                        <Text>Pickup from:{item.pickupLocationGeocode}</Text>
                        <Text>Deliver to:{item.dropLocationGeocode}</Text>
                        <Text>Total items:{item.itemsCount}</Text>
                        <Text>
                            {(new Date(item.time * 1)).toLocaleString()}
                        </Text>
                    </View>
                </TouchableOpacity>)}
            </View>}
        </View>
    );
}



export default AssignedDeliveries;