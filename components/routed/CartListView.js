import React, { useEffect, useState } from 'react';
import { Dimensions, Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import CartServices from '../../services/CartServices'
import { BottomSheet } from 'react-native-btr';

import CartGroup from './cartViewUtils/CartGroup';
import { RootContext } from '../contexts/GlobalContext'
import { useIsFocused } from '@react-navigation/native';
import OrderConfirmation from './cartViewUtils/OrderConfirmation';
function CartListView(props) {
    const rootContext = React.useContext(RootContext)
    const [bottomSheetVisibility, setBottomSheetVisibility] = useState(false)
    const [groupedCartList, setCartList] = useState([])
    const [totalCharge, setTotalCharge] = useState(0)
    const [shouldRefresh, setRefreshFlag] = useState(false)
    const [isListEmpty, setEmptinessStatus] = useState(false)
    const [orderItems, setOrderItems] = useState([])
    function updateCartList() {

        rootContext.setHeaderString("Cart")
        CartServices.getcartItems().then(items => {
            console.log(items)
        })
    }
    const isFocused = useIsFocused()
    useEffect(() => {
        if (isFocused)
            updateCartList()
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
                    {groupedCartList.map((group, index) => <CartGroup navigation={props.navigation} key={index} group={group} />)}
                </View>
            </ScrollView>
            <View style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 10
            }}>
                <Text style={{
                    fontSize: 20
                }}>Total Charge</Text>
                <Text style={{
                    fontSize: 20,
                    fontWeight: "bold"
                }}>Tk{totalCharge}</Text>
            </View>
            <TouchableOpacity onPress={() => {
                if (!isListEmpty) setBottomSheetVisibility(true)

            }}>
                <View style={[styles.footer, {
                    backgroundColor: isListEmpty ? "#c4c4c4" : "#FFA500",
                }]}>
                    <Text>{isListEmpty ? "Please add items to cart" : "Confirm Location"}</Text>
                </View>
            </TouchableOpacity>
            <BottomSheet visible={bottomSheetVisibility}
                onBackButtonPress={() => {
                    setBottomSheetVisibility(false)
                }}
                onBackdropPress={() => {
                    setBottomSheetVisibility(false)
                }}
            >
                <View style={styles.bottomNavigationView}>
                    <OrderConfirmation setTotalCharge={setTotalCharge} setRefreshFlag={setRefreshFlag} orderItems={orderItems} setBottomSheetVisibility={setBottomSheetVisibility} />
                </View>
            </BottomSheet>
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
})
export default CartListView;