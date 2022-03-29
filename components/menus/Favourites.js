import { useIsFocused } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';


import UserService from '../../services/UserService';
import { RootContext } from '../contexts/GlobalContext'
import Tags from '../shared/Tags';
function Favourites(props) {
    const rootContext = React.useContext(RootContext)
    const [followingList, setFollowingList] = useState([])
    const isFocused = useIsFocused()
    useEffect(() => {
        if (isFocused) {
            rootContext.updateContext({ ...rootContext.contextObject, headerString: "Connections" })
            UserService.findFollowingList(rootContext.contextObject.currentUser.id)
                .then(data => {
                    setFollowingList(data)
                })
        }

    }, [isFocused])

    return (
        <View style={{
            flex: 1,

        }}>
            <Text style={{
                textAlign: "center",
                fontSize: 20,

            }}>People you follow</Text>
            <View>
                <ScrollView>
                    <View style={{
                        padding: 5
                    }} >
                        {followingList.map((entry, index) => {
                            return <FollowingListItem {...props} followee={entry.followee} key={index} />
                        })}
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}


function FollowingListItem({ followee }) {

    function limitText(text) {
        let res = ""
        for (let n = 0; n < Math.min(12, text.length); n++) {
            res += text[n]
        }
        if (text.length > 12) res += "..."
        return res
    }
    return (
        <TouchableOpacity style={{
            backgroundColor: "white",
            padding: 15,
            margin: 5,
            borderRadius: 5,

            // width: "45%"
        }}>
            <View style={[styles.horizontalAlign, {

                marginVertical: .5
            }]}>
                <Image style={{
                    width: 50,
                    aspectRatio: 1,
                    borderRadius: 50
                }} source={{
                    uri: followee.facebookToken.profileImageURL
                }} />
                <Text style={{
                    fontWeight: 'bold',
                    marginLeft: 20,
                    fontSize: 18
                }}> {(followee.facebookToken.name)} </Text>
            </View>
            <View style={{
                marginVertical: 5
            }}>


            </View>
            <View >
                <Text style={{
                    marginVertical: 5
                }}>Recently posted:</Text>
                {followee.lastPost && <View style={[styles.horizontalAlign, , {
                    justifyContent: "space-between",
                }]}>
                    <View style={[styles.horizontalAlign]}>
                        <Image style={{
                            height: 30,
                            aspectRatio: 1,
                            borderRadius: 50
                        }} source={{
                            uri: followee.lastPost.images[0]
                        }} />
                        <Text style={{ fontSize: 15, marginLeft: 10 }}> {(followee.lastPost.itemName)} </Text>
                    </View>
                    <Text style={{

                        marginVertical: 5
                    }}> {Math.floor(Math.random() * 3) + 1} hour(s) ago </Text>
                </View>}
                {!followee.lastPost && <Text>No last post</Text>}
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    horizontalAlign: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center"
    }
})
export default Favourites;