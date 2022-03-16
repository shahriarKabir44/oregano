import React, { useEffect, useState } from 'react';
import PostCardRoot from './shared/PostCardRoot';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TagsSelectionService from '../services/TagsSelectionService';
import Globals from './Globals';

import { RootContext } from './contexts/GlobalContext'
import PostService from '../services/PostService';
import UserService from '../services/UserService';



function Home(props) {
    const rootContext = React.useContext(RootContext)

    const [postList, setPostList] = useState([])
    const [subscribedPosts, setSubscribedPosts] = useState([])
    useEffect(() => {
        PostService.getPosts()
            .then((data) => {


                for (let post of data.data.getPosts) {
                    post.owner.facebookToken = JSON.parse(post.owner.facebookToken)
                    post.tags = JSON.parse(post.tags)
                    post.images = JSON.parse(post.images)
                }
                setPostList(data.data.getPosts)
            })
        UserService.getFolloweesPosts(rootContext.contextObject.currentUser.id)
            .then(data => {
                setSubscribedPosts(data)
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
                    <PostCardRoot {...props} postList={subscribedPosts} />
                    <Text
                        style={{
                            fontSize: 20,
                            marginVertical: 5,
                            paddingLeft: 5
                        }}
                    >From your recent searches</Text>
                    <PostCardRoot {...props} postList={postList} />
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