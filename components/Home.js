import React from 'react';
import PostCardRoot from './shared/PostCardRoot';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

function Home(props) {
     return (
        <SafeAreaView>
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
                    >From your favourites</Text>
                    <PostCardRoot />
                    <Text
                        style={{
                            fontSize: 20,
                            marginVertical: 5,
                            paddingLeft: 5
                        }}
                    >From your recent searches</Text>
                    <PostCardRoot />
                </View>
            </ScrollView>
           
            <View style={{
                position:"absolute",
                borderRadius:50,
                height:60,
                aspectRatio:1,
                backgroundColor:"green",
                bottom:20,
                right:20,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                
            }} >
                 <TouchableOpacity onPress={()=>{
                     console.log('first')
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