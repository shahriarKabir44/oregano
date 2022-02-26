import React from 'react';
import { View } from 'react-native';
import CartItem from './CartItem';

function CartGroup({group}) {
    return (
        <View style={{
            marginVertical:5,
            backgroundColor:"#C4C4C4",
            borderRadius:5
        }}>
            {group.map((item,index)=> <CartItem item={item} key={index} /> )}
        </View>
    );
}

export default CartGroup;