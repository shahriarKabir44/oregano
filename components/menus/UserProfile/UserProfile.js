import React, { useEffect, useState } from 'react';
import { View, Text, Image, Dimensions, ScrollView, StyleSheet, RefreshControl, TouchableOpacity, ToastAndroid } from 'react-native';
import { RootContext } from '../../contexts/GlobalContext';
import { Entypo } from '@expo/vector-icons';
import PostCardRootProfile from './PostCardRootProfile';
import UserService from '../../../services/UserService';
import { useIsFocused } from '@react-navigation/native';
import { BottomSheet } from 'react-native-btr';
import { Ionicons } from '@expo/vector-icons';
import CreatePostBottomSheet from '../../shared/CreatePostBottomSheet';
import UploadManager from '../../../services/UploadManager';
import { FontAwesome } from '@expo/vector-icons';
import CreateActivity from './CreateActivity';
function UserProfile(props) {
    const [tempCoverPhoto, setTempCoverPhoto] = React.useState(null)
    async function handleUpload() {
        let tempCoverPhotoURI = await UploadManager.uploadImageFromDevice()
        setTempCoverPhoto(tempCoverPhotoURI)
        setImageUploadBottomSheetVisibility(true)
    }


    const [isCurrentUser, setCurrentUserFlag] = useState(false)
    const [isCollapsed, setCollapseStatus] = React.useState(false)
    const rootContext = React.useContext(RootContext)
    const [UserProfileInfo, setUserInfo] = useState({
        "facebookToken": {
            "name": "",
            "profileImageURL": "rgreg",
            coverPhotoURL: "eerger",
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
    const [createPostBottomSheetVisibility, popupCreatePostBottomSheet] = React.useState(false)
    const [refreshing, setRefreshing] = React.useState(false);
    const [currentUserId, setCurrentUserId] = React.useState("")
    async function loadData() {
        setRefreshing(true)
        let userId = ""
        if ((!props.route?.params?.id) || rootContext.getCurrentUser().id == props.route?.params?.id) {
            setCurrentUserFlag(true)
            rootContext.setHeaderString('Your profile')
            setCurrentUserId(rootContext.getCurrentUser().id)
            userId = rootContext.getCurrentUser().id

        }
        else if (rootContext.getCurrentUser().id != props.route?.params?.id) {
            setCurrentUserFlag(false)
            rootContext.setHeaderString(data.facebookToken.name)
            setCurrentUserId(props.route?.params?.id)
            userId = props.route?.params?.id
        }
        await Promise.all([
            loadPosts(userId),
            loadPersonalInfo(userId)
        ])


    }
    async function loadPersonalInfo(userId) {
        UserService.findUser(userId)
            .then(data => {
                // console.log(data)
                setUserInfo(data)
            })
    }
    async function loadPosts(userId) {
        UserService.getPosts(userId)
            .then(data => {
                setPostList(data)
            })
    }
    useEffect(() => {
        if (isFocused) {
            loadData().then(() => {
                setRefreshing(1 == 0)
                setLoadedStatus(true)
            })
        }
    }, [isFocused])


    const onRefresh = React.useCallback(() => {
        loadData()
            .then(() => {
                setRefreshing(1 == 0)
                setLoadedStatus(true)

            })
    }, []);
    return (
        <View style={{
            flex: 1
        }}>
            <CreatePostBottomSheet onComplete={() => {
                loadPosts(currentUserId)
            }}  {...props} bottomSheetVisibility={createPostBottomSheetVisibility} popupBottomSheet={popupCreatePostBottomSheet} />
            <CoverPhotoBottomSheet onUploadComplete={(imageURL) => {
                let newFacebookToken = {
                    ...UserProfileInfo.facebookToken,
                    coverPhotoURL: imageURL
                }

                rootContext.setCurrentUser({ ...rootContext.getCurrentUser(), facebookToken: newFacebookToken })
                    .then((data) => {
                        loadPersonalInfo(currentUserId)
                    })
            }} tempImage={tempCoverPhoto} popupBottomSheet={setImageUploadBottomSheetVisibility} bottomSheetVisibility={imageUploadBottomSheet} />
            {isLoaded && <View>
                <ScrollView
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}

                >
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

                            <View style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",

                            }}>
                                <Entypo name="phone" size={24} color="black" />
                                <Text>
                                    {UserProfileInfo.phone}
                                </Text>
                            </View>
                            <View style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center"
                            }}>
                                <FontAwesome name="home" size={24} color="black" />
                                <Text>
                                    {UserProfileInfo.locationInfoJson?.district} {UserProfileInfo.locationInfoJson?.city} {UserProfileInfo.locationInfoJson?.subregion} {UserProfileInfo.locationInfoJson?.region}
                                </Text>
                            </View>


                        </View>
                    </View>


                    <View style={[styles.horizontalAlign, {
                        justifyContent: "flex-start",
                        alignItems: "center",
                        alignContent: "center",
                    }]}>
                        <Text style={{
                            fontSize: 20,
                            padding: 10
                        }}> {isCurrentUser ? 'Your' : `${UserProfileInfo.facebookToken.name}'s`} Posts and activities </Text>
                        {isCurrentUser && <Ionicons onPress={() => {
                            popupCreatePostBottomSheet(1 == 1)
                        }} name="add-circle-outline" size={24} color="black" />}
                    </View>
                    <View style={{
                        padding: 10
                    }}>
                        <PostCardRootProfile isCurrentUser={isCurrentUser} {...props} postList={userPosts} />
                    </View>
                </ScrollView>
            </View>}
        </View>
    );
}



function CoverPhotoBottomSheet({ bottomSheetVisibility, popupBottomSheet, tempImage, onUploadComplete }) {
    const { getCurrentUser, setCurrentUser } = React.useContext(RootContext)
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
                        }} source={{ uri: tempImage }} />
                    </ScrollView>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                        <TouchableOpacity onPress={() => {

                            UploadManager.manageFileUpload(tempImage, `${getCurrentUser().id}`, "coverPhotos", (url) => {

                                let newFacebookToken = {
                                    ...getCurrentUser().facebookToken,
                                    coverPhotoURL: url
                                }
                                UserService.updateUserInfo(getCurrentUser().id, newFacebookToken)
                                    .then(data => {
                                        const newUser = {
                                            ...getCurrentUser(),
                                            facebookToken: newFacebookToken
                                        }
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