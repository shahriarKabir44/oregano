import React, { useEffect, useState, useRef, useContext } from 'react';
import PostCardRoot from './shared/PostCardRoot';
import { SafeAreaView, ScrollView, RefreshControl, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { AntDesign } from '@expo/vector-icons';
import { RootContext } from './contexts/GlobalContext'
import PostService from '../services/PostService';
import UserService from '../services/UserService';
import AvailableTags from './shared/AvailableTags';
import PostCard from './shared/PostCard';
import LocalStorageService from '../services/LocalStorageService';
import LocalUsersRoot from './shared/LocalUsers/LocalUsersRoot';
import SearchBottomSheet from './shared/SearchBottomSheet';
import CreatePostBottomSheet from './shared/CreatePostBottomSheet';


Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});


function Home(props) {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();


    const rootContext = React.useContext(RootContext)

    const [localPostList, setlocalPostList] = useState([])
    let initialPost = {
        itemName: "Loading..",
        id: -1,
        images: ["https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/articles/2016/02/plate-1508865660.jpg?crop=1xw:0.75xh;center,top&resize=480:*"],
        tags: [],
        owner: {
            facebookToken: {
                name: "Loading..."
            }
        }
    }
    const [isLoaded, setIsLoaded] = useState(false)
    const [subscribedPosts, setSubscribedPosts] = useState([])
    const [isLocalPostsLoaded, setIsLocalPostsLoaded] = useState(false)
    const [refreshing, setRefreshing] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState(null)
    const [localUsers, setLocalUsers] = React.useState([])
    async function loadLocalDatas(region) {
        return Promise.all([
            UserService.getLocalUsers(region, rootContext.getCurrentuser().id)
                .then(data => {

                    setLocalUsers(data);
                }),
            PostService.findLocalPosts()
                .then(data => {

                    setIsLocalPostsLoaded(1 == 1)
                    setlocalPostList(data)
                }),
        ])
    }

    async function loadData() {
        setRefreshing(true)

        loadPosts()
            .then(() => {
                rootContext.updateCurrentLocationInfo()
                    .then((data) => {
                        console.log(data);
                        loadLocalDatas(data.region)
                            .then(() => setRefreshing(false));
                    })

            })
    }
    async function loadPosts() {
        return Promise.all([
            UserService.getFolloweesPosts(rootContext.contextObject.currentUser.id)
                .then(data => {

                    setSubscribedPosts(data)
                    setIsLoaded(true)
                })

        ]).then(() => {

        })

    }
    const onRefresh = React.useCallback(() => {
        loadData()

    }, []);
    const [createPostBottomSheetVisibility, popupCreatePostBottomSheet] = React.useState(false)
    const [searchBottomSheet, setBottomsheetVisible] = React.useState(false)
    useEffect(() => {

        registerForPushNotificationsAsync().then(token => {
            rootContext.updatePushToken(token)
            setExpoPushToken(token)
        });
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {

            setNotification(notification);
        });
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        });


        loadData()





        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, [])
    return (
        <SafeAreaView style={{
            flex: 1
        }}>
            <CreatePostBottomSheet {...props} bottomSheetVisibility={createPostBottomSheetVisibility} popupBottomSheet={popupCreatePostBottomSheet} />
            <SearchBottomSheet {...props} popupBottomSheet={setBottomsheetVisible} bottomSheetVisibility={searchBottomSheet} />
            <ScrollView
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                style={{

                }}>
                <View style={{
                    overflow: "visible"
                }}>

                    <View>
                        {subscribedPosts.length > 0 && <Text
                            style={{
                                fontSize: 20,
                                paddingLeft: 5,
                                padding: 10
                            }}
                        >From people you follow</Text>}
                    </View>
                    {!isLoaded && <PostCard post={initialPost} />}
                    {isLoaded && <PostCardRoot {...props} postList={subscribedPosts} />}
                    <Text
                        style={{
                            fontSize: 20,
                            marginVertical: 5,
                            paddingLeft: 5
                        }}
                    >Available food items</Text>
                    <AvailableTags navigator={props.stackNav} />
                    <Text
                        style={{
                            fontSize: 20,
                            marginVertical: 5,
                            paddingLeft: 5
                        }}
                    >Posts from your area</Text>
                    {!isLocalPostsLoaded && <PostCard post={initialPost} />}
                    {isLocalPostsLoaded && <PostCardRoot {...props} postList={localPostList.filter(post => post.owner.id != rootContext.contextObject.currentUser.id)} />}

                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',

                        alignItems: 'center',
                        alignContent: "center",
                        padding: 10
                    }}>
                        <Text
                            style={{
                                fontSize: 20,
                                marginVertical: 5,
                                paddingLeft: 5
                            }}
                        >People near you</Text>
                        <AntDesign onPress={() => {
                            setBottomsheetVisible(true)
                        }} style={{
                            marginLeft: 20
                        }} name="search1" size={24} color="black" />
                    </View>
                    <LocalUsersRoot {...props} users={localUsers} />

                </View>
            </ScrollView>

            <View style={{
                position: "absolute",
                borderRadius: 50,
                height: 60,
                aspectRatio: 1,
                backgroundColor: "#02DBC6",
                bottom: 20,
                right: 20,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',

            }} >
                <TouchableOpacity onPress={() => {

                    popupCreatePostBottomSheet(true)
                }}>
                    <Text style={{
                        color: "white",
                        fontSize: 30,
                    }}
                    >+</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
}




async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
            sound: true,
        });
    }

    return token;
}

export default Home;