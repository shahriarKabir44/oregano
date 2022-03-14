import React from 'react';
import { View, Text, Image, Button } from 'react-native';


function OrderDetails(props) {
    let orderDetails = props.route.params
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
                    uri: orderDetails.buyer.facebookToken.profileImageURL
                }} />
                <View>
                    <Text style={{
                        fontSize: 20
                    }}>{orderDetails.buyer.facebookToken.name}</Text>
                    <Button title='View location' />
                </View>
            </View>
        </View>
    );
}

export default OrderDetails;