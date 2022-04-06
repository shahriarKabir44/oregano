import React, { useEffect, useState } from 'react';
import { View, Text, Image, Dimensions, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import RatingServices from '../../../services/RatingServices'
import { RootContext } from '../../contexts/GlobalContext';

import PostCardRootProfile from './PostCardRootProfile';
import UserService from '../../../services/UserService';
import { useIsFocused } from '@react-navigation/native';
function UserProfile(props) {
    const [isCurrentUser, setCurrentUserFlag] = useState(false)
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
    const isFocused = useIsFocused()
    const [userPosts, setPostList] = useState([])
    const [isLoaded, setLoadedStatus] = useState(false)
    const [tagRatingList, setTagRatingList] = React.useState([])
    function getUserTagRatings(userId) {
        RatingServices.getTagRatings(rootContext.contextObject.currentUser.id)
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

    return (
        <View style={{
            flex: 1
        }}>
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
                            {!isCurrentUser && <TouchableOpacity style={{
                                padding: 5,
                                backgroundColor: "#c4c4c4",
                                borderRadius: 5
                            }}>
                                <Text>Follow</Text>
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
const styles = StyleSheet.create({
    horizontalAlign: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between"
    }
})
export default UserProfile;