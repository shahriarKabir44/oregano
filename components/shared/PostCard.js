import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Tags from './Tags';

function PostCard({ post, drawerNav, stackNav }) {
    post = post.item
    return (
        <TouchableOpacity style={{

            margin: 5,
            borderWidth: 1.5,
            borderRadius: 15,
            overflow: 'hidden',

        }} onPress={() => {
            stackNav.push('Post details', {
                postId: post.id,
                headerString: `${post?.owner?.facebookToken?.name}'s post`
            })
        }}>
            <View>
                <View>
                    <Image style={styles.cardImg} source={{

                        uri: post?.images[0],
                        height: "100%"
                    }} />
                </View>
                <View style={[styles.itemName, styles.marginVertical]}>
                    <Text style={{
                        fontWeight: "bold",
                        fontSize: 20
                    }}>{post?.itemName}</Text>
                </View>
                <View style={[styles.marginVertical]}>
                    <View style={[styles.cookInfo, styles.additionalInfo, styles.marginVertical]}>
                        <View>
                            <Image style={styles.cookImg} source={{
                                height: "100%",
                                uri: post?.owner?.facebookToken?.profileImageURL
                            }} />
                        </View>
                        <View style={styles.cookName}>
                            <Text> {post?.owner?.facebookToken?.name} </Text>
                        </View>
                    </View>


                </View>
                <View style={[styles.tags, styles.marginVertical, {
                    padding: 5,
                    flex: 1
                }]}>
                    <Text style={styles.tagIcon}>🏷️</Text>

                    {post?.tags?.map((tag, index) => (
                        <Tags key={index} name={tag} />
                    ))}
                </View>
                <View style={[styles.otherInfo, styles.marginVertical]}>
                    <Text> Tk {post?.unitPrice} </Text>
                    <Text> {Math.ceil(Math.random() * 5) + 1} kms </Text>
                    <Text> {post?.amountProduced} {post?.unitType} available </Text>
                </View>{/* */}
            </View>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    container: {
        width: 250,
        borderColor: "black",
        margin: 2,
        borderWidth: 2,
        borderRadius: 15,
        overflow: "hidden",
        height: 425
    },
    itemName: {
        fontFamily: "sans-serif",
        marginLeft: 5,
        marginRight: 5,

    },
    marginVertical: {
        marginTop: 5,
        marginBottom: 5
    },
    otherInfo: {
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-around',
        alignItems: "center",
        paddingTop: 2
    },
    cardImg: {
        backgroundColor: "#7579efc4",
        height: 170
    },
    cookInfo: {
        textAlignVertical: "center",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    popular: {

        backgroundColor: "#FCEEC7",
        borderRadius: 30,
        height: 30,
        borderWidth: 1,
        paddingHorizontal: 10,
        marginTop: 15
    },
    cookName: {
        paddingTop: 15
    },
    cookImg: {
        backgroundColor: "red",
        width: 50,
        aspectRatio: 1,
        borderRadius: 50,
        height: 50
    },
    tagIcon: {
        padding: 0,
        fontSize: 30
    },
    tags: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap"
    },
    additionalInfo: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10
    }
});

export default PostCard;