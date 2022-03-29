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
    let orderDetails = props.route.params
    const isFocused = useIsFocused()
    const [buyerInfo, setBuyerInfo] = React.useState({
        id: 0,
        facebookToken: {
            name: "",
            profileImageURL: "aa"
        }
    })
    const [productList, setProductList] = React.useState([])
    function rejectAProduct(id) {
        let temp = productList
        for (let item of temp) {
            if (item.product.id == id) item.status = -1
        }
        setProductList(temp)
    }
    function acceptAProduct(id) {
        let temp = productList
        for (let item of temp) {
            if (item.product.id == id) item.status = -1
        }
        setProductList(temp)
    }
    React.useEffect(() => {

        (async () => {
            if (isFocused) {
                updateContext({ ...contextObject, headerString: "Order info" })
                let productList = []
                setBuyerInfo({
                    id: orderDetails.buyer.id,
                    facebookToken: JSON.parse(orderDetails.buyer.facebookToken)
                })
                for (let item of orderDetails.orderedItems) {
                    let data = {
                        amount: item.amount,
                        product: item.post,
                        status: 1
                    }
                    productList.push(data)

                }
                setProductList(productList)
            }

        })()
    }, [isFocused])
    return (
        <View style={{
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
                    return <OrderListItem onReject={() => {
                        rejectAProduct(order.product.id)
                    }} onAccept={() => {
                        acceptAProduct(order.product.id)
                    }} navigation={props.navigation} key={index} order={order} />
                })}
            </ScrollView>
            <LocationView mapVisibility={mapVisibility} setMapVisibility={setMapVisibility} target={{
                latitude: orderDetails.drop_lat,
                longitude: orderDetails.drop_long
            }} tagnameLabel={`${buyerInfo.facebookToken.name}`} />
            <View style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between"
            }}>
                <TouchableOpacity style={[styles.footer, {
                    backgroundColor: "#11b015"
                }]} onPress={() => {

                    OrderServices.acceptOrders(orderDetails.id, productList)
                        .then(data => {
                            ToastAndroid.showWithGravity(
                                "Order accepted succesfully!",
                                ToastAndroid.SHORT,
                                ToastAndroid.CENTER
                            )
                            props.navigation.navigate('HomeView')
                        })
                }}>
                    <Text style={{
                        fontSize: 15
                    }}>Done</Text>

                </TouchableOpacity>
                <TouchableOpacity style={[styles.footer, {
                    backgroundColor: "#ea0291"
                }]} onPress={() => {


                }}>
                    <Text style={{
                        fontSize: 15
                    }}>Reject all</Text>

                </TouchableOpacity>
            </View>
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