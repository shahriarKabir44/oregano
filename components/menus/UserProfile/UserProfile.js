import React, { useEffect, useState } from 'react';
import { View, Text, Image, Dimensions, ScrollView, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import RatingServices from '../../../services/RatingServices'
import { RootContext } from '../../contexts/GlobalContext';
import { Entypo } from '@expo/vector-icons';
import PostCardRootProfile from './PostCardRootProfile';
import UserService from '../../../services/UserService';
import { useIsFocused } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { BottomSheet } from 'react-native-btr';
import LocalStorageService from '../../../services/LocalStorageService';


function UserProfile(props) {
    const [tempCoverPhoto, setTempCoverPhoto] = React.useState(null)
    async function handleUpload() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
            base64: true
        })
        if (result) {
            if (!result.cancelled) {
                let imageUriSplit = result.uri.split(".")
                let newImage = {
                    body: result.uri,

                    base64: `data:image/${imageUriSplit[imageUriSplit.length - 1]};base64,${result.base64}`,
                    type: imageUriSplit[imageUriSplit.length - 1],
                }
                setTempCoverPhoto(newImage)
                setImageUploadBottomSheetVisibility(true)

            }
        }
    }


    const [isCurrentUser, setCurrentUserFlag] = useState(false)
    const [isFollowing, setConnection] = React.useState(true)
    const rootContext = React.useContext(RootContext)
    const [UserProfileInfo, setUserInfo] = useState({
        "facebookToken": {
            "name": "",
            "profileImageURL": "https://www.camc.org/sites/default/files/styles/800x600/public/2020-09/employee%20wellness%20center_hero.jpg?itok=9qCcPtUE",
            coverPhotoURL: "https://www.camc.org/sites/default/files/styles/800x600/public/2020-09/employee%20wellness%20center_hero.jpg?itok=9qCcPtUE",
            email: "",
            phone: "",
            address: ""
        },
        "id": "",
        followers: 0,
        rating: 0,
        totalItemsDelivered: 0,

    })
    const [imageUploadBottomSheet, setImageUploadBottomSheetVisibility] = React.useState(false)
    const isFocused = useIsFocused()
    const [userPosts, setPostList] = useState([])
    const [isLoaded, setLoadedStatus] = useState(false)
    const [tagRatingList, setTagRatingList] = React.useState([])
    function getUserTagRatings(userId) {
        RatingServices.getTagRatings(userId)
            .then(data => {
                setTagRatingList(data)
            })
    }
    useEffect(() => {
        if (isFocused) {
            if (!props.route?.params?.id) {
                setCurrentUserFlag(true)
                setUserInfo(rootContext.contextObject.currentUser)
                rootContext.setHeaderString('Your profile')
                UserService.getPosts(rootContext.contextObject.currentUser.id)
                    .then(posts => {
                        setPostList(posts)

                    })
                    .then(() => {
                        setLoadedStatus(true)
                    })
                getUserTagRatings(rootContext.contextObject.currentUser.id)
            }
            else if (rootContext.contextObject.currentUser.id != props.route?.params?.id) {
                setCurrentUserFlag(false)
                getUserTagRatings(props.route?.params?.id)
                UserService.isFollowing(rootContext.contextObject.currentUser.id, props.route?.params?.id)
                    .then((data) => {
                        setConnection(data)
                    })
                UserService.findUser(props.route?.params?.id)
                    .then(data => {
                        setUserInfo(data)
                        rootContext.setHeaderString(data.facebookToken.name)

                        UserService.getPosts(props.route?.params?.id)
                            .then(posts => {

                                setPostList(posts)

                            })
                            .then(() => {
                                setLoadedStatus(true)
                            })
                    })
            }
            else if (rootContext.contextObject.currentUser.id == props.route?.params?.id) {
                getUserTagRatings(props.route?.params?.id)

                setCurrentUserFlag(true)
                setUserInfo(rootContext.contextObject.currentUser)
                rootContext.setHeaderString('Your profile')
                UserService.getPosts(rootContext.contextObject.currentUser.id)
                    .then(posts => {
                        setPostList(posts)

                    })
                    .then(() => {
                        setLoadedStatus(true)
                    })
            }
        }


    }, [isFocused])
    function follow() {

        UserService.follow(props.route?.params?.id, rootContext.contextObject.currentUser.id, rootContext.contextObject.currentUser.facebookToken.name, UserProfileInfo.expoPushToken)
            .then(() => {
                setConnection(true)
            })
    }
    function unFollow() {

        UserService.unFollow(props.route?.params?.id, rootContext.contextObject.currentUser.id)
            .then(() => {
                setConnection(false)
            })
    }


    return (
        <View style={{
            flex: 1
        }}>
            <CoverPhotoBottomSheet onUploadComplete={(imageURL) => {
                let newFacebookToken = {
                    ...UserProfileInfo.facebookToken,
                    coverPhotoURL: imageURL
                }
                setUserInfo({ ...UserProfileInfo, facebookToken: newFacebookToken })
            }} tempImage={tempCoverPhoto} popupBottomSheet={setImageUploadBottomSheetVisibility} bottomSheetVisibility={imageUploadBottomSheet} />
            {isLoaded && <View>
                <ScrollView>
                    <View>
                        <View style={{
                            height: Dimensions.get('window').width * 9 / 16 + Dimensions.get('window').width * .2
                        }} >
                            <Image style={{
                                width: '100%',
                                aspectRatio: 16 / 9
                            }} source={{
                                uri: UserProfileInfo.facebookToken.coverPhotoURL
                            }} />
                            {isCurrentUser && <Entypo name="camera" onPress={() => {
                                handleUpload()
                            }} size={24} color="black" />}
                            <Image style={{
                                width: '40%',
                                aspectRatio: 1,
                                borderRadius: 100,
                                position: "absolute",
                                top: Dimensions.get('window').width * 9 / 16 - Dimensions.get('window').width * .2,
                                alignSelf: "center"
                            }} source={{
                                uri: UserProfileInfo.facebookToken.profileImageURL
                            }} />
                        </View>
                        <View style={{
                            alignItems: "center",

                        }}>
                            <Text style={{

                                fontSize: 30
                            }}> {UserProfileInfo.facebookToken.name}</Text>
                            <Text>
                                {UserProfileInfo.facebookToken.email}
                            </Text>
                            <Text>
                                {UserProfileInfo.facebookToken.phone}
                            </Text>
                            <Text>
                                {UserProfileInfo.facebookToken.address}
                            </Text>
                            {!isCurrentUser && !isFollowing && <TouchableOpacity style={{
                                padding: 5,
                                backgroundColor: "#c4c4c4",
                                borderRadius: 5
                            }} onPress={() => {
                                follow()
                            }}>
                                <Text>Follow</Text>
                            </TouchableOpacity>}

                            {!isCurrentUser && isFollowing && <TouchableOpacity style={{
                                padding: 5,
                                backgroundColor: "#c4c4c4",
                                borderRadius: 5
                            }} onPress={() => {
                                unFollow()
                            }}>
                                <Text>Unfollow</Text>
                            </TouchableOpacity>}
                        </View>
                    </View>

                    <View style={{
                        padding: 10
                    }}>
                        <Text style={{
                            fontSize: 20
                        }}> {isCurrentUser ? 'Your' : `${UserProfileInfo.facebookToken.name}'s`} stars </Text>
                        <View style={{
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap",
                            justifyContent: "space-around"
                        }}>
                            {tagRatingList.map((entry, index) => {
                                return <TouchableOpacity onPress={() => {
                                    props.stackNav.push('searchResult', {
                                        tag: entry.tagName
                                    })
                                }} key={index} style={[styles.horizontalAlign, {
                                    margin: 5,
                                    padding: 10,
                                    borderRadius: 10,
                                    borderWidth: 1,
                                    borderColor: "black",
                                    width: '45%'
                                }]}>
                                    <Text>{entry.tagName}</Text>
                                    <Text>{Math.floor(entry.avg_rating * 100) / 100}⭐</Text>
                                </TouchableOpacity >
                            })}
                        </View>

                    </View>
                    <Text style={{
                        fontSize: 20,
                        padding: 10
                    }}> {isCurrentUser ? 'Your' : `${UserProfileInfo.facebookToken.name}'s`} Posts </Text>
                    <View style={{
                        padding: 10
                    }}>
                        <PostCardRootProfile {...props} postList={userPosts} />
                    </View>
                </ScrollView>
            </View>}
        </View>
    );
}



function CoverPhotoBottomSheet({ bottomSheetVisibility, popupBottomSheet, tempImage, onUploadComplete }) {
    const { contextObject, setCurrentUser } = React.useContext(RootContext)
    return (<View>
        <BottomSheet visible={bottomSheetVisibility}
            onBackButtonPress={() => {

            }}
            onBackdropPress={() => {

            }}
        >
            <View style={styles.bottomNavigationView}>
                {tempImage && <View style={[{
                    flex: 1
                }]}>
                    <ScrollView>
                        <Image style={{
                            width: '100%',
                            aspectRatio: 4 / 3,
                            borderWidth: 1,
                            borderColor: "black"
                        }} source={{ uri: tempImage.body }} />
                    </ScrollView>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                        <TouchableOpacity onPress={() => {
                            UserService.updateCoverPhoto(contextObject.currentUser.id, contextObject.currentUser.facebookToken, tempImage)
                                .then(data => {
                                    const newUser = {
                                        ...contextObject.currentUser,
                                        facebookToken: data
                                    }

                                    LocalStorageService.store('currentUser', newUser)
                                        .then(() => {
                                            setCurrentUser(newUser)
                                            popupBottomSheet(false)
                                            onUploadComplete(newUser.facebookToken.coverPhotoURL)
                                            ToastAndroid.showWithGravity(
                                                "Image uploaded succesfully!",
                                                ToastAndroid.SHORT,
                                                ToastAndroid.BOTTOM
                                            )
                                        })

                                })
                        }} style={{
                            padding: 10,
                            backgroundColor: "#c4c4c4",
                            borderRadius: 5
                        }}>
                            <Text>Set as cover photo</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            popupBottomSheet(false)
                        }} style={{
                            padding: 10,
                            backgroundColor: "#c4c4c4",
                            borderRadius: 5
                        }}>
                            <Text>Discard</Text>
                        </TouchableOpacity>
                    </View>
                </View>}
            </View>
        </BottomSheet>
    </View>)
}


const styles = StyleSheet.create({
    horizontalAlign: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    bottomNavigationView: {
        backgroundColor: '#fff',
        width: '100%',
        height: Dimensions.get('window').height * 0.5,
        borderRadius: 10,
        padding: 10,

    }
})
export default UserProfile;