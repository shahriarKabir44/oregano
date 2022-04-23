import React, { useEffect, useState, useRef, useContext } from 'react';
import PostCardRoot from './shared/PostCardRoot';
import { SafeAreaView, ScrollView, RefreshControl, Text, View, StyleSheet, LogBox, TouchableOpacity } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { AntDesign } from '@expo/vector-icons';
import { RootContext } from './contexts/GlobalContext'
import PostService from '../services/PostService';
import UserService from '../services/UserService';
import AvailableTags from './shared/AvailableTags';
import PostCard from './shared/PostCard';
import ActionButton from 'react-native-action-button';
import LocalUsersRoot from './shared/LocalUsers/LocalUsersRoot';
import SearchBottomSheet from './shared/SearchBottomSheet';
import CreatePostBottomSheet from './shared/CreatePostBottomSheet';
import Icon from 'react-native-vector-icons/Ionicons';
import MarkAvailableItemsBottomSheet from './shared/MarkAvailableItemsBottomSheet';
import Global from '../services/Globals';
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

    const [showAvailableItemsBottomSheet, toggleAvailableItemsBottomSheet] = useState(false)

    const rootContext = React.useContext(RootContext)

    const [localPostList, setlocalPostList] = useState([])
    let initialPost = {
        itemName: "Loading..",
        id: -1,
        images: ["https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/articles/2016/02/plate-1508865660.jpg?crop=1xw:0.75xh;center,top&resize=480"],
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
    const [isLocationLoaded, setLocationLoadedStatus] = React.useState(false)
    const [localItems, setLocalItems] = React.useState([])
    async function loadLocalItems(userId, region) {
        let { data } = await fetch(Global.searchServerURL + `/getLocalAvailableItems/${userId}/${region}`)
            .then(response => response.json())
        setLocalItems(data)
    }
    async function loadLocalDatas(location) {
        return Promise.all([
            UserService.getLocalUsers(location.region, rootContext.getCurrentuser().id)
                .then(data => {

                    setLocalUsers(data);
                }),
            PostService.findLocalPosts(location.city)
                .then(data => {
                    console.log(data);
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
                        loadLocalItems(rootContext.getCurrentuser().id, data.city)


                        loadLocalDatas(data)
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
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
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
            <MarkAvailableItemsBottomSheet  {...props} bottomSheetVisibility={showAvailableItemsBottomSheet} popupBottomSheet={toggleAvailableItemsBottomSheet} />
            <CreatePostBottomSheet {...props} bottomSheetVisibility={createPostBottomSheetVisibility} popupBottomSheet={popupCreatePostBottomSheet} />
            <SearchBottomSheet {...props} popupBottomSheet={setBottomsheetVisible} bottomSheetVisibility={searchBottomSheet} />
            <ScrollView
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                style={{

                }}>
                <View style={{
                    overflow: "visible"
                }}>



                    <Text
                        style={{
                            fontSize: 20,
                            marginVertical: 5,
                            paddingLeft: 5
                        }}
                    >Available Items in your area</Text>
                    <AvailableTags localItems={localItems} {...props} />
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
                </View>
            </ScrollView>

            <ActionButton buttonColor="rgba(231,76,60,1)">

                <ActionButton.Item
                    buttonColor="#9b59b6"
                    title="Post what you've cooked"
                    onPress={() => {
                        popupCreatePostBottomSheet(1 == 1)
                    }}>
                    <Icon
                        name="md-camera"
                        style={styles.actionButtonIcon}
                    />
                </ActionButton.Item>
                <ActionButton.Item
                    buttonColor="#3498db"
                    title="Mark Today's available items"
                    onPress={() => toggleAvailableItemsBottomSheet(2 == 2)}>
                    <Icon
                        name="md-star"
                        style={styles.actionButtonIcon}
                    />
                </ActionButton.Item>

            </ActionButton>



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


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
    },
    titleStyle: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 10,
    },
    textStyle: {
        fontSize: 16,
        textAlign: 'center',
        padding: 10,
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
})

export default Home;