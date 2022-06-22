import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, Image, Button, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native';
import ResultBottomSheet from '../../routed/search/ResultBottomSheet';
export default function PostCardRootProfile(props) {

    return (
        <View>
            {props.postList.map((item, index) => {
                return <PostGroup key={index} {...props} group={item} />
            })}

        </View>
    );
}

function PostGroup(props) {
    return <View style={{
        borderWidth: 1,
        borderColor: "black",
        marginVertical: 15,
        padding: 15,
        position: "relative",
        marginHorizontal: 10,
        borderRadius: 5

    }}>
        <View style={{
            position: "absolute",
            top: -20,
            left: 5,
            zIndex: 100,
            backgroundColor: "#f2f2f2"
        }}>
            <Text style={{
                fontSize: 25
            }}>{props.group.groupName}</Text>
        </View>
        <View style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",

            alignItems: "center"
        }}>
            <View>
                {props.group.isAvailable && <Text>Tk. {props.group.unitPrice} </Text>}
                <Text>{props.group.isAvailable ? "Available today" : "Unavailable for now"}</Text>
                <Text>{props.group.rating == 0 ? "Unrated" : `${props.group.rating}⭐`} </Text>
            </View>
            <View  >
                {!props.isCurrentUser && <TouchableOpacity style={{
                    backgroundColor: "#88FC9A",
                    padding: 10,
                    borderRadius: 4
                }}>
                    <Text>ADD TO CART</Text>
                </TouchableOpacity>}
            </View>
        </View>
        <View>
            <FlatList
                horizontal={true}
                data={props.group.posts}
                keyExtractor={(data, index) => index}
                renderItem={(data) => {
                    return <RelatedPostsCard {...props} data={data.item} />

                }}
            />
        </View>
    </View>
}




function RelatedPostsCard(props) {
    return <View style={{
        margin: 5,
        padding: 10,
        backgroundColor: "#C1F2FB",
        borderRadius: 5
    }}>
        <Image source={{
            uri: (props.data.images)[[0]]
        }} style={{
            width: 150,
            aspectRatio: 16 / 9
        }} />
        <Text style={{
            fontSize: 15
        }}> {(new Date(props.data.postedOn).toLocaleTimeString())}, {(new Date(props.data.postedOn).toLocaleDateString())} </Text>
        <Button onPress={() => {
            props.stackNav.push('Post details', {
                postId: props.data.id,

            })
        }} title="View details" />
    </View>
}