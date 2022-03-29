import React from 'react';
import { View, Image, Text, TouchableOpacity, Button } from 'react-native';


function OrderListItem(props) {
    React.useEffect(() => { }, [props.order])
    return (
        <View style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            alignContent: "center"
        }}>
            <TouchableOpacity onPress={() => {
                props.navigation.push('Post details', {
                    postId: props.order.product.id,
                    headerString: `Your post`
                })
            }} style={{
                display: "flex",
                flexDirection: "row",
                alignContent: "center",
                alignItems: "center",
                backgroundColor: "#e7ddd1",
                borderRadius: 10,
                width: "80%",
                justifyContent: "space-around",

            }}>
                <Image style={{
                    width: 80,
                    aspectRatio: 1,
                    borderRadius: 50
                }} source={{
                    uri: JSON.parse(props.order.product.images)[0]
                }} />
                <View>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: "bold"
                    }}>{props.order.product.itemName}</Text>
                    <Text>Amount: {props.order.amount}{props.order.product.unitType} </Text>
                </View>
            </TouchableOpacity>
            <View>

                {props.order.status == 1 && <TouchableOpacity onPress={props.onReject} style={{
                    backgroundColor: "#ea0291",
                    padding: 10,
                    borderRadius: 10
                }}>
                    <Text>Reject</Text>
                </TouchableOpacity>}
                {props.order.status == -1 && <TouchableOpacity onPress={props.onAccept} style={{
                    backgroundColor: "green",
                    padding: 10,
                    borderRadius: 10
                }}>
                    <Text>Accept</Text>
                </TouchableOpacity>}
            </View>
        </View>
    );
}

export default OrderListItem;