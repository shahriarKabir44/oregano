import { useIsFocused } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import OrderServices from '../../../services/OrderServices'
import { RootContext } from '../../contexts/GlobalContext';
import Ordergroup from './Ordergroup';

function OrderHistory(props) {
    const isFocused = useIsFocused()
    const { contextObject, setHeaderString } = React.useContext(RootContext)
    const [orderList, setOrderList] = React.useState([])
    React.useEffect(() => {
        setHeaderString("Order history")
        OrderServices.getPreviousOrders(contextObject.currentUser.id)
            .then(data => {
                setOrderList(data)
            })
    }, [isFocused])
    return (
        <View style={{
            flex: 1
        }}>
            <ScrollView>
                {orderList.map((item, key) => {
                    return <Ordergroup key={key} orderInfo={item} navigator={props.navigation} />
                })}
            </ScrollView>
        </View>
    );
}

export default OrderHistory;