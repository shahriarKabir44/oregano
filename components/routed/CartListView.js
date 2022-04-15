import React, { useEffect, useState } from 'react';
import { Dimensions, Text, View, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import CartServices from '../../services/CartServices'
import { BottomSheet } from 'react-native-btr';

import ResultBottomSheet from '../../components/routed/search/ResultBottomSheet'
import { RootContext } from '../contexts/GlobalContext'
import { useIsFocused } from '@react-navigation/native';
import OrderConfirmation from './cartViewUtils/OrderConfirmation';
function CartListView(props) {
    const [dropDownVisibility, popupBottomSheet] = React.useState(false)
    const rootContext = React.useContext(RootContext)
    const [bottomSheetVisibility, setBottomSheetVisibility] = useState(false)
    const [groupedCartList, setCartList] = useState([])
    const [totalCharge, setTotalCharge] = useState(0)
    const [shouldRefresh, setRefreshFlag] = useState(false)
    const [isListEmpty, setEmptinessStatus] = useState(false)
    const [orderItems, setOrderItems] = useState([])
    const [selectedcartItem, setSelectedCartItem] = useState(null)
    function updateCartList() {

        rootContext.setHeaderString("Cart")
        CartServices.getcartItems().then(data => {
            const { cooks, items } = data
            for (let cook of cooks) {
                cook.items = []
                for (let item of items) {
                    if (item.vendor.Id == cook.Id) {

                        cook.items.push(item)
                    }
                }
            }
            setCartList(cooks)
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
                    {groupedCartList.map((group, index) => <View key={index} style={{
                        marginVertical: 5,
                        backgroundColor: "#C4C4C4",
                        borderRadius: 5,
                        padding: 10
                    }}>
                        <Text>From</Text>
                        <View style={{
                            display: 'flex',
                            flexDirection: "row",
                            alignItems: "center",
                            alignContent: "center",
                            margin: 10
                        }}>
                            <Image style={{
                                height: 50,
                                aspectRatio: 1,
                                borderRadius: 50,
                            }} source={{ uri: group.facebookToken.profileImageURL }} />
                            <Text>{group.name}</Text>
                        </View>
                        {group.items.map((item, index1) => <TouchableOpacity key={index1} onPress={() => {
                            setSelectedCartItem(item)
                            popupBottomSheet(true)
                        }}>
                            <View style={[styles.container, styles.alighnHorizontal]}>
                                <Image style={{
                                    height: 50,
                                    aspectRatio: 1,
                                    borderRadius: 50,
                                }} source={{ uri: item.relatedPosts[0]?.images[0] }} />
                                <View>
                                    <Text>{item.itemName}</Text>
                                    <Text>Amount:{item.amount}</Text>
                                    <Text>Tk.{item.amount * item.price}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>)}
                    </View >)}
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
            <ResultBottomSheet {...props} onChange={() => {
                setRefreshFlag(!shouldRefresh)
            }} bottomSheetVisibility={dropDownVisibility} popupBottomSheet={popupBottomSheet} selectedSearchResult={selectedcartItem} setSearchResultItem={() => { }} />

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