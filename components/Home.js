import React, { useEffect, useState, useRef, useContext } from 'react';
import PostCardRoot from './shared/PostCardRoot';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';



import { RootContext } from './contexts/GlobalContext'
import PostService from '../services/PostService';
import UserService from '../services/UserService';
import AvailableTags from './shared/AvailableTags';
import PostCard from './shared/PostCard';


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




        rootContext.updateCurrentLocationInfo()
        UserService.getFolloweesPosts(rootContext.contextObject.currentUser.id)
            .then(data => {
                setSubscribedPosts(data)
                setIsLoaded(true)
            })

        PostService.findLocalPosts()
            .then(data => {
                setIsLocalPostsLoaded(1 == 1)
                setlocalPostList(data)
            })

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, [])
    return (
        <SafeAreaView style={{
            flex: 1
        }}>
            <ScrollView style={{

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
                    rootContext.updateContext({ ...rootContext.contextObject, headerString: 'Create a post!' })
                    props.stackNav.push("Create post")
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
        });
    }

    return token;
}

export default Home;