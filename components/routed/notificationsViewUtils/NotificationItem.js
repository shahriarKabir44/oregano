import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import NotificationService from '../../../services/NotificationServices';
import OrderServices from '../../../services/OrderServices';
import { RootContext } from '../../contexts/GlobalContext';

function NotificationItem({ notificationItem, navigator }) {
    let { updateContext, contextObject } = React.useContext(RootContext)
    return (
        <View style={{
            padding: 10,
            marginVertical: 5,
            backgroundColor: notificationItem.isSeen ? "#c4c4c4" : "#79ACD0",
            borderRadius: 5
        }}>
            <TouchableOpacity onPress={() => {
                NotificationService.updateSeenStatus(notificationItem.id)
                    .then(() => {
                        if (notificationItem.relatedSchemaId) {

                            OrderServices.getOrderInfo(notificationItem.relatedSchemaId)
                                .then((orderInfo) => {
                                    switch (notificationItem.type) {
                                        case 1:
                                            updateContext({ ...contextObject, headerString: "Order info" })
                                            navigator.push('order_details', orderInfo)
                                            break;
                                        case 2:
                                            updateContext({ ...contextObject, headerString: "Delivery info" })
                                            navigator.push('delivery_details', orderInfo)
                                        default:
                                            break;
                                    }
                                })


                        }
                    })
            }}>
                <Text> {notificationItem.message} </Text>
            </TouchableOpacity>

        </View>
    );
}

export default NotificationItem;