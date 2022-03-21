import React from 'react';
import { View, Text, Image, Button } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import PostService from '../../services/PostService';
import LocationView from '../shared/LocationView';
import OrderListItem from './OrderListItem/OrderListItem';
import { RootContext } from '../contexts/GlobalContext';
import { useIsFocused } from '@react-navigation/native';


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
                        product: item.post
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
                fontSize: 15
            }}>Ordered by:</Text>
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
                    backgroundColor: "#c4c4c4",
                    padding: 10,

                }}>
                    <Text>View user location:</Text>
                </TouchableOpacity>
            </View>
            <Text>Ordered items</Text>
            <ScrollView>
                {productList.map((order, index) => {
                    return <OrderListItem navigation={props.navigation} key={index} order={order} />
                })}
            </ScrollView>
            <LocationView mapVisibility={mapVisibility} setMapVisibility={setMapVisibility} target={{
                latitude: 21.8022,
                longitude: 89.5339
            }} tagnameLabel={`${buyerInfo.facebookToken.name}`} />
            <View style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between"
            }}>
                <TouchableOpacity style={[styles.footer, {
                    backgroundColor: "green"
                }]} onPress={() => {


                }}>
                    <Text style={{
                        fontSize: 15
                    }}>Accept all</Text>

                </TouchableOpacity>
                <TouchableOpacity style={[styles.footer, {
                    backgroundColor: "red"
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