import React, { useState } from 'react';
import { View,Text,StyleSheet, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';

function AddTocart({post}) {
    const [itemChosen,setItemChosen]=useState(1)
    function updateAmount(type){
        setItemChosen(Math.min(Math.max(1,itemChosen+type),post.amountProduced))
    }
    return (
        <View style={{
            padding:10
        }}>
            <View style={{
                 
                display:"flex",
                flexDirection:"row",
                justifyContent:"space-between"
                
            } }>
                <Text style={{
                    fontSize:30
                }}>Amount</Text>
                <View  style={styles.alighnHorizontal}>
                    <TouchableOpacity onPress={()=>updateAmount(1)}>
                        <View style={{
                            backgroundColor:"#C4C4C4",
                            height:50,
                            aspectRatio:1,
                            borderRadius:50,
                            justifyContent: 'center',
                            alignItems: 'center',
                        
                        }}> 
                            <Text style={{
                            fontSize:20
                        }}>+</Text> 
                            </View>
                    </TouchableOpacity>
                    <View style={{
                            backgroundColor:"#FA01FF",
                            height:50,
                            aspectRatio:1,
                            borderRadius:10,
                            justifyContent: 'center',
                            alignItems: 'center',
                        
                        }}> 
                            <Text style={{
                            fontSize:20
                        }}>{itemChosen}</Text> 
                            </View>
                    <TouchableOpacity onPress={()=>updateAmount(-1)}>
                        <View style={{
                            backgroundColor:"#C4C4C4",
                            height:50,
                            aspectRatio:1,
                            borderRadius:50,
                            justifyContent: 'center',
                            alignItems: 'center',
                        
                        }}> 
                            <Text style={{
                                fontSize:40
                            }}>-</Text> 
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{
                display:"flex",
                flexDirection:"row",
                justifyContent:"space-between",
                marginVertical:10
            }} >
                <Text  style={{
                    fontSize:25,
                    fontWeight:"bold"
                }}>Total Charge</Text>
                <Text  style={{
                    fontSize:25,
                    fontWeight:"bold"
                }}> Tk {itemChosen*post.unitPrice} </Text>
            </View>
        </View>
    );
}

const styles=StyleSheet.create({
    alighnHorizontal:{
        display:"flex",
        flexDirection:"row",

    }
})

export default AddTocart;