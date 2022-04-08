import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { View, Text, Image, TouchableOpacity, SafeAreaView, Alert } from 'react-native'
import * as Facebook from 'expo-facebook'
import UserService from '../services/UserService';
function UnauthorizedView(props) {
    async function logIn() {
        try {
            await Facebook.initializeAsync({
                appId: '1639974406382608',
            });
            const { type, token, expirationDate, permissions, declinedPermissions } =
                await Facebook.logInWithReadPermissionsAsync({
                    permissions: ['public_profile'],
                });
            if (type === 'success') {
                const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
                let res = await response.json()
                UserService.isSignedUp(res.id)
                    .then(data => {
                        if (data) {
                            Alert.alert(`Hi ${res.name}!`, `Welcome back to Oregano!`);

                        }

                        else {

                        }
                    })

            } else {
            }
        } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
        }
    }
    return (
        <SafeAreaView style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: "#c2ec7c"
        }}>
            <View style={{
                padding: 10,
                backgroundColor: "#ADE550",
                borderRadius: 10,
                alignItems: "center"
            }}>
                <Text style={{
                    fontSize: 40,
                    fontFamily: "sans-serif-thin",
                    margin: 20
                }}>Oregano🍽️</Text>

                <Text style={{
                    fontWeight: "400"
                }}>Please sign up to continue</Text>

                <View>
                    <TouchableOpacity onPress={() => {
                        logIn()
                    }} style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        backgroundColor: "#C6E718",
                        padding: 20,
                        margin: 15
                    }}>
                        <FontAwesome name="facebook-square" size={24} color="blue" />
                        <Text style={{
                            marginLeft: 5
                        }}>Sign up with Facebook</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default UnauthorizedView;