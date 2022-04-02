import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import RatingServices from '../../../services/RatingServices';
import { RootContext } from '../../contexts/GlobalContext';

function OrderItem({ orderItem, navigator }) {
    const [myRating, setMyRating] = React.useState(-1)
    const { contextObject } = React.useContext(RootContext)
    React.useEffect(() => {
        RatingServices.getMyRating(orderItem.post.id, contextObject.currentUser.id)
            .then(data => {
                console.log(data?.rating)
                setMyRating(!data?.rating ? -1 : data.rating)
            })
    }, [])
    return (
        <TouchableOpacity style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "#eddbdb",
            padding: 10,
            margin: 5,
            borderRadius: 5,
            alignItems: "center",
            alignContent: "center"
        }}>
            <View>
                <Text>{orderItem.post.itemName}</Text>
                <Text>{orderItem.amount} {orderItem.post.unitType}</Text>
                <Text>Your rating:{myRating == -1 ? "Unrated" : `${myRating}⭐`}</Text>
            </View>
            <Image style={{
                height: 50,
                aspectRatio: 1,
                borderRadius: 50
            }} source={{
                uri: JSON.parse(orderItem.post.images)[0]
            }} />
        </TouchableOpacity>
    );
}

export default OrderItem;