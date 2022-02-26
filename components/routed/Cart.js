import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import CartServices from '../../services/CartServices'
import CartGroup from './cartViewUtils/CartGroup';
function Cart(props) {
    const [groupedCartList,setCartList]=useState([])
    useEffect(()=>{
        CartServices.getCartList().then(carts=>{
            let cookIndex=0
            let cookIds={}
            for(let item in carts){
                let cookId=item.owner.id
                if(!cookIds[cookId])cookIds[cookId]=cookIndex++
            }
            let groupedList=new Array(cookIndex).fill([]).map(item=>[])
            for(let item in carts){
                let itemIndex=cookIds[item.owner.id]
                groupedList[itemIndex].push(item)
            }
            setCartList(groupedList)
        })
    },[])
    return (
        <View>
            {groupedCartList.map((group,index)=> <CartGroup key={index} group={group} /> )}
        </View>
    );
}

export default Cart;