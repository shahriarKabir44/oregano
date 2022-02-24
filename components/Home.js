import React from 'react';
import PostCardRoot from './shared/PostCardRoot';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import navigationObjects from './Globals'
function Home(props) {
    navigationObjects.drawer=props.drawerNav
    navigationObjects.stack=props.stackNav
      return (
        <SafeAreaView style={{
            flex:1
        }}>
            <ScrollView style={{
                 
            }}>
                <View style={{
                    overflow: "visible"
                }}>
                    <Text
                        style={{
                            fontSize: 30,
                            paddingLeft: 5
                        }}
                    >From Your Favourites</Text>
                    <PostCardRoot {...props} />
                    <Text
                        style={{
                            fontSize: 20,
                            marginVertical: 5,
                            paddingLeft: 5
                        }}
                    >From your recent searches</Text>
                    <PostCardRoot {...props}/>
                </View>
            </ScrollView>
           
            <View style={{
                position:"absolute",
                borderRadius:50,
                height:60,
                aspectRatio:1,
                backgroundColor:"#02DBC6",
                bottom:20,
                right:20,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                
            }} >
                 <TouchableOpacity onPress={()=>{
                     props.stackNav.push("Create post")
                 }}>
                    <Text style={{
                        color:"white",
                        fontSize:30,
                    }}
                    >+</Text>
                </TouchableOpacity>
                </View>    
            
        </SafeAreaView>
    );
}

export default Home;