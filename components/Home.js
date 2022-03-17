import React, { useEffect, useState } from 'react';
import PostCardRoot from './shared/PostCardRoot';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TagsSelectionService from '../services/TagsSelectionService';
import Globals from './Globals';

import { RootContext } from './contexts/GlobalContext'
import PostService from '../services/PostService';
import UserService from '../services/UserService';
import AvailableTags from './shared/AvailableTags';
import PostCard from './shared/PostCard';



function Home(props) {
    const rootContext = React.useContext(RootContext)

    const [postList, setPostList] = useState([])
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
    useEffect(() => {

        UserService.getFolloweesPosts(rootContext.contextObject.currentUser.id)
            .then(data => {
                setSubscribedPosts(data)
                setIsLoaded(true)
            })
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
                    <Text
                        style={{
                            fontSize: 30,
                            paddingLeft: 5
                        }}
                    >From People you follow</Text>
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

export default Home;