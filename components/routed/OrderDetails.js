import React from 'react';
import { View, Text, Image, Button, ToastAndroid } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import PostService from '../../services/PostService';
import LocationView from '../shared/LocationView';
import OrderListItem from './OrderListItem/OrderListItem';
import { RootContext } from '../contexts/GlobalContext';
import { useIsFocused } from '@react-navigation/native';
import OrderServices from '../../services/OrderServices';


function OrderDetails(props) {
    const [mapVisibility, setMapVisibility] = React.useState(false)
    let { updateContext, contextObject } = React.useContext(RootContext)
    let orderId = props.route.params
    const [orderDetails, setOrderDetails] = React.useState({})
    const [isLoaded, setIsLoaded] = React.useState(false)
    const [isOrderAccepted, setOrderAcceptance] = React.useState(false)
    const [isOrderRejected, setOrderRejectance] = React.useState(false)
    const [isAccepted, setAcceptance] = React.useState([])
    const isFocused = useIsFocused()
    const [buyerInfo, setBuyerInfo] = React.useState({
        id: 0,
        facebookToken: {
            name: "",
            profileImageURL: "aa"
        }
    })
    const [productList, setProductList] = React.useState([])
    function rejectAProduct(index) {
        let temp = [...isAccepted]
        temp[index] = 0
        setAcceptance(temp)
    }
    function acceptAProduct(index) {
        let temp = [...isAccepted]
        temp[index] = 1
        setAcceptance(temp)
    }
    React.useEffect(() => {

        (async () => {
            if (isFocused) {
                OrderServices.getOrderInfo(orderId)
                    .then(orderInfoData => {
                        updateContext({ ...contextObject, headerString: "Order info" })
                        let productList = []
                        if (orderInfoData.status == 2) {
                            setOrderRejectance(true)
                        }
                        else if (orderInfoData.status == 1) {
                            setOrderAcceptance(true)
                        }
                        setBuyerInfo({
                            id: orderInfoData.buyer.id,
                            facebookToken: JSON.parse(orderInfoData.buyer.facebookToken)
                        })
                        let statuses = []
                        for (let item of orderInfoData.orderedItems) {

                            let data = {
                                amount: item.amount,
                                product: item.post,
                                status: item.status
                            }
                            productList.push(data)
                            statuses.push(item.status)

                        }
                        setAcceptance(statuses)
                        setProductList(productList)
                        setOrderDetails(orderInfoData)
                    })
                    .then(() => {
                        setIsLoaded(true)
                    })
            }

        })()
    }, [isFocused])
    function rejectSome() {
        let rejectedItems = []
        let acceptedItems = []
        for (let n = 0; n < productList.length; n++) {
            if (!isAccepted[n]) rejectedItems.push({
                itemName: productList[n].product.itemName,
                postid: productList[n].product.id
            })
            else acceptedItems.push(productList[n])
        }

        if (!acceptedItems.length) {
            OrderServices.rejectOrder(orderDetails.id, rejectedItems, contextObject.currentUser.facebookToken.name, buyerInfo.id)
                .then(() => {
                    ToastAndroid.showWithGravity(
                        "Order has been rejected!",
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER
                    )
                    props.navigation.navigate('HomeView')
                })
        }
        else {
            OrderServices.acceptOrders(orderDetails.id, rejectedItems, contextObject.currentUser.facebookToken.name, buyerInfo.id)
                .then(() => {
                    ToastAndroid.showWithGravity(
                        "Order has been accepted!",
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER
                    )
                    props.navigation.navigate('HomeView')
                })
        }

    }
    return (
        <View style={{
            flex: 1,

        }}>
            {!isLoaded && <Text>Loading...</Text>}
            {isLoaded && <View style={{
                flex: 1,
                padding: 10,
                margin: 10,
                borderRadius: 5,
                backgroundColor: "white"
            }}>

                <Text style={{
                    fontSize: 18
                }}>Ordered by</Text>
                <View style={{
                    marginVertical: 5,
                    display: "flex",
                    flexDirection: "row",
                    alignContent: "center",
                    alignItems: "center",
                    justifyContent: "space-around"
                }}>
                    <Image style={{
                        height: 120,
                        aspectRatio: 1,
                        borderRadius: 90
                    }} source={{
                        uri: buyerInfo.facebookToken.profileImageURL
                    }} />
                    <View>
                        <Text style={{
                            fontSize: 20
                        }}>{buyerInfo.facebookToken.name}</Text>
                        <Button title='View profile' />
                        <Text>{(new Date(orderDetails.time)).toLocaleTimeString()},{(new Date(orderDetails.time)).toDateString()}</Text>
                    </View>
                </View>
                <View style={{


                    marginVertical: 10,
                    alignItems: 'center',
                }}>
                    <TouchableOpacity onPress={() => {
                        setMapVisibility(true)
                    }} style={{
                        backgroundColor: "#e1bee0",
                        padding: 10,
                        borderRadius: 5
                    }}>
                        <Text>View user location</Text>
                    </TouchableOpacity>
                </View>
                <Text style={{
                    fontSize: 18
                }}>Ordered items</Text>
                <ScrollView style={{
                    padding: 10
                }}>
                    {productList.map((order, index) => {
                        return <View key={index} style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            alignContent: "center",
                            justifyContent: "space-around"
                        }} >
                            <OrderListItem navigation={props.navigation} order={order} />
                            {!(isOrderAccepted || isOrderRejected) && <View>

                                {isAccepted[index] == 1 && <TouchableOpacity onPress={() => {
                                    rejectAProduct(index)
                                }} style={{
                                    backgroundColor: "#ea0291",
                                    padding: 10,
                                    borderRadius: 10
                                }}>
                                    <Text>Reject</Text>
                                </TouchableOpacity>}
                                {isAccepted[index] == 0 && <TouchableOpacity onPress={() => {
                                    acceptAProduct(index)
                                }} style={{
                                    backgroundColor: "#11b015",
                                    padding: 10,
                                    borderRadius: 10
                                }}>
                                    <Text>Accept</Text>
                                </TouchableOpacity>}
                            </View>}

                            {isOrderAccepted && <TouchableOpacity style={{
                                backgroundColor: "#c4c4c4",
                                padding: 10,
                                borderRadius: 10
                            }}>
                                <Text>{isAccepted[index] == 0 ? "Rejected" : "Accepted"}</Text>
                            </TouchableOpacity>}
                            {isOrderRejected && <TouchableOpacity style={{
                                backgroundColor: "#c4c4c4",
                                padding: 10,
                                borderRadius: 10,

                            }}>
                                <Text>Rejected</Text>
                            </TouchableOpacity>}
                        </View>
                    })}
                </ScrollView>
                <LocationView mapVisibility={mapVisibility} setMapVisibility={setMapVisibility} target={{
                    latitude: orderDetails.drop_lat,
                    longitude: orderDetails.drop_long
                }} tagnameLabel={`${buyerInfo.facebookToken.name}`} />
                {(!isOrderAccepted && !isOrderRejected) && <View style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}>
                    <TouchableOpacity style={[styles.footer, {
                        backgroundColor: "#11b015"
                    }]} onPress={() => {
                        rejectSome()

                    }}>
                        <Text style={{
                            fontSize: 15
                        }}>Done</Text>

                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.footer, {
                        backgroundColor: "#ea0291"
                    }]} onPress={() => {
                        rejectSome()

                    }}>
                        <Text style={{
                            fontSize: 15
                        }}>Reject all</Text>

                    </TouchableOpacity>
                </View>}


                {(isOrderAccepted || isOrderRejected) && <View style={[styles.footer, {
                    backgroundColor: "#c4c4c4"
                }]}>
                    <Text>{isOrderAccepted ? "Order has been accepted" : "Order has been rejected"}</Text>
                </View>}
            </View>}
        </View>
    );
}

const styles = StyleSheet.create({
    footer: {
        paddingHorizontal: 40,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,

    }
})

export default OrderDetails;