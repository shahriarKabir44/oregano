import React from 'react';
import PostCardRoot from './shared/PostCardRoot';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import navigationObjects from './Globals'
function Home(props) {
    navigationObjects.drawer=props.drawerNav
    navigationObjects.stack=props.stackNav
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
           
            
            
        </SafeAreaView>
    );
}

export default Home;