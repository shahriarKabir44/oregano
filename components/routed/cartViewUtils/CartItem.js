import React from 'react';
import { View,StyleSheet, Image,TouchableOpacity,Text } from 'react-native';
import { Entypo } from '@expo/vector-icons';

function CartItem({item}) {
    
    return (
        <View style={[styles.container,styles.alighnHorizontal ]}>
            <View style={styles.img}>
                <Image style={{
                    aspectRatio:1,
                    width:120,
                    borderRadius:60
                }} source={{
                    uri:item['images'][0]
                }} />
            </View>
            <View style={styles.info}>
                <View style={[styles.alighnHorizontal ,{
                    paddingVertical:5
                }]}>
                    <Text> {item.itemName} </Text>
                    <Entypo name="circle-with-cross"  size={25} onPress={()=>{}} color="black" />
                </View>
                <View style={[styles.alighnHorizontal ,{
                    paddingVertical:5
                } ]}>
                    <Text>Amount</Text>
                    <View style={styles.alighnHorizontal}>
                        <TouchableOpacity  >
                            <View style={styles.updateAmountBtn}> 
                                <Text style={{
                                    fontSize:15
                                }}>+</Text> 
                            </View>
                        </TouchableOpacity>
                        <View style={[styles.updateAmountBtn,{
                            backgroundColor:"#C4C4C4"
                        }]}> 
                            <Text style={{
                                fontSize:15
                            }}>{item.amount}</Text> 
                        </View>
                        <TouchableOpacity >
                            <View style={styles.updateAmountBtn}> 
                                <Text style={{
                                    fontSize:15
                                }}>-</Text> 
                            </View>
                        </TouchableOpacity>
                    </View>
                    
                </View>
                <View style={[styles.alighnHorizontal ,{
                    paddingVertical:5
                }]}>
                        <Text> Tk {item.unitPrice*item.amount} </Text>
                        <Text>Delivery: Tk:30</Text>
                    </View>
            </View>
        </View>
    );
}
const styles=StyleSheet.create({
    alighnHorizontal:{
        display:"flex",
        flexDirection:"row",
        backgroundColor:"white",
        borderRadius:10,
        justifyContent:"space-between",
        alignContent:"center",
        alignItems:"center"
    },
    container:{
        justifyContent:"space-between",
        alignContent:"center",
        alignItems:"center",
        margin:5,
        padding:5
    },
    info:{
        flex:1,
        paddingHorizontal:5
    },
    updateAmountBtn:{
        backgroundColor:"#FA01FF",
        height:30,
        aspectRatio:1,
        borderRadius:10,
        justifyContent: 'center',
        alignItems: 'center',
    
    }
})
export default CartItem;