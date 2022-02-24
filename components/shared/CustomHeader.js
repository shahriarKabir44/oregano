 
import React from 'react';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { Text, View, StyleSheet, Image, SafeAreaView,TouchableOpacity } from 'react-native';
import navigationObjects from '../Globals';
import { EvilIcons } from '@expo/vector-icons';
function CustomHeader({name,drawerNavigation,stackNavigation }) {
    function popupSidebar(){
        navigationObjects.drawer.dispatch(DrawerActions.toggleDrawer())
    }
    return (
        <SafeAreaView style={styles.navbarRoot}>
            <View style={{
                flex:1,
                alignItems:"center",
                justifyContent:"space-between",
                flexDirection:'row',
                paddingTop:10
            }}>
            <Text onPress={()=>{
                stackNavigation.goBack()
            }} style={{
                 
                
                fontFamily:"sans-serif",
                fontSize:30
            }}><AntDesign name="arrowleft" size={24} color="black" /> {name} </Text>
            <TouchableOpacity onPress={()=>{
                  popupSidebar()
            }}>
                <View style={{
                    display:"flex",
                    flexDirection:"row",
                    
                }}>
                   <EvilIcons onPress={()=>{}} name="bell" size={40} color="black" />
                   <EvilIcons onPress={()=>{}} name="cart" size={40} color="black" />
                </View>
            </TouchableOpacity>
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