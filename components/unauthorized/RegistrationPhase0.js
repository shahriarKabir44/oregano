import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { View, Text, Image, TouchableOpacity, SafeAreaView, Alert, Modal, StyleSheet } from 'react-native'
import * as Facebook from 'expo-facebook'
import UserService from '../../services/UserService';
import { RootContext } from '../contexts/GlobalContext';
import LocalStorageService from '../../services/LocalStorageService';
import Environment from '../../Environment';
function RegistrationPhase0({ setAuthorization, setRegistrationStep }) {
    const { setCurrentUser, setLoginStatus } = React.useContext(RootContext)
    const [modalVisible, setModalVisible] = React.useState(false)
    const [accountExists, setExistense] = React.useState(false)
    // async function logIn() {

    //     try {

    //         await Facebook.initializeAsync({
    //             appId: Environment.facebookToken,
    //         });
    //         const { type, token, expirationDate, permissions, declinedPermissions } =
    //             await Facebook.logInWithReadPermissionsAsync({
    //                 permissions: ['public_profile'],
    //             });
    //         if (type === 'success') {
    //             // Get the user's name using Facebook's Graph API
    //             const response = await fetch(`https://graph.facebook.com/v15.0/me?fields=id%2Cname%2Cpicture&access_token=${token}`);
    //             Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
    //         } else {
    //             // type === 'cancel'
    //         }
    //     } catch ({ message }) {
    //         console.log(`Facebook Login Error: ${message}`);
    //     }
    // }
    async function logIn() {
        try {
            await Facebook.initializeAsync({
                appId: Environment.facebookToken,
            });
            const { type, token, expirationDate, permissions, declinedPermissions } =
                await Facebook.logInWithReadPermissionsAsync({
                    permissions: ['public_profile', 'email'],
                });
            if (type === 'success') {
                const res = await fetch(`https://graph.facebook.com/v15.0/me?fields=id%2Cname%2Cpicture&access_token=${token}`)
                    .then(resp => resp.json())
                console.log(res)
                res.profilePicture = res.picture.data.url
                LocalStorageService.store('tempUser', res)
                UserService.isSignedUp(res.id)
                    .then(data => {
                        console.log(data)
                        setModalVisible(true)
                        if (data) {
                            data.facebookToken = JSON.parse(data.facebookToken)
                            data.id = (data._id)
                            LocalStorageService.store('currentUser', (data))
                            setCurrentUser(data)
                            setExistense(true)
                        }

                        else {
                            setCurrentUser(null)
                            setExistense(false)
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
            <Modal
                animationType="slide"
                transparent={1 == 1}
                visible={modalVisible}

            >
                {accountExists && <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Account already exists</Text>
                        <TouchableOpacity style={{
                            backgroundColor: "#D2F9D4",
                            padding: 10,
                            margin: 10
                        }} onPress={() => {
                            setLoginStatus(true)
                            setAuthorization(true)
                        }}>
                            <Text>Go to home</Text>
                        </TouchableOpacity>
                    </View>
                </View>}
                {!accountExists && <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Welcome!</Text>
                        <Text>Please click "next" to continue.</Text>
                        <TouchableOpacity style={{
                            backgroundColor: "#D2F9D4",
                            padding: 10,
                            margin: 10
                        }} onPress={() => {
                            setModalVisible(false);
                            setRegistrationStep(1)
                        }}>
                            <Text>Next</Text>
                        </TouchableOpacity>
                    </View>
                </View>}
            </Modal>
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

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
})

export default RegistrationPhase0;