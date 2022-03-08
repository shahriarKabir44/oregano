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
                fontSize: 20
            }}>People you follow</Text>
            <View>
                <ScrollView>
                    <View style={[styles.horizontalAlign, {
                        padding: 5,
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "space-evenly"
                    }]}>
                        {followingList.map((user, index) => {
                            return <FollowingListItem {...props} user={user} key={index} />
                        })}
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}


function FollowingListItem(props) {
    const [lastPost, setLastPost] = useState({
        "itemName": "",
        "images": [
            "https://images-gmi-pmc.edge-generalmills.com/99d8ae9a-737f-491c-a7f7-34b014e5682c.jpg",
        ],
        "ownerId": "6213a30y8220b000e00185",
        "id": "64162873f6ff9efc53efd8",
        "amountProduced": 1,
        "unitPrice": 100,
        "tags": ["cake", "pastry"],
        "unitType": "Units"
    })
    useEffect(() => {
        UserService.getLastPost(props.user.id)
            .then(post => {
                setLastPost(post)
            })
    }, [])
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
            padding: 10,
            margin: 5,
            borderRadius: 5,
            width: "45%"
        }}>
            <View style={[styles.horizontalAlign, {
                justifyContent: "space-between",
                marginVertical: 5
            }]}>
                <Image style={{
                    width: 50,
                    aspectRatio: 1,
                    borderRadius: 50
                }} source={{
                    uri: props.user.facebookToken.profileImageURL
                }} />
                <Text> {limitText(props.user.facebookToken.name)} </Text>
            </View>
            <View style={{
                marginVertical: 5
            }}>
                <Text>Frequent tags</Text>
                <View style={[styles.horizontalAlign, {
                    flexWrap: "wrap",
                    justifyContent: "space-evenly"
                }]}>
                    <Tags name={"chicken"} />
                    <Tags name={"spicy"} />
                    <Tags name={"spicy"} />
                </View>

            </View>
            <View style={{
                marginVertical: 5
            }}>
                <Text>Recently posted:</Text>
                <View style={[styles.horizontalAlign, {
                    justifyContent: "space-between"
                }]}>
                    <Image style={{
                        height: 30,
                        aspectRatio: 1,
                        borderRadius: 50
                    }} source={{
                        uri: lastPost.images[0]
                    }} />
                    <Text> {limitText(lastPost.itemName)} </Text>
                </View>
                <Text style={{
                    textAlign: "center",
                    marginVertical: 5
                }}> 2 hours ago </Text>
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