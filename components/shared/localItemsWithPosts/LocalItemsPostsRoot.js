import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native'

function LocalItemsPostsRoot(props) {


    return (
        <View>
            {props.data.map((data, index) => {
                return <ItemPostRoot {...props} data={data} key={index} />
            })}
        </View>
    );
}



function ItemPostRoot(props) {
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
            top: -15,
            left: 5,
            zIndex: 100,
            backgroundColor: "#f2f2f2"
        }}>
            <Text style={{
                fontSize: 25
            }}>{props.data.itemName}</Text>
        </View>

        <FlatList
            horizontal={true}
            data={props.data.info}
            keyExtractor={(data, index) => index}
            renderItem={(data) => {
                return <VendorsListRoot {...props} data={data.item} />

            }}
        />
    </View>
}


function VendorsListRoot(props) {
    let relatedPosts = props.data.posts
    return <View style={{
        backgroundColor: "#E8FAFD",
        margin: 5,
        padding: 5,
        borderRadius: 5
    }}>
        <View style={{
            display: "flex",
            flexDirection: "row",

            alignContent: "center",
            alignItems: "center",

        }}>
            <Image source={{
                uri: props.data.vendor.personalInfo.profileImageURL
            }} style={{
                width: 50,
                aspectRatio: 1,
                borderRadius: 50,
                marginHorizontal: 10
            }} />
            <View>
                <Text>From {props.data.vendor.personalInfo.name}   </Text>
                <Text>Tk: {props.data.unitPrice}</Text>
            </View>
        </View>
        <View style={{
            display: "flex",
            flexDirection: "row"
        }}>
            {relatedPosts.map((item, index) => {
                return <RelatedPostsCard key={index} {...props} data={item} />
            })}
        </View>

    </View>
}

function RelatedPostsCard(props) {
    return <TouchableOpacity style={{
        margin: 5,
        padding: 10,
        backgroundColor: "#C1F2FB",
        borderRadius: 5
    }} onPress={() => {
        props.stackNav.push('Post details', {
            postId: props.data.id,

        })
    }} >
        <Image source={{
            uri: JSON.parse(props.data.images)[[0]]
        }} style={{
            width: 150,
            aspectRatio: 16 / 9
        }} />
        <Text style={{
            fontSize: 10
        }}> {(new Date(props.data.postedOn).toLocaleTimeString())}, {(new Date(props.data.postedOn).toLocaleDateString())} </Text>
    </TouchableOpacity>
}

export default LocalItemsPostsRoot;