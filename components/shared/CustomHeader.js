 
import React, { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Text, View, StyleSheet, Image, SafeAreaView,TouchableOpacity } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import HeaderService from '../../services/HeaderService';
function CustomHeader({name,drawerNavigation,stackNavigation }) {
    const [headerString,setHeaderString]=useState("")
     
    useEffect(()=>{
        HeaderService.getHeaderString().subscribe(name=>{
            setHeaderString(name)
        })
    },[])
    return (
        <SafeAreaView style={styles.navbarRoot}>
            <View style={{
                flex:1,
                alignItems:"center",
                justifyContent:"space-between",
                flexDirection:'row',
                paddingTop:10,
                paddingHorizontal:10
            }}>
            <Text onPress={()=>{
                stackNavigation.goBack()
            }} style={{
                 
                
                fontFamily:"sans-serif",
                fontSize:30
            }}><AntDesign name="arrowleft" size={24} color="black" /> {headerString} </Text>
                <View style={{
                    display:"flex",
                    flexDirection:"row",
                    
                }}>
                   <EvilIcons onPress={()=>{}} name="bell" size={40} color="black" />
                   <TouchableOpacity onPress ={()=>{
							stackNavigation.push('Cart')
						}} >
						<EvilIcons  name="cart"size={40} color="black" />
                   </TouchableOpacity>
                </View>
           
            </View>
        </SafeAreaView>
    );
}

const styles=StyleSheet.create({
    navbarRoot:{
        height:90,
         
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
       
         
        backgroundColor:"white"
    },
    profilePicture:{
        width:60,
        height:60,
        borderRadius:40,
        marginTop:20,
        marginRight:10
    }
})

export default CustomHeader;