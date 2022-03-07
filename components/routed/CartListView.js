import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import CartServices from '../../services/CartServices'
import CartGroup from './cartViewUtils/CartGroup';
import { RootContext } from '../contexts/GlobalContext'
import { useIsFocused } from '@react-navigation/native';
function CartListView(props) {
    const rootContext = React.useContext(RootContext)

    const [groupedCartList, setCartList] = useState([])
    function updateCartList() {
        CartServices.getCartList().then(carts => {
            rootContext.updateContext({ ...rootContext.contextObject, headerString: "Cart" })

            let cookIndex = 0
            let cookIds = {}
            for (let n = 0; n < carts.length; n++) {
                carts[n]['itemIndex'] = n
                let cookId = carts[n].owner.id
                if (!cookIds[cookId]) cookIds[cookId] = cookIndex++
            }
            let groupedList = new Array(cookIndex).fill([]).map(item => [])
            for (let n = 0; n < carts.length; n++) {
                let itemIndex = cookIds[carts[n].owner.id]
                groupedList[itemIndex].push(carts[n])
                carts[n]['groupIndex'] = groupedList[itemIndex].length - 1
                carts[n]['groupNumber'] = itemIndex
            }
            setCartList(groupedList)
        })
    }
    const isFocused = useIsFocused()
    useEffect(() => {
        if (isFocused)
            updateCartList()
    }, [isFocused])
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
            <TouchableOpacity>
                <View style={styles.footer}>
                    <Text> Place your order </Text>
                </View>
            </TouchableOpacity>
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
export default CartListView;