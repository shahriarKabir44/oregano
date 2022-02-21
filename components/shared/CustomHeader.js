 
import React from 'react';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { Text, View, StyleSheet, Image, SafeAreaView,TouchableOpacity } from 'react-native';
const profilePictureURL="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4QfHXtZSr7Y9IoJWng-WknDoAHZxbxPC6QQ&usqp=CAU"
function CustomHeader({name,drawerNavigation,stackNavigation}) {
    function popupSidebar(){
        drawerNavigation.dispatch(DrawerActions.toggleDrawer())
    }
    return (
        <SafeAreaView style={styles.navbarRoot}>
            <Text onPress={()=>{
                stackNavigation.goBack()
            }} style={{
                 
                paddingTop:30,
                fontFamily:"sans-serif",
                fontSize:30
            }}><AntDesign name="arrowleft" size={24} color="black" /> {name} </Text>
            <TouchableOpacity onPress={()=>{
                popupSidebar()
            }}>
                <Image style={styles.profilePicture} 
                    source={{
                        uri:profilePictureURL
                    }}
                />
            </TouchableOpacity>
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