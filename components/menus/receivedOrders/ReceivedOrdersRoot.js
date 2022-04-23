import React from 'react';
import { View, Text, Image, RefreshControl, TouchableOpacity, ScrollView, StyleSheet, Dimensions, FlatList, ToastAndroid } from 'react-native'
import Collapsible from 'react-native-collapsible';

import { BottomSheet } from 'react-native-btr';
import OrderServices from '../../../services/OrderServices';
import { RootContext } from '../../contexts/GlobalContext';
import { useIsFocused } from '@react-navigation/native';

function ReceivedOrdersRoot(props) {
    const isFocused = useIsFocused()
    const [refreshing, setRefreshing] = React.useState(false);

    const { setHeaderString, getCurrentuser } = React.useContext(RootContext)
    const [orderList, setOrderList] = React.useState([])
    function loadData() {
        setRefreshing(true)

        OrderServices.getReceivedOrders(getCurrentuser().id)
            .then(data => {
                setOrderList(data);
                setRefreshing(false)

            })
    }
    React.useEffect(() => {
        if (isFocused) {
            setHeaderString("Received orders")
            loadData()
        }
    }, [isFocused])
    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadData} />}

            >
                {orderList.map((item, index1) => {
                    return <OrderGroup loadData={loadData} item={item} {...props} index={index1} />
                })}
            </ScrollView>
        </View>
    );
}

function OrderGroup(props) {
    const [collapsibleVisibility, setCollapsibleVisibility] = React.useState(true)
    const [orderItems, setOrderItems] = React.useState([])

    async function getOrderItems() {
        let data = await OrderServices.getOrderInfo(props.item.id)

        setOrderItems(data.orderedItems);
    }

    function translateStatus(status) {
        console.log(status);
        switch (status) {
            case 0:
                return 'Pending'
            case -1:
                return "Pending rider"
            case -2:
                return "Searching for rider"
            case 2:
                return "Rejected"
            case 3:
                return "Pending pickup"
            case 4:
                return "Awaiting delivery"
            default:
                return "Delivered"
        }
    }

    return (<View style={{
        backgroundColor: "#F5C9E6",
        padding: 10,
        margin: 5,
        borderRadius: 5,
    }} >
        <TouchableOpacity onPress={() => {
            getOrderItems().then(() => {
                setCollapsibleVisibility(!collapsibleVisibility)
            })

        }} style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignContent: "center",
            alignItems: 'center',
            backgroundColor: "#d5dbec",
            padding: 10,
            borderRadius: 10
        }}>
            <View>
                <Text>From {props.item.buyer.name} </Text>
                <Text >{(new Date(props.item.time).toLocaleTimeString())}, {(new Date(props.item.time).toLocaleDateString())}</Text>

            </View>
            <View>
                <Image style={{
                    height: 50,
                    aspectRatio: 1,
                    borderRadius: 50
                }} source={{ uri: props.item.buyer.personalInfo.profileImageURL }} />
            </View>

        </TouchableOpacity>

        <Collapsible style={{
            padding: 10
        }} collapsed={collapsibleVisibility} align="center">
            {orderItems.map((orderedItem, index) => <View key={index} style={[styles.content, {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                alignContent: "center",
                justifyContent: "space-around"
            }]}>
                <Image style={{
                    width: 50,
                    aspectRatio: 1,
                    borderRadius: 50
                }} source={{
                    uri: JSON.parse(orderedItem.lastPost.images)[0]
                }} />
                <View>
                    <Text>Name: {orderedItem.lowerCasedName} </Text>
                    <Text>Amount: {orderedItem.amount}</Text>
                </View>
            </View>)}

            <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                alignContent: "center",
                padding: 10
            }}>
                <Text>{translateStatus(props.item.status)}</Text>
                {(props.item.status == 0 || props.item.status == -1) && <TouchableOpacity style={{
                    padding: 10,
                    backgroundColor: "#DAA3EF"
                }} onPress={() => {
                    if (props.item.status == 0) {
                        props.stackNav.navigate('order_details', props.item.id)
                    }
                    else if (props.item.status == -1) {
                        OrderServices.requestRider(props.item.id)
                            .then((data) => {
                                props.loadData()
                            })
                    }
                }}>
                    {props.item.status == 0 && <Text>View Details</Text>}
                    {props.item.status == -1 && <Text>Request for a rider</Text>}
                </TouchableOpacity>}
            </View>
        </Collapsible>



    </View>)
}

const styles = StyleSheet.create({
    content: {
        padding: 5,
        backgroundColor: '#fff',
        borderRadius: 5,

        marginHorizontal: 5,
    }
})

export default ReceivedOrdersRoot;