import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { RootContext } from '../../contexts/GlobalContext';

function CartItem(props) {

    const rootContext = React.useContext(RootContext)
    return (
        <TouchableOpacity onPress={() => {
            let headerString = `${props.item.owner.facebookToken.name}'s post`
            let postId = props.item.id
            rootContext.updateContext({ ...rootContext.contextObject, headerString: headerString })
            props.navigation.push('Post details', {
                postId: postId,
                headerString: headerString
            })
        }}>
            <View style={[styles.container, styles.alighnHorizontal]}>
                <View style={styles.img}>
                    <Image style={{
                        aspectRatio: 1,
                        width: 120,
                        borderRadius: 60
                    }} source={{
                        uri: props.item['images'][0]
                    }} />
                </View>
                <View style={styles.info}>
                    <View style={[styles.alighnHorizontal, {
                        paddingVertical: 5
                    }]}>
                        <Text>{props.item.itemName} </Text>

                    </View>
                    <View style={[styles.alighnHorizontal, {
                        paddingVertical: 5
                    }]}>
                        <Text>Amount</Text>
                        <View style={styles.alighnHorizontal}>

                            <View >
                                <Text style={{
                                    fontSize: 15
                                }}>{props.item.amount} {props.item.unitType}</Text>
                            </View>

                        </View>

                    </View>
                    <View style={[styles.alighnHorizontal, {
                        paddingVertical: 5
                    }]}>
                        <Text>Tk {props.item.unitPrice * props.item.amount} </Text>
                        <Text>Delivery: Tk:30</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
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
export default CartItem;