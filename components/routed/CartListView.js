import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import CartServices from '../../services/CartServices'
import CartGroup from './cartViewUtils/CartGroup';
function CartListView(props) {
    const [groupedCartList,setCartList]=useState([])
    useEffect(()=>{
        CartServices.getCartList().then(carts=>{
            
            let cookIndex=0
            let cookIds={}
            for(let n =0;n<carts.length; n++){
                console.log(carts[n])
                let cookId=carts[n].owner.id
                if(!cookIds[cookId])cookIds[cookId]=cookIndex++
            }
            let groupedList=new Array(cookIndex).fill([]).map(item=>[])
            for(let n =0;n<carts.length; n++){
                let itemIndex=cookIds[carts[n].owner.id]
                groupedList[itemIndex].push(carts[n])
            }
            setCartList(groupedList)
        })
    },[])
    return (
        <View style={{
            
            margin:5
        }}>
            {groupedCartList.map((group,index)=> <CartGroup key={index} group={group} /> )}
        </View>
    );
}

export default CartListView;